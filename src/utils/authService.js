
// A simple authentication service for demonstration purposes
// In a real application, this would connect to a backend API

/**
 * Authenticate a user with email and password
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<{success: boolean, token?: string, user?: object, message?: string}>}
 */
export const authenticateUser = (email, password) => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, any email ending with @example.com and password longer than 5 chars will work
      if (email.endsWith('@example.com') && password.length > 5) {
        resolve({
          success: true,
          token: 'demo-jwt-token-' + Math.random().toString(36).substr(2),
          user: {
            id: '123',
            name: email.split('@')[0],
            email: email,
            role: 'user'
          }
        });
      } else {
        resolve({
          success: false,
          message: 'Incorrect email or password'
        });
      }
    }, 1000);
  });
};

/**
 * Register a new user
 * @param {string} fullName User's full name
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const registerUser = (fullName, email, password) => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, succeed for all valid inputs
      if (email && password && fullName) {
        // In a real app, check if user already exists
        resolve({
          success: true,
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid registration data'
        });
      }
    }, 1000);
  });
};

/**
 * Check if a user is logged in
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return !!token;
};

/**
 * Get the current user from local storage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

/**
 * Log out the current user
 */
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
