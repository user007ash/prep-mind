
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
