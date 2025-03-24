
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserIcon } from 'lucide-react';

const UserProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account type</p>
              <p className="font-medium capitalize">{user.role || 'User'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Member since</p>
              <p className="font-medium">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-sm text-muted-foreground">
          All personal data is securely stored and will not be shared with third parties.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
