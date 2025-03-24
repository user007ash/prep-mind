
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { UserIcon, LogOutIcon } from 'lucide-react';

const SignInButton = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="hidden md:inline">{user.name}</span>
        </Link>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOutIcon className="h-4 w-4" />
          <span className="hidden md:inline">Sign out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost" size="sm">Sign in</Button>
      </Link>
      <Link to="/signup">
        <Button size="sm">Sign up</Button>
      </Link>
    </div>
  );
};

export default SignInButton;
