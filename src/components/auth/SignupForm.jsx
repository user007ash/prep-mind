
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MailIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SignupTextField from './SignupTextField';
import SignupPasswordInput from './SignupPasswordInput';
import { useSignupValidation } from '@/hooks/useSignupValidation';

const SignupForm = ({ onSubmit, loading }) => {
  const { 
    formData, 
    errors, 
    setErrors, 
    handleChange, 
    validateForm, 
    getPasswordStrength 
  } = useSignupValidation({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({
        ...errors,
        general: "An error occurred. Please try again later."
      });
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {errors.general}
        </div>
      )}
      
      <SignupTextField
        id="fullName"
        name="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="John Doe"
        error={errors.fullName}
        icon={UserIcon}
      />
      
      <SignupTextField
        id="email"
        name="email"
        type="text"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@example.com"
        error={errors.email}
        icon={MailIcon}
      />
      
      <SignupPasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        showStrength={true}
        passwordStrength={passwordStrength}
      />
      
      <SignupPasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          "Sign up"
        )}
      </Button>
      
      <p className="text-center text-sm text-muted-foreground mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
