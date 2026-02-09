import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import authService from './services/authService';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const switchToRegister = (e) => {
    e.preventDefault();
    setShowLogin(false);
  };

  const switchToLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : showLogin ? (
        <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}

export default App;
