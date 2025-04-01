
import React from 'react';
import { User } from 'lucide-react';

const ProfileAvatar = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
        <User className="h-12 w-12 text-primary" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
