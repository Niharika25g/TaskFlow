import React, { useState } from 'react';
import ProjectBoard from './components/ProjectBoard';
import AuthPage from './components/AuthPage';

function App() {
  const [auth, setAuth] = useState(null); // stores { email, password, userObj }

  const handleLoginSuccess = (email, password, userObj) => {
    setAuth({ email, password, userObj });
  };

  const handleLogout = () => {
    setAuth(null);
  };

  if (!auth) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* Global Application Header Bar with Logout */}
      <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>⚡ TaskFlow Enterprise Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>Logged in as: {auth.userObj.name || auth.email}</span>
          <button 
            onClick={handleLogout}
            style={{ padding: '6px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Board View passing dynamic credentials */}
      <ProjectBoard credentials={auth} />
      
    </div>
  );
}

export default App;