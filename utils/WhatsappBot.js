
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const Machine = require('../models/sql_data.model'); 
// const { Op } = require('sequelize');

// class WhatsAppBot {
//   constructor() {
//     this.client = new Client({
//       authStrategy: new LocalAuth(),
//       puppeteer: {
//         args: ['--no-sandbox']
//       }
//     });

//     this.initializeClient();
//   }

//   initializeClient() {
//     this.client.on('ready', () => {
//       console.log('WhatsApp client is ready!');
//     });

//     this.client.on('message', async (message) => {
//       try {
//         await this.handleMessage(message);
//       } catch (error) {
//         console.error('Error handling message:', error);
//       }
//     });

//     this.client.initialize();
//   }

//   async handleMessage(message) {
//     const query = message.body.toLowerCase();
    
//     try {
//       // Get the most recent data
//       const latestData = await Machine.findOne({
//         order: [['date', 'DESC']]
//       });

//       if (!latestData) {
//         await message.reply("Sorry, no data is currently available.");
//         return;
//       }

//       // Handle different types of queries
//       if (query.includes('productivity') || query.includes('production')) {
//         const response = `Current Production Statistics:
// - Overall Productivity: ${latestData.overallProductivity}%
// - Target Production: ${latestData.targetProduction} units
// - Actual Production: ${latestData.actualProduction} units
// - Production Rate: ${latestData.productionRate} units/hour`;
//         await message.reply(response);
//       }
      
//       else if (query.includes('resources') || query.includes('manpower')) {
//         const response = `Resource Status:
// - Available Workers: ${latestData.manpower}
// - Current Shift: ${latestData.currentShift}
// - Equipment Utilization: ${latestData.machineUtilization}%
// - Tools Available: ${latestData.toolsAvailable}/${latestData.totalTools}`;
//         await message.reply(response);
//       }
      
//       else if (query.includes('quality') || query.includes('defect')) {
//         const response = `Quality Metrics:
// - Good Pieces: ${latestData.goodPieces}
// - Defect Rate: ${latestData.defectRate}%
// - Scrap Rate: ${latestData.scrapRate}%
// - Part Rejection Rate: ${latestData.partRejectionRate}%`;
//         await message.reply(response);
//       }
      
//       else if (query.includes('inventory') || query.includes('stock')) {
//         const response = `Inventory Status:
// - Raw Material: ${latestData.currentStock} units (Min required: ${latestData.minimumRequired})
// - Finished Goods: ${latestData.finishedGoodCurrentStock} units (Min required: ${latestData.finishedGoodMinimumRequired})
// - Material Name: ${latestData.rawMaterialName}`;
//         await message.reply(response);
//       }
      
//       else if (query.includes('downtime') || query.includes('maintenance')) {
//         const response = `Downtime Information:
// - Total Downtime: ${latestData.totalDowntimeDuration} minutes
// - Reasons: ${latestData.downtimeReasons}
// - Power Downtime: ${latestData.totalPowerDowntimeDuration} minutes
// - Power Issues: ${latestData.powerDowntimeReasons}`;
//         await message.reply(response);
//       }
      
//       else if (query.includes('efficiency') || query.includes('performance')) {
//         const response = `Performance Metrics:
// - Machine Efficiency: ${latestData.efficiency}%
// - Machine Utilization: ${latestData.machineUtilization}%
// - Uptime: ${latestData.uptime} minutes
// - Actual Runtime: ${latestData.actualRunTime} minutes`;
//         await message.reply(response);
//       }
      
//       else {
//         await message.reply(
//           "I can help you with information about:\n\n" +
//           "1. Productivity and production stats\n" +
//           "2. Resource availability\n" +
//           "3. Quality metrics\n" +
//           "4. Inventory status\n" +
//           "5. Downtime information\n" +
//           "6. Efficiency and performance\n\n" +
//           "Just ask me about any of these topics!"
//         );
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       await message.reply("Sorry, I encountered an error while fetching the data. Please try again later.");
//     }
//   }

//   async sendWelcomeMessage(phoneNumber, username) {
//     try {
//       const chatId = phoneNumber.substring(1) + "@c.us";
//       await this.client.sendMessage(chatId, 
//         `Hi ${username}, welcome to Opfact! 👋\n\n` +
//         "I can help you with information about:\n" +
//         "- Production and productivity\n" +
//         "- Resource availability\n" +
//         "- Quality metrics\n" +
//         "- Inventory status\n" +
//         "- Downtime information\n" +
//         "- Efficiency and performance\n\n" +
//         "Just ask me about any of these topics!"
//       );
//     } catch (error) {
//       console.error('Error sending welcome message:', error);
//     }
//   }
// }

// const whatsAppBot = new WhatsAppBot();
// module.exports = whatsAppBot;