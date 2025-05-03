
import React from 'react';

const ProcessCard = ({ number, title, description }) => {
  return (
    <div className="p-6 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ProcessCard;
