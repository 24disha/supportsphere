import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([
    { 
      text: 'Welcome to SupportSphere AI! 🌐\n\nAsk me anything about your issue:\n• Website problems\n• Billing issues\n• Technical support\n\nType URGENT for priority!', 
      sender: 'ai', 
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, { 
      text: userMessage, 
      sender: 'user', 
      time: new Date().toLocaleTimeString() 
    }]);

    try {
      // AI Response
      const res = await axios.post('http://localhost:5000/api/ai/chat', {
        message: userMessage,
        ticketId: `CHAT-${Date.now() % 10000}`
      });
      
      // Add AI response
      setMessages(prev => [...prev, { 
        text: res.data.aiResponse, 
        sender: 'ai',
        confidence: res.data.confidence,
        time: new Date().toLocaleTimeString()
      }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: '❌ AI Error: Backend check karo (localhost:5000)', 
        sender: 'system',
        time: new Date().toLocaleTimeString()
      }]);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        padding: '25px 35px',
        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
          <div style={{
            width: 50,
            height: 50,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24
          }}>
            🤖
          </div>
          <div>
            <h2 style={{margin: 0, fontSize: 28, fontWeight: 800}}>SupportSphere AI</h2>
            <p style={{margin: 2, opacity: 0.9, fontSize: 14}}>Live AI Assistant | Ticket #CHAT-{Date.now() % 10000}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: 30,
        overflowY: 'auto',
        background: '#f1f5f9'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            marginBottom: 25,
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{
              maxWidth: '75%',
              padding: '20px 25px',
              borderRadius: 25,
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
                : '#ffffff',
              color: msg.sender === 'user' ? 'white' : '#1e293b',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              wordWrap: 'break-word',
              position: 'relative'
            }}>
              <div style={{lineHeight: 1.6, whiteSpace: 'pre-line'}}>{msg.text}</div>
              {msg.confidence && (
                <div style={{
                  fontSize: 12,
                  opacity: 0.8,
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    background: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  AI Confidence: {(msg.confidence * 100).toFixed(0)}%
                </div>
              )}
              <div style={{
                fontSize: 12,
                opacity: 0.6,
                marginTop: 12,
                textAlign: msg.sender === 'user' ? 'right' : 'left'
              }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: 30,
        borderTop: '1px solid #e2e8f0',
        background: 'white',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{display: 'flex', gap: 15, maxWidth: 800, margin: '0 auto'}}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="💬 Type your issue... (Try: Website down URGENT!)"
            onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={loading}
            style={{
              flex: 1,
              padding: '22px 30px',
              border: `2px solid ${loading ? '#e2e8f0' : '#e2e8f0'}`,
              borderRadius: 30,
              fontSize: 16,
              outline: 'none',
              background: loading ? '#f8fafc' : 'white',
              transition: 'all 0.3s'
            }}
          />
          <button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              color: 'white',
              fontSize: 24,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s',
              opacity: loading || !input.trim() ? 0.6 : 1
            }}
          >
            {loading ? '⏳' : '➤'}
          </button>
        </div>
        {loading && (
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: 14,
            marginTop: 10
          }}>
            SupportSphere AI is typing...
          </div>
        )}
      </div>
    </div>
  );
}