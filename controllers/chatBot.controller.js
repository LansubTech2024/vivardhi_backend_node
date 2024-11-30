const ChatMessage = require('../models/chatBot.model');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
};

exports.saveMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;
    
    // Save the user message to the database
    const userMessage = await ChatMessage.create({ sender, message });

    // For now, let’s just echo the same message as the bot response
    const botMessage = {
      sender: 'bot',
      message: `You said: ${message}`,
    };

    // Optionally, save the bot message too (if required)
    await ChatMessage.create(botMessage);

    // Return the bot message as the response
    res.status(201).json(botMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};
