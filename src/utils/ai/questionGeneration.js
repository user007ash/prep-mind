
/**
 * Interview question generation service
 */

// Function to generate interview questions based on resume
const generateInterviewQuestions = async (resumeData) => {
  try {
    console.log("Generating interview questions from resume data:", resumeData);
    
    // Check if the resumeData contains necessary information
    if (!resumeData || (!resumeData.skills && !resumeData.experience && !resumeData.projects)) {
      console.warn("Resume data is incomplete, using fallback questions");
      return generateFallbackQuestions();
    }

    // In a real implementation, this would call Groq Cloud or OpenAI API
    // For this demo, we'll use an enhanced simulation that's more contextual
    const questions = await generateEnhancedQuestions(resumeData);
    
    console.log("Generated questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    // Return fallback questions in case of error
    return generateFallbackQuestions();
  }
};

// Generate enhanced questions that are more relevant to the resume
const generateEnhancedQuestions = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = [];
      
      // Add experience-based questions
      if (resumeData.experience && resumeData.experience.length > 0) {
        resumeData.experience.forEach(exp => {
          questions.push(`Tell me about your experience as a ${exp.title} at ${exp.company}.`);
          questions.push(`What were your main responsibilities as a ${exp.title}?`);
        });
      }
      
      // Add project-based questions
      if (resumeData.projects && resumeData.projects.length > 0) {
        resumeData.projects.forEach(project => {
          questions.push(`Describe the ${project.name} project. What technologies did you use and what challenges did you face?`);
          questions.push(`What was your specific contribution to the ${project.name} project?`);
        });
      }
      
      // Add skill-based questions
      if (resumeData.skills && resumeData.skills.length > 0) {
        // Select a random subset of skills to ask about
        const randomSkills = resumeData.skills
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.min(4, resumeData.skills.length));
          
        randomSkills.forEach(skill => {
          questions.push(`How have you used ${skill} in your previous work?`);
          questions.push(`Rate your proficiency in ${skill} and give an example of a problem you solved using it.`);
        });
      }
      
      // Add behavioral questions
      const behavioralQuestions = [
        "Tell me about a time when you had to work under pressure to meet a deadline.",
        "Describe a situation where you had to collaborate with a difficult team member.",
        "Give an example of a project where you demonstrated leadership skills.",
        "Tell me about a time when you had to learn a new technology quickly.",
        "How do you prioritize tasks when working on multiple projects?"
      ];
      
      // Add technical questions based on detected resume fields
      const technicalQuestions = [];
      
      // Check for common tech skills and add relevant questions
      const techSkills = resumeData.skills || [];
      if (techSkills.some(skill => /javascript|react|angular|vue/i.test(skill))) {
        technicalQuestions.push("Explain the difference between controlled and uncontrolled components in React.");
        technicalQuestions.push("How would you optimize the performance of a web application?");
      }
      
      if (techSkills.some(skill => /node|express|backend/i.test(skill))) {
        technicalQuestions.push("How do you handle authentication and authorization in your backend applications?");
        technicalQuestions.push("Explain your approach to error handling in APIs.");
      }
      
      if (techSkills.some(skill => /sql|database|mongo/i.test(skill))) {
        technicalQuestions.push("How do you approach database design for a new project?");
        technicalQuestions.push("Compare SQL and NoSQL databases. When would you choose one over the other?");
      }
      
      // Combine all questions and ensure we have exactly 10
      const allQuestions = [
        ...questions.slice(0, 5), // Up to 5 personalized questions
        ...behavioralQuestions.slice(0, 3), // 3 behavioral questions
        ...technicalQuestions.slice(0, 2) // 2 technical questions
      ];
      
      // If we don't have enough questions, add general ones
      const generalQuestions = [
        "Where do you see yourself in 5 years?",
        "Why are you interested in this position?",
        "What is your greatest professional achievement?",
        "How do you stay updated with the latest trends in your field?",
        "What are your salary expectations?",
        "Do you have any questions for me?"
      ];
      
      // Ensure we have exactly 10 questions
      let finalQuestions;
      if (allQuestions.length >= 10) {
        finalQuestions = allQuestions.slice(0, 10);
      } else {
        const remaining = 10 - allQuestions.length;
        finalQuestions = [...allQuestions, ...generalQuestions.slice(0, remaining)];
      }
      
      resolve(finalQuestions);
    }, 1500); // Simulate API delay
  });
};

// Generate fallback questions if resume parsing fails
const generateFallbackQuestions = () => {
  return [
    "Tell me about yourself and your background.",
    "What are your greatest professional strengths?",
    "What do you consider to be your weaknesses?",
    "Why are you interested in this position?",
    "Where do you see yourself in 5 years?",
    "What is your greatest professional achievement?",
    "Describe a difficult work situation and how you overcame it.",
    "How do you handle work pressure and tight deadlines?",
    "What's your approach to working in a team?",
    "Do you have any questions for me?"
  ];
};

export { generateInterviewQuestions };
