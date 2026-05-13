require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const server = http.createServer(app);

// Database Setup (JSON File)
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { 
  users: [],
  tickets: [],
  messages: [],
  companies: []
};
await db.write();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Ensure uploads folder
if (!await fs.access('uploads').catch(() => false)) {
  await fs.mkdir('uploads', { recursive: true });
}

// File Upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Socket.io
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.get('/', (req, res) => {
  res.json({
    name: '🚀 B2B AI Support Backend',
    status: '✅ LIVE',
    endpoints: ['POST /api/auth/register', 'POST /api/auth/login']
  });
});

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check existing user
    const existing = db.data.users.find(u => u.email === email);
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    // Create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name: name || 'User',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    
    db.data.users.push(user);
    await db.write();
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = db.data.users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TICKET ROUTES
app.post('/api/tickets', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority = 'MEDIUM' } = req.body;
    
    const ticket = {
      id: `ticket_${Date.now()}`,
      title,
      description,
      status: 'OPEN',
      priority,
      userId: req.user.id,
      companyId: 'demo-company',
      createdAt: new Date().toISOString()
    };
    
    db.data.tickets.push(ticket);
    await db.write();
    
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tickets', authenticateToken, async (req, res) => {
  const tickets = db.data.tickets.filter(t => t.userId === req.user.id);
  res.json({ success: true, tickets });
});

// Socket Events
io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);
  
  socket.on('join-ticket', (ticketId) => {
    socket.join(ticketId);
    console.log(`📱 Joined ticket: ${ticketId}`);
  });
  
  socket.on('send-message', async (data) => {
    const message = {
      id: `msg_${Date.now()}`,
      ticketId: data.ticketId,
      content: data.content,
      userId: data.userId,
      isAI: false,
      createdAt: new Date().toISOString()
    };
    
    db.data.messages.push(message);
    await db.write();
    
    io.to(data.ticketId).emit('new-message', message);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 B2B AI Backend Live: http://localhost:${PORT}`);
  console.log(`📁 Database: db.json`);
  console.log(`📱 Socket: Ready`);
});
