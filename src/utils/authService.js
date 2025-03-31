
import { supabase } from '../lib/supabase';

/**
 * Authenticate a user with email and password
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<{success: boolean, token?: string, user?: object, message?: string}>}
 */
export const authenticateUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      return {
        success: true,
        token: data.session?.access_token,
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
          email: data.user.email,
          role: 'user'
        }
      };
    } else {
      return {
        success: false,
        message: 'Authentication failed'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Authentication failed'
    };
  }
};

/**
 * Register a new user
 * @param {string} fullName User's full name
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const registerUser = async (fullName, email, password) => {
  try {
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

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Registration failed'
    };
  }
};

/**
 * Check if a user is logged in
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

/**
 * Get the current user from Supabase
 * @returns {Promise<object|null>}
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  
  if (!data.user) return null;
  
  return {
    id: data.user.id,
    name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
    email: data.user.email,
    role: 'user'
  };
};

/**
 * Log out the current user
 */
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
