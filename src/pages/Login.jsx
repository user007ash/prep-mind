
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <AuthCard
          title="Sign in to your account"
          description="Enter your email and password to access your dashboard"
          footer={
            <p className="text-center text-sm text-muted-foreground mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          }
        >
          <LoginForm />
        </AuthCard>
      </Container>
    </div>
  );
};

export default Login;
