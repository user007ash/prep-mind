
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon, LockIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from '../ui/Spinner';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().default(false),
});

const LoginForm = ({ redirectPath = '/dashboard' }) => {
  const location = useLocation();
  const { handleLogin } = useAuthActions();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await handleLogin(data.email, data.password, redirectPath);
      
      if (!result.success) {
        form.setError("root", {
          type: "manual",
          message: result.message || "Invalid email or password"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", {
        type: "manual", 
        message: "An unexpected error occurred. Please try again."
      });
      
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
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
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
        
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <Spinner className="-ml-1 mr-3" />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
