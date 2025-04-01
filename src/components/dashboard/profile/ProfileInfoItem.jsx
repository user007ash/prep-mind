
import React from 'react';

const ProfileInfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      {icon && <span className="h-5 w-5 text-primary mt-0.5">{icon}</span>}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-medium">{value || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default ProfileInfoItem;
