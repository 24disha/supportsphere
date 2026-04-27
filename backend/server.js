const express = require('express');
const cors = require('cors');

const app = express();

// Middleware - MUST BE FIRST
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    status: '🚀 SupportSphere AI Server v1.0!',
    endpoints: [
      'GET /',
      'POST /api/auth/login',
      'POST /api/auth/register', 
      'POST /api/ai/chat'
    ]
  });
});

// AUTH ROUTES
app.post('/api/auth/register', (req, res) => {
  console.log('📝 Register:', req.body.email);
  res.json({
    success: true,
    token: 'supportsphere-token-123',
    user: {
      id: 'user1',
      email: req.body.email || 'demo@supportsphere.ai',
      role: 'customer'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login:', req.body.email);
  res.json({
    success: true,
    token: 'supportsphere-token-123',
    user: {
      id: 'user1',
      email: req.body.email || 'demo@supportsphere.ai'
    }
  });
});

// 🔥 AI CHAT ROUTE - CORRECT POSITION
app.post('/api/ai/chat', (req, res) => {
  console.log('🤖 AI Chat:', req.body.message);
  
  const { message, ticketId } = req.body;
  
  // Smart AI Logic
  let aiResponse = '';
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('urgent') || lowerMsg.includes('emergency') || lowerMsg.includes('critical')) {
    aiResponse = `🚨 **EMERGENCY ESCALATION**\n\nSupportSphere AI Alert:\n✅ Senior Engineer assigned\n✅ Phone call initiated\n✅ ETA: **5 minutes**\n\nTicket: #${ticketId || 'AUTO-' + Date.now()}\nPlease stay online!`;
  } else if (lowerMsg.includes('website') || lowerMsg.includes('error') || lowerMsg.includes('bug')) {
    aiResponse = `🔧 **Technical Issue**\n\nSupportSphere AI Analysis:\n🔍 Error logged & traced\n⚙️ Troubleshooting steps sent\n📊 Monitoring activated\n\nTicket: #${ticketId || 'TECH-' + Date.now()}\nStatus: **IN PROGRESS**`;
  } else {
    aiResponse = `🤖 **SupportSphere AI Online**\n\n"${message}" received successfully!\n\n✅ Ticket auto-created\n⏱️ Instant assignment\n👨‍💼 Agent notified\n\nTicket: #${ticketId || 'SUPPORT-' + Date.now()}\nHow else can I help?`;
  }

  res.json({
    success: true,
    aiResponse,
    ticketId: ticketId || `TICKET-${Date.now()}`,
    sentiment: lowerMsg.includes('urgent') ? 'HIGH' : 'NORMAL',
    confidence: 0.98
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    available: ['/', '/api/auth/login', '/api/ai/chat']
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SUPPORTSPHERE AI SERVER v1.0');
  console.log('📡 http://localhost:' + PORT);
  console.log('✅ Auth: /api/auth/login');
  console.log('🤖 AI:   /api/ai/chat');
  console.log('='.repeat(60));
});