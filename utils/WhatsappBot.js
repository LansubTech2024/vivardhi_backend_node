// const { Client, LocalAuth } = require('whatsapp-web.js');
// const Machine = require('../models/sql_data.model'); 
// const { Op } = require('sequelize');

// class WhatsAppBot {
//   constructor() {
//     this.client = null;
//     this.isReady = false;
//     this.qrCode = null;
//     this.initializationPromise = null;
//   }

//   async initialize() {
//     if (this.initializationPromise) {
//       return this.initializationPromise;
//     }

//     this.initializationPromise = new Promise((resolve, reject) => {
//       try {
//         this.client = new Client({
//           authStrategy: new LocalAuth(),
//           puppeteer: {
//             headless: true,
//             args: ['--no-sandbox']
//           }
//         });

//         // Handle QR code generation
//         this.client.on('qr', (qr) => {
//           console.log('QR Code received:');
//           this.qrCode = qr;
//           // Display QR in terminal for easy scanning
//           qrcode.generate(qr, { small: true });
//         });

//         this.client.on('ready', () => {
//           console.log('WhatsApp client is ready!');
//           this.isReady = true;
//           resolve();
//         });

//         this.client.on('auth_failure', (error) => {
//           console.error('Auth failure:', error);
//           this.isReady = false;
//           reject(error);
//         });

//         this.client.on('disconnected', () => {
//           console.log('Client disconnected');
//           this.isReady = false;
//           this.qrCode = null;
//         });

//         this.client.on('message', async (message) => {
//           if (this.isReady) {
//             try {
//               await this.handleMessage(message);
//             } catch (error) {
//               console.error('Error handling message:', error);
//             }
//           }
//         });

//         this.client.initialize().catch((error) => {
//           console.error('Failed to initialize client:', error);
//           reject(error);
//         });

//       } catch (error) {
//         console.error('Error in initialization:', error);
//         reject(error);
//       }
//     });

//     return this.initializationPromise;
//   }

//   getQRCode() {
//     return this.qrCode;
//   }

//   async waitForReady(timeout = 60000) {
//     const startTime = Date.now();
    
//     while (!this.isReady && Date.now() - startTime < timeout) {
//       if (this.qrCode) {
//         // If we have a QR code, wait longer
//         timeout = 120000; // 2 minutes total wait time for QR scan
//       }
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
    
//     if (!this.isReady) {
//       throw new Error('WhatsApp client failed to initialize. Please scan the QR code to authenticate.');
//     }
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
//       if (!this.isReady) {
//         await this.waitForReady();
//       }

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
//       console.log('Welcome message sent successfully to:', chatId);
//     } catch (error) {
//       console.error('Error sending welcome message:', error);
//       throw error; // Propagate error to caller
//     }
//   }

//   // Method to check if client is ready
//   isClientReady() {
//     return this.isReady;
//   }

//   // Method to reinitialize client if needed
//   async reinitialize() {
//     if (!this.isReady) {
//       this.initialize();
//       await this.waitForReady();
//     }
//   }
// }

// // Create singleton instance
// const whatsAppBot = new WhatsAppBot();

// // Initialize the bot immediately
// whatsAppBot.initialize().catch(error => {
//   console.error('Failed to initialize WhatsApp bot:', error);
// });
// module.exports = whatsAppBot;