const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority = 'MEDIUM' } = req.body;
    
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority,
        userId: req.user.id
      },
      include: { user: true }
    });
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: req.params.id },
      include: { messages: true }
    });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};