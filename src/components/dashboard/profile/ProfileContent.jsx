
import React from 'react';
import { User, Mail, BadgeCheck, Calendar } from 'lucide-react';
import ProfileInfoItem from './ProfileInfoItem';

const ProfileContent = ({ user }) => {
  // Calculate member since date (this is just a placeholder - in a real app you'd get this from the database)
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-4">
      <ProfileInfoItem 
        icon={<User className="h-5 w-5 text-primary mt-0.5" />}
        label="Name"
        value={user.name}
      />
      
      <ProfileInfoItem 
        icon={<Mail className="h-5 w-5 text-primary mt-0.5" />}
        label="Email"
        value={user.email}
      />
      
      <ProfileInfoItem 
        icon={<BadgeCheck className="h-5 w-5 text-primary mt-0.5" />}
        label="Account type"
        value={user.role || 'User'}
      />
      
      <ProfileInfoItem 
        icon={<Calendar className="h-5 w-5 text-primary mt-0.5" />}
        label="Member since"
        value={formattedDate}
      />
    </div>
  );
};

export default ProfileContent;
