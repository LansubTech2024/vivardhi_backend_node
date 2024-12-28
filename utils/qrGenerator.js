const QRCode = require('qrcode');

const generateQRCode = async (userData) => {
  try {
    const qrData = {
      userId: userData.id,
      companyname: userData.companyname,
      email: userData.email,
      timestamp: new Date().toISOString()
    };
    
    const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));
    return qrImage;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw error;
  }
};

module.exports = { generateQRCode };