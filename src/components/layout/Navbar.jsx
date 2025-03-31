
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogInIcon, UserIcon, LogOutIcon } from 'lucide-react';
import Container from './Container';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass animate-fade-in">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 text-primary"
              >
                <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                <path d="M2 12h4"/>
                <path d="M18 12h4"/>
              </svg>
            </div>
            <span className="text-lg font-medium">PrepMind</span>
          </Link>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center mr-4">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLoginClick}
                  className="flex items-center gap-2"
                >
                  <LogInIcon className="h-4 w-4" />
                  Login
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
