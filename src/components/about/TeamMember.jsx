
import React from 'react';

const TeamMember = ({ name, role, bio }) => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">
          {name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-primary mb-2">{role}</p>
      <p className="text-sm text-muted-foreground">{bio}</p>
    </div>
  );
};

export default TeamMember;
