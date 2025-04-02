
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // If user is already logged in, redirect to the dashboard
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <Container className="max-w-md w-full">
          <Card className="w-full shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-muted-foreground mt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Login;
