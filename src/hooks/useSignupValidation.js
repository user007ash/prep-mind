
import { useState } from 'react';

export const useSignupValidation = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters, include a letter, a number and a special character
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 
        "Password must be at least 8 characters long and include letters, numbers, and symbols";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors({
      ...errors,
      ...newErrors
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    if (!formData.password) return { strength: 0, text: "" };
    
    let strength = 0;
    
    // Length check
    if (formData.password.length >= 8) strength += 1;
    
    // Contains letter check
    if (/[A-Za-z]/.test(formData.password)) strength += 1;
    
    // Contains number check
    if (/\d/.test(formData.password)) strength += 1;
    
    // Contains special character check
    if (/[@$!%*#?&]/.test(formData.password)) strength += 1;
    
    let text = "";
    let color = "";
    
    switch (strength) {
      case 0:
      case 1:
        text = "Weak";
        color = "bg-red-500";
        break;
      case 2:
      case 3:
        text = "Medium";
        color = "bg-yellow-500";
        break;
      case 4:
        text = "Strong";
        color = "bg-green-500";
        break;
      default:
        text = "";
        color = "";
    }
    
    return { 
      strength: (strength / 4) * 100, 
      text,
      color
    };
  };

  return {
    formData,
    errors,
    setErrors,
    handleChange,
    validateForm,
    getPasswordStrength
  };
};
