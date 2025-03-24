
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import AuthCard from '@/components/auth/AuthCard';
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <AuthCard
          title="Create an account"
          description="Enter your details to create a new account"
          footer={
            <p className="text-center text-sm text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          }
        >
          <SignupForm />
        </AuthCard>
      </Container>
    </div>
  );
};

export default Signup;
