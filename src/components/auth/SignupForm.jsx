
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from '@/utils/authService';
import LoadingSpinner from './LoadingSpinner';

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
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
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
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
      newErrors.password = "Password must be at least 8 characters long and include letters, numbers, and symbols";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await registerUser(formData.fullName, formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Please sign in with your new account",
        });
        
        navigate('/login');
      } else {
        setErrors({
          ...errors,
          general: result.message || "Registration failed. Please try again."
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        ...errors,
        general: "An error occurred. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.password) return null;
    
    let strength = 0;
    
    if (formData.password.length >= 8) strength += 1;
    
    if (/[A-Za-z]/.test(formData.password)) strength += 1;
    
    if (/\d/.test(formData.password)) strength += 1;
    
    if (/[@$!%*#?&]/.test(formData.password)) strength += 1;
    
    let text = "";
    let widthClass = "";
    let colorClass = "";
    
    switch (strength) {
      case 1:
        text = "Weak";
        widthClass = "w-1/4";
        colorClass = "bg-red-500";
        break;
      case 2:
        text = "Fair";
        widthClass = "w-2/4";
        colorClass = "bg-orange-500";
        break;
      case 3:
        text = "Good";
        widthClass = "w-3/4";
        colorClass = "bg-yellow-500";
        break;
      case 4:
        text = "Strong";
        widthClass = "w-full";
        colorClass = "bg-green-500";
        break;
      default:
        break;
    }
    
    return { text, widthClass, colorClass };
  };

  const strength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {errors.general}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`pl-10 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
        </div>
        {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-muted-foreground" />
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
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`pl-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
        
        {formData.password && strength && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">{strength.text} password</span>
            </div>
            <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
              <div className={`h-full ${strength.widthClass} ${strength.colorClass} rounded-full`}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`pl-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <LoadingSpinner text="Creating account..." /> : "Sign up"}
      </Button>
    </form>
  );
};

export default SignupForm;
