
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Navigation */}
      <nav className="fixed w-full z-10 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 text-primary"
              >
                <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                <path d="M2 12h4"/>
                <path d="M18 12h4"/>
              </svg>
            </div>
            <span className="text-xl font-bold">PrepMind</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Login/Signup</Link>
          </div>
          
          <Link to="/index">
            <Button>Get Started</Button>
          </Link>
        </Container>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
                AI-Powered Interview Preparation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Your AI-powered interview coach
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Elevate your career with PrepMind - the all-in-one platform that analyzes your resume, simulates interviews, and provides personalized feedback to help you land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/index">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Prep
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-2/3 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mt-8 space-y-3">
                      <div className="w-full h-4 rounded bg-gray-100 dark:bg-gray-600"></div>
                      <div className="w-full h-4 rounded bg-gray-100 dark:bg-gray-600"></div>
                      <div className="w-3/4 h-4 rounded bg-gray-100 dark:bg-gray-600"></div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <div className="w-24 h-8 rounded bg-primary/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Boost Your Interview Prep</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of tools is designed to help you ace your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              }
              title="Resume Parsing & ATS Scoring"
              description="Upload your resume to get an ATS score and understand how recruiters will view your application"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              }
              title="AI-Generated Interview Questions"
              description="Get personalized interview questions based on your resume and job position"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              }
              title="Sentiment Analysis & Behavioral Feedback"
              description="Receive insights on your tone, confidence, and overall communication style"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              }
              title="Comprehensive Performance Reports"
              description="Get detailed feedback on your answers with suggestions for improvement"
            />
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Start practicing with our AI-powered interview coach today and build your confidence for the real thing.
              </p>
              <Link to="/index">
                <Button size="lg">Get Started Now</Button>
              </Link>
            </div>
            <div className="relative w-full md:w-1/3 aspect-square rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
              <div className="absolute inset-4 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3 h-3 text-primary"
                >
                  <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                  <path d="M2 12h4"/>
                  <path d="M18 12h4"/>
                </svg>
              </div>
              <span className="text-sm font-medium">PrepMind</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PrepMind. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
