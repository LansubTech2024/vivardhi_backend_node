const express = require('express');
const { getAllMessages, saveMessage } = require('../controllers/chatBot.controller');

const router = express.Router();

router.get('/messages', getAllMessages); // Fetch all chat messages
router.post('/messages', saveMessage);  // Save a new chat message

module.exports = router;
