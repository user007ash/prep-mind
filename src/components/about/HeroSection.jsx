
import React from 'react';
import Container from '@/components/layout/Container';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
