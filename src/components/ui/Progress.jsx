
import React from 'react';
import { cn } from '../../lib/utils';

const Progress = ({ value = 0, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  );
};

export { Progress };
