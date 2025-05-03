
import React from 'react';
import Container from '@/components/layout/Container';
import TeamMember from './TeamMember';

const TeamSection = () => {
  return (
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
  );
};

export default TeamSection;
