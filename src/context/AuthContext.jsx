
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = async () => {
      try {
        if (!isSupabaseConfigured()) {
          console.warn("Supabase is not properly configured. Auth features won't work.");
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          setUser({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            role: 'user'
          });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener if Supabase is configured
    let subscription;
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            const { user } = session;
            setUser({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              role: 'user'
            });
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      subscription = data.subscription;
    }

    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      if (!isSupabaseConfigured()) {
        return { 
          success: false, 
          message: "Authentication is not configured. Please check Supabase setup." 
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data && data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
          role: 'user'
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      
      return { 
        success: false, 
        message: "Login failed. Please try again." 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const signup = async (email, password, fullName) => {
    try {
      if (!isSupabaseConfigured()) {
        return { 
          success: false, 
          message: "Authentication is not configured. Please check Supabase setup." 
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        return { success: true };
      }
      
      return { 
        success: false, 
        message: "Signup failed. Please try again." 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Signup failed' 
      };
    }
  };

  const logout = async () => {
    try {
      if (!isSupabaseConfigured()) {
        setUser(null);
        return;
      }

      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      loading,
      isAuthenticated: !!user
    }}>
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
