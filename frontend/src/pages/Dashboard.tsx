import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <header className="login-header">
        <h1>Dashboard</h1>
      </header>
      
      <div className="direct-form-container">
        <div className="form-container">
          <h2 className="form-title">Welcome to Your Dashboard</h2>
          
          <div className="user-info-section">
            <h2 className="section-title">User Information</h2>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user.id}</span>
            </div>
          </div>
          
          <div className="button-container">
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 