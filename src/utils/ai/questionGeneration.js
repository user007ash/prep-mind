
/**
 * Interview question generation service
 */

// Function to generate interview questions based on resume
const generateInterviewQuestions = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateQuestionGeneration(resumeData);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};

// Simulate AI response for question generation
const simulateQuestionGeneration = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate questions based on the resume data
      const questions = [];
      
      // Add experience-based questions
      if (resumeData.experience && resumeData.experience.length > 0) {
        resumeData.experience.forEach(exp => {
          questions.push(`Tell me about your experience as a ${exp.title} at ${exp.company}.`);
        });
      }
      
      // Add project-based questions
      if (resumeData.projects && resumeData.projects.length > 0) {
        const project = resumeData.projects[0];
        questions.push(`Describe the ${project.name} project. What technologies did you use and what challenges did you face?`);
      }
      
      // Add skill-based questions
      if (resumeData.skills && resumeData.skills.length > 0) {
        const randomSkills = resumeData.skills
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
          
        randomSkills.forEach(skill => {
          questions.push(`How have you used ${skill} in your previous work?`);
        });
      }
      
      // Add general questions to reach 10 questions total
      const generalQuestions = [
        "How do you approach responsive design in your projects?",
        "What is your process for integrating APIs into frontend applications?",
        "How do you stay updated with the latest trends in web development?",
        "Describe a difficult technical problem you solved recently.",
        "How do you balance meeting deadlines with ensuring code quality?",
        "Tell me about a time when you had to collaborate with a difficult team member.",
        "What's your approach to debugging complex issues?",
        "How do you handle constructive criticism?",
        "Where do you see yourself in 5 years?",
        "Why are you interested in this position?"
      ];
      
      // Fill remaining slots with general questions
      const remainingSlots = 10 - questions.length;
      questions.push(...generalQuestions.slice(0, remainingSlots));
      
      resolve(questions);
    }, 1000);
  });
};

export { generateInterviewQuestions };
