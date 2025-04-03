
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import Spinner from '../ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated, refreshSession } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Only attempt to refresh if we're not loading and not authenticated
    if (!loading && !isAuthenticated) {
      const tryRefresh = async () => {
        try {
          const { success } = await refreshSession();
          if (!success) {
            // Only show toast if refresh actually failed (not on initial load)
            toast({
              title: "Authentication required",
              description: "You need to log in to access this feature.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error refreshing session:", error);
        }
      };
      
      tryRefresh();
    }
  }, [loading, isAuthenticated, toast, refreshSession]);

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

  if (!isAuthenticated) {
    // Save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
