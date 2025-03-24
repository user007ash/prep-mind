
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
        const token = 'demo-jwt-token-' + Math.random().toString(36).substr(2);
        const userData = {
          id: '123',
          name: email.split('@')[0],
          email: email,
          role: 'user'
        };
        
        // Store token and user data
        if (localStorage.getItem('rememberMe') === 'true') {
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        resolve({
          success: true,
          token: token,
          user: userData
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
        if (email.endsWith('@example.com')) {
          resolve({
            success: true,
            message: 'Registration successful! Please log in.'
          });
        } else {
          resolve({
            success: false,
            message: 'Email must end with @example.com for demo purposes'
          });
        }
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
 * Get the current user from storage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

/**
 * Set remember me preference
 * @param {boolean} value
 */
export const setRememberMe = (value) => {
  localStorage.setItem('rememberMe', value.toString());
};

/**
 * Log out the current user
 */
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};
