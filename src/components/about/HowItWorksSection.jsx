
import React from 'react';
import Container from '@/components/layout/Container';
import ProcessCard from './ProcessCard';

const HowItWorksSection = () => {
  return (
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
  );
};

export default HowItWorksSection;
