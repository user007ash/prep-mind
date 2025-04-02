
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from './Container';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { UserIcon, LogOutIcon } from 'lucide-react';
import { useAuthActions } from '@/hooks/useAuthActions';

const Navbar = () => {
  const { user } = useAuth();
  const { handleLogout } = useAuthActions();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
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
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2"
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLogout()}
                  className="flex items-center gap-2"
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Sign out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
