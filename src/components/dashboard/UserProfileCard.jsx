
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserIcon, MailIcon, BadgeIcon, CalendarIcon } from 'lucide-react';

const UserProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate member since date (this is just a placeholder - in a real app you'd get this from the database)
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Profile</CardTitle>
        <CardDescription>Account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <UserIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{user.name || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MailIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <BadgeIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account type</p>
                <p className="font-medium capitalize">{user.role || 'User'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Member since</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
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
