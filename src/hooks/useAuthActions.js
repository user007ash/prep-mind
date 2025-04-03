
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from './use-toast';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for authentication actions
 * @returns {Object} Authentication actions
 */
export const useAuthActions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, signup, logout, user, isAuthenticated } = useAuth();
  
  const handleLogin = async (email, password, redirectPath) => {
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Get the intended destination from location state, or use provided path
        const from = location.state?.from || redirectPath || '/dashboard';
        navigate(from);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: result.message || "Incorrect email or password" 
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: "An error occurred. Please try again later." 
      };
    }
  };
  
  const handleSignup = async (email, password, fullName, redirectPath) => {
    try {
      const result = await signup(email, password, fullName);
      
      if (result.success) {
        toast({
          title: "Account created successfully",
          description: "You can now log in with your credentials.",
        });
        
        // Get the intended destination from location state, or use provided path
        const from = location.state?.from || redirectPath || '/dashboard';
        navigate(from);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: result.message || "Signup failed" 
        };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { 
        success: false, 
        message: "An error occurred. Please try again later." 
      };
    }
  };
  
  const handleLogout = async (redirectPath = '/') => {
    try {
      const result = await logout();
      if (result.success) {
        navigate(redirectPath);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: result.message || "Logout failed" 
        };
      }
    } catch (error) {
      console.error("Logout error:", error);
      return { 
        success: false, 
        message: "An error occurred during logout." 
      };
    }
  };
  
  return {
    handleLogin,
    handleSignup,
    handleLogout,
    isAuthenticated
  };
};
