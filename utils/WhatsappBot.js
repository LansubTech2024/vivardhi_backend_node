const { Client } = require('whatsapp-web.js');
const { chromium } = require('playwright');
const Machine = require('../models/sql_data.model');
const Login = require('../models/auth.model');
const { Op } = require('sequelize');

class WhatsAppBot {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.client = null;
    this.initialize();
  }

  async initialize() {
    try {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--disable-gpu'
        ]
      });

      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();

      this.client = new Client({
        authStrategy: new LocalAuth(),
        playwright: {
          browser: this.browser,
          page: this.page
        }
      });

      this.client.on('ready', () => {
        console.log('WhatsApp client is ready!');
      });

      this.client.on('message', async (message) => {
        try {
          await this.handleMessage(message);
        } catch (error) {
          console.error('Error handling message:', error);
        }
      });

      await this.client.initialize();
    } catch (error) {
      console.error('Initialization error:', error);
      await this.cleanup();
      throw error;
    }
  }

  async handleMessage(message) {
    const query = message.body.toLowerCase();
    
    try {
      // Get user info from phone number
      const userNumber = message.from.split('@')[0];
      const user = await Login.findOne({
        where: { phonenumber: userNumber }
      });

      if (!user) {
        await message.reply("Sorry, you're not registered in our system.");
        return;
      }

      // Get the most recent data for this user's company
      const latestData = await Machine.findOne({
        where: { companyname: user.companyname },
        order: [['date', 'DESC']]
      });

      if (!latestData) {
        await message.reply("Sorry, no data is currently available for your company.");
        return;
      }

      // Rest of your query handling code remains the same
      if (query.includes('productivity') || query.includes('production')) {
        const response = `Current Production Statistics for ${user.companyname}:
- Overall Productivity: ${latestData.overallProductivity}%
- Target Production: ${latestData.targetProduction} units
- Actual Production: ${latestData.actualProduction} units
- Production Rate: ${latestData.productionRate} units/hour`;
        await message.reply(response);
      }
      // ... rest of your query handlers ...
    } catch (error) {
      console.error('Error fetching data:', error);
      await message.reply("Sorry, I encountered an error while fetching the data. Please try again later.");
    }
  }

  async sendWelcomeMessage(userData) {
    try {
      if (!userData.phonenumber) {
        throw new Error('Phone number not provided');
      }

      // Format phone number for WhatsApp
      const chatId = userData.phonenumber.replace(/^\+/, '') + "@c.us";
      
      // Save user's WhatsApp info
      await Login.update({
        whatsapp_group_id: chatId
      }, {
        where: { id: userData.id }
      });

      const message = `Hi ${userData.username}, welcome to ${userData.companyname} on Opfact! 👋\n\n` +
        "I can help you with information about:\n" +
        "- Production and productivity\n" +
        "- Resource availability\n" +
        "- Quality metrics\n" +
        "- Inventory status\n" +
        "- Downtime information\n" +
        "- Efficiency and performance\n\n" +
        "Just ask me about any of these topics!";

      await this.client.sendMessage(chatId, message);
      console.log('Welcome message sent successfully to:', chatId);
    } catch (error) {
      console.error('Error sending welcome message:', error);
      throw error;
    }
  }

  async cleanup() {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

// Create singleton instance
const whatsAppBot = new WhatsAppBot();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await whatsAppBot.cleanup();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await whatsAppBot.cleanup();
  process.exit(0);
});

module.exports = whatsAppBot;