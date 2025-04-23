import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { registerSchema } from '@/utils/validators';
import { useRegisterMutation } from '@/api/hooks/useRegisterMutation';

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { email, password } = data;
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
      }
    );
  };

  return (
    <Card title="Create an account">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage message={error.message} />}
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
        >
          Register
        </Button>
        
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-primary-color hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
};

export default RegisterForm; 