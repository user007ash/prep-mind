
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileAvatar from './profile/ProfileAvatar';
import ProfileContent from './profile/ProfileContent';

const UserProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Profile</CardTitle>
        <CardDescription>Account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <ProfileAvatar />
          <ProfileContent user={user} />
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
