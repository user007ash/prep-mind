
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';

const AuthCard = ({ 
  title, 
  description, 
  children, 
  footer 
}) => {
  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex flex-col">
        {footer}
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
