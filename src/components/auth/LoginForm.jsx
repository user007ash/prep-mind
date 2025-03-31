
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordInput from './PasswordInput';
import Spinner from '../ui/Spinner';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useAuthActions } from '@/hooks/useAuthActions';

const LoginForm = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuthActions();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    }
    
    return errors;
  };
  
  const {
    values,
    errors,
    handleChange,
    validateForm: validate,
    setErrors
  } = useFormValidation({
    email: location.state?.email || '',
    password: '',
    rememberMe: false
  }, validateForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    setErrors({ ...errors, general: '' });
    
    const result = await handleLogin(values.email, values.password, from);
    
    if (!result.success) {
      setErrors({
        ...errors,
        general: result.message
      });
    }
    
    setLoading(false);
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
            value={values.email}
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
          value={values.password}
          onChange={handleChange}
          hasError={!!errors.password}
        />
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="rememberMe" 
          name="rememberMe"
          checked={values.rememberMe}
          onCheckedChange={(checked) => 
            handleChange({
              target: { name: 'rememberMe', type: 'checkbox', checked }
            })
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
