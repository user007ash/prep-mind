
import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: "Password must include letters, numbers, and symbols.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignupForm = ({ onSubmit, loading }) => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains letter check
    if (/[A-Za-z]/.test(password)) strength += 1;
    
    // Contains number check
    if (/\d/.test(password)) strength += 1;
    
    // Contains special character check
    if (/[@$!%*#?&]/.test(password)) strength += 1;
    
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

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("root", { 
        type: "manual", 
        message: "An error occurred. Please try again later." 
      });
    }
  });

  const watchPassword = form.watch("password");
  const passwordStrength = getPasswordStrength(watchPassword);

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {form.formState.errors.root && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              
              {watchPassword && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color}`} 
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Password strength: {passwordStrength.text}
                  </p>
                </div>
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
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
    </Form>
  );
};

export default SignupForm;
