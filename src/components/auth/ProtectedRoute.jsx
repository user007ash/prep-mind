
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import Spinner from '../ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading, refreshSession } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "You need to log in to access this feature.",
        variant: "destructive",
      });
    }
    
    // Try to refresh the session if we're not loading and don't have a user
    if (!loading && !user) {
      const tryRefresh = async () => {
        const { success } = await refreshSession();
        if (!success) {
          console.log("Session refresh failed or no session exists");
        }
      };
      
      tryRefresh();
    }
  }, [loading, user, toast, refreshSession]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Spinner size={12} className="text-primary" />
          <p className="mt-4 text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
