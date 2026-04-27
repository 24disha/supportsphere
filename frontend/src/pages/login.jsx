import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('disha@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Backend Check: localhost:5000 running?');
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(20px)',
        padding: 60,
        borderRadius: 30,
        boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.2)',
        width: '100%',
        maxWidth: 480
      }}>
        {/* SupportSphere Logo */}
        <div style={{textAlign: 'center', marginBottom: 45}}>
          <div style={{
            width: 110,
            height: 110,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
            borderRadius: '50%',
            margin: '0 auto 25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 900,
            color: 'white',
            boxShadow: '0 25px 50px rgba(99, 102, 241, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              width: 90,
              height: 90,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              top: 8,
              right: 8,
              animation: 'float 6s ease-in-out infinite'
            }}></div>
            <span style={{zIndex: 2}}>🌐</span>
            <span style={{fontSize: 20, marginTop: -8, zIndex: 2}}>AI</span>
          </div>
          
          <h1 style={{
            fontSize: 44,
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -1.2
          }}>
            SupportSphere
          </h1>
          
          <p style={{
            color: '#64748b',
            marginTop: 12,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0.5
          }}>
            Next-Gen AI B2B Support Platform
          </p>
        </div>

        {/* Form */}
        <div style={{marginBottom: 35}}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="✉️ disha@company.com"
            style={{
              width: '100%',
              padding: '22px 28px',
              marginBottom: 22,
              border: '2px solid #e2e8f0',
              borderRadius: 22,
              fontSize: 17,
              boxSizing: 'border-box',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(255,255,255,0.85)',
              fontWeight: 500
            }}
            onFocus={e => {
              e.target.style.borderColor = '#6366f1';
              e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="🔒 Password"
            style={{
              width: '100%',
              padding: '22px 28px',
              marginBottom: 28,
              border: '2px solid #e2e8f0',
              borderRadius: 22,
              fontSize: 17,
              boxSizing: 'border-box',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(255,255,255,0.85)',
              fontWeight: 500
            }}
            onFocus={e => {
              e.target.style.borderColor = '#6366f1';
              e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          
          <button
            onClick={login}
            style={{
              width: '100%',
              padding: '24px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 22,
              fontSize: 20,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 18px 40px rgba(99, 102, 241, 0.4)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: 0.5,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.6)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 18px 40px rgba(99, 102, 241, 0.4)';
            }}
          >
            🚀 Launch SupportSphere AI
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: 15,
          paddingTop: 25,
          borderTop: '1px solid #e2e8f0',
          fontWeight: 500
        }}>
          <strong>🌟 SupportSphere AI</strong><br/>
          Built for Next-Gen B2B Support
        </div>
      </div>
    </div>
  );
}