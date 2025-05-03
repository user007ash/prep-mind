import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Navbar from '@/components/layout/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Use the shared Navbar component */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
              Our Mission
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Revolutionizing Interview Preparation
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to help job seekers succeed by providing AI-powered tools that make interview preparation more effective and accessible.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  PrepMind began with a simple observation: traditional interview preparation methods weren't keeping pace with modern hiring practices.
                </p>
                <p>
                  Founded in 2023 by a team of AI experts and career coaches, we set out to create a solution that combines cutting-edge AI technology with proven interview techniques.
                </p>
                <p>
                  Our platform is designed to adapt to each user's unique background and career goals, providing personalized preparation that traditional methods simply can't match.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* How It Works */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How PrepMind Works</h2>
            <p className="text-lg text-muted-foreground">
              Our intelligent platform takes you through a comprehensive interview preparation journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard 
              number="01"
              title="Resume Analysis"
              description="Upload your resume to receive an ATS score and personalized feedback on how to improve it."
            />
            <ProcessCard 
              number="02"
              title="AI Interview Simulation"
              description="Practice with tailored interview questions based on your resume and desired position."
            />
            <ProcessCard 
              number="03"
              title="Comprehensive Feedback"
              description="Get detailed insights on your answers, communication style, and areas for improvement."
            />
          </div>
        </Container>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the experts behind PrepMind's AI-powered interview coaching
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <TeamMember 
              name="Alex Johnson"
              role="Founder & CEO"
              bio="Former recruiter with 10+ years experience in tech hiring."
            />
            <TeamMember 
              name="Maya Patel"
              role="AI Research Lead"
              bio="PhD in Machine Learning with expertise in NLP and speech analysis."
            />
            <TeamMember 
              name="David Lee"
              role="Product Director"
              bio="Background in UX design and career development platforms."
            />
            <TeamMember 
              name="Sarah Chen"
              role="Career Coach"
              bio="Certified career coach who has helped 500+ professionals land jobs."
            />
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your interview preparation?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their interview performance with PrepMind's AI-powered coaching.
            </p>
            <Link to="/index">
              <Button size="lg">Get Started for Free</Button>
            </Link>
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

export default About;
