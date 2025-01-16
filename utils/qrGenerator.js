// // const QRCode = require('qrcode');

// // const generateQRCode = async (userData) => {
// //   try {
// //     const qrData = {
// //       userId: userData.id,
// //       companyname: userData.companyname,
// //       email: userData.email,
// //       timestamp: new Date().toISOString()
// //     };
    
// //     const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));
// //     return qrImage;
// //   } catch (error) {
// //     console.error('QR Code generation error:', error);
// //     throw error;
// //   }
// // };

// // module.exports = { generateQRCode };

// // const QRCode = require('qrcode');
// // const rateLimit = require('express-rate-limit');
// // const dotenv = require("dotenv");
// // dotenv.config();

// // const qrGenerationLimit = rateLimit({
// //   windowMs: 15 * 60 * 1000, 
// //   max: 10 
// // });

// // const generateQRCode = async (userData) => {
// //   try {
// //     const whatsappNumber = "+919385929307"; 
// //     if (!whatsappNumber) {
// //       throw new Error('WhatsApp business number not configured');
// //     }
    
// //     const greetingMessage = encodeURIComponent(
// //       `Hello ${userData.companyname}, welcome to our WhatsApp support! How can we assist you today?`
// //     );

// //     const whatsappLink = `https://wa.me/${whatsappNumber}?text=${greetingMessage}`;

// //     const qrImage = await QRCode.toDataURL(whatsappLink);
    
// //     // Log QR code generation
// //     console.log(`QR Code generated for user: ${userData.email} at ${new Date().toISOString()}`);
    
// //     return {
// //       qrImage,
// //       whatsappLink
// //     };
// //   } catch (error) {
// //     console.error('QR Code generation error:', error);
// //     throw error;
// //   }
// // };

// // module.exports = { generateQRCode, qrGenerationLimit };

// const QRCode = require('qrcode');
// const whatsAppBot = require('./WhatsappBot');
// const dotenv = require("dotenv");
// dotenv.config();

// const generateQRCode = async (userData) => {
//   try {
//     const whatsappNumber = process.env.WHATSAPP_BUSINESS_NUMBER;
//     if (!whatsappNumber) {
//       throw new Error('WhatsApp business number not configured');
//     }

//     // Remove any special characters from the phone number
//     const cleanNumber = whatsappNumber.replace(/\D/g, '');
    
//     // Generate direct chat link
//     const whatsappLink = `https://wa.me/${cleanNumber}`;
    
//     // Generate QR code
//     const qrImage = await QRCode.toDataURL(whatsappLink);

//     console.log('Attempting to send welcome message...');
//     try {
//       await whatsAppBot.sendWelcomeMessage(cleanNumber, userData.username);
//       console.log('Welcome message sent successfully');
//     } catch (error) {
//       console.error('Failed to send welcome message:', error);
//       // Continue execution even if welcome message fails
//     }

//     return {
//       qrImage,
//       whatsappLink
//     };
//   } catch (error) {
//     console.error('QR Code generation error:', error);
//     throw error;
//   }
// };

// module.exports = { generateQRCode };