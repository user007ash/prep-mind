
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Container from '@/components/layout/Container';

const HeroSection = () => {
  return (
    <section id="hero" className="pt-36 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <span className="mr-1.5 size-2 bg-primary rounded-full"></span>
              AI-Powered Interview Preparation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
              Your AI-powered <br className="hidden md:block" />interview coach
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Elevate your career with PrepMind - the all-in-one platform that analyzes your resume, simulates interviews, and provides personalized feedback to help you land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/index">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Start Your Prep
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
              <div className="relative w-3/4 aspect-square">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary/40 dark:text-primary/20">
                  <path fill="currentColor" d="M40,-51.2C51.8,-41.9,61.5,-29.4,65.6,-15C69.7,-0.6,68.3,15.7,61.3,29.3C54.4,42.9,42,53.8,27.4,60.8C12.9,67.8,-3.9,70.8,-20.3,67.3C-36.7,63.8,-52.8,53.7,-62.2,39.1C-71.6,24.5,-74.4,5.4,-70.5,-11.7C-66.6,-28.8,-56,-43.9,-42.5,-52.8C-29,-61.8,-12.8,-64.5,1.1,-65.8C14.9,-67.1,28.1,-60.5,40,-51.2Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                      <path d="M2 12h4"/>
                      <path d="M18 12h4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
