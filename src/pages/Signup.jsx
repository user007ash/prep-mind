
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import Container from '@/components/layout/Container';
import { useAuth } from '@/context/AuthContext';
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to the dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignup = async (formData) => {
    setLoading(true);
    
    try {
      const result = await signup(formData.email, formData.password, formData.fullName);
      
      if (result.success) {
        navigate('/login', { 
          state: { 
            registrationSuccess: true,
            email: formData.email
          } 
        });
      } else {
        return Promise.reject(new Error(result.message || "Error creating account. Please try again."));
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <Card className="w-full shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Sign up to start preparing for your interviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm onSubmit={handleSignup} loading={loading} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
