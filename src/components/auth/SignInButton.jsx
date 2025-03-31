
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { UserIcon, LogOutIcon } from 'lucide-react';
import { useAuthActions } from '@/hooks/useAuthActions';

const SignInButton = () => {
  const { user } = useAuth();
  const { handleLogout } = useAuthActions();

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
          onClick={() => handleLogout()}
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
