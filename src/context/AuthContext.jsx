
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on initial load
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking auth session:', error);
          return;
        }

        if (data?.session) {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user) {
            setUser({
              id: userData.user.id,
              email: userData.user.email,
              name: userData.user.user_metadata?.full_name || userData.user.email.split('@')[0]
            });
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = session.user;
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.user_metadata?.full_name || userData.email.split('@')[0]
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message || 'Failed to sign in');
        return { success: false, message: error.message };
      }

      if (data?.user) {
        toast.success('Successfully signed in');
        navigate('/dashboard');
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, fullName) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        toast.error(error.message || 'Failed to sign up');
        return { success: false, message: error.message };
      }

      if (data?.user) {
        toast.success('Account created successfully! Please check your email to confirm your account.');
        navigate('/login');
        return { success: true };
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast.error('Failed to sign out');
        return;
      }
      
      setUser(null);
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
