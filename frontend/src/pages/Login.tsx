import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="direct-form-container">
      <LoginForm />
    </div>
  );
};

export default Login; 