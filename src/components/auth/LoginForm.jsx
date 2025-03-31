
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import PasswordInput from './PasswordInput';
import Spinner from '../ui/Spinner';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors({
      ...errors,
      ...newErrors
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({ ...errors, general: '' });
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        navigate(from);
      } else {
        setErrors({
          ...errors,
          general: result.message || "Incorrect email or password"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        general: "An error occurred. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {errors.general}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
        </div>
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          hasError={!!errors.password}
        />
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="rememberMe" 
          name="rememberMe"
          checked={formData.rememberMe}
          onCheckedChange={(checked) => 
            setFormData({...formData, rememberMe: checked})
          }
        />
        <Label 
          htmlFor="rememberMe" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </Label>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center">
            <Spinner className="-ml-1 mr-3" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
