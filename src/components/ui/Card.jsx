
import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "glass rounded-xl shadow-sm overflow-hidden animate-fade-in", 
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div
    className={cn("p-6 flex flex-col space-y-1.5", className)}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-tight tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div
    className={cn("p-6 pt-0 flex items-center", className)}
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
