
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for authentication actions
 * @returns {Object} Authentication actions
 */
export const useAuthActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup, logout, user } = useAuth();
  
  const handleLogin = async (email, password, redirectPath = '/dashboard') => {
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        navigate(redirectPath);
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
  
  const handleSignup = async (email, password, fullName, redirectPath = '/login') => {
    try {
      const result = await signup(email, password, fullName);
      
      if (result.success) {
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        
        navigate(redirectPath, { state: { email } });
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
      await logout();
      navigate(redirectPath);
      return { success: true };
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
    isAuthenticated: !!user
  };
};
