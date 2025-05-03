
import React from 'react';

const IntroHeader = () => {
  return (
    <header className="text-center mb-10 animate-fade-in">
      <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
        AI-Powered Interview Preparation
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        PrepMind
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Elevate your interview skills with AI-powered resume analysis and personalized interview simulations.
      </p>
    </header>
  );
};

export default IntroHeader;
