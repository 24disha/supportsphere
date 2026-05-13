const express = require('express');
const auth = require('../middleware/auth');
const { createTicket, getTickets, getTicket } = require('../controllers/ticketController');
const { sendMessage } = require('../controllers/messageController');
const router = express.Router();

router.use(auth);

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.post('/:id/messages', sendMessage);

module.exports = router;
