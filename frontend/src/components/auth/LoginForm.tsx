import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { useLoginMutation } from '@/api/hooks/useLoginMutation';

// Define the login schema
const loginSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      uid: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Convert UID to email format for the API
    mutate({ email: data.uid, password: data.password }, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <>
      <header className="login-header">
        <h1>Login Page</h1>
      </header>
      
      <div className="form-container">
        <h2 className="form-title">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage message={error.message} />}
          
          <Input
           // label="UID"
           // type="text"
            placeholder="UID"
            error={errors.uid?.message}
            {...register('uid')}
          />
          
          <Input
            //label="Password"
            //type="password"
            placeholder="password"
            error={errors.password?.message}
            {...register('password')}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isPending}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm; 