import React, { useState } from 'react';

function AuthPage({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isSignup ? 'http://localhost:8081/api/auth/signup' : 'http://localhost:8081/api/auth/login';
    const payload = isSignup ? { email, password, name } : { email, password };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Authentication failed');
        return res.json();
      })
      .then(user => {
        // Pass the authenticated user credentials up to App.jsx
        onLoginSuccess(email, password, user);
      })
      .catch(err => setError(err.message));
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0f172a'
  };

  const boxStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    width: '350px'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>
          {isSignup ? 'Create Account' : 'TaskFlow Login'}
        </h2>

        {error && <p style={{ color: '#e74c3c', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isSignup && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            required 
          />
          <button 
            type="submit" 
            style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => setIsSignup(!isSignup)} 
            style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;