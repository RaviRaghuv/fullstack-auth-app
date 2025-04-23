import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="auth-container">
      <RegisterForm />
    </div>
  );
};

export default Register; 