
import React from 'react';

const Container = ({ children, className = "" }) => {
  return (
    <div className={`container px-4 md:px-6 mx-auto max-w-6xl ${className}`}>
      {children}
    </div>
  );
};

export default Container;
