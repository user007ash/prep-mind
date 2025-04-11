
/**
 * AI Agent for generating interview questions based on resume
 */

/**
 * Generate interview questions based on resume data
 * @param {Object} resumeData - Parsed resume data
 * @returns {Promise<Array<string>>} - Array of interview questions
 */
export const generateInterviewQuestions = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud or another LLM API
    // For now, we'll use a placeholder implementation
    console.log("AI agent generating questions from resume data:", resumeData);
    
    // Generate questions based on resume data
    const questions = generateTailoredQuestions(resumeData);
    
    return questions;
  } catch (error) {
    console.error("Error in AI question generation:", error);
    throw new Error("Failed to generate interview questions with AI agent: " + error.message);
  }
};

/**
 * Generate tailored interview questions based on resume data
 * @param {Object} resumeData - The parsed resume data
 * @returns {Array<string>} - Array of interview questions
 */
const generateTailoredQuestions = (resumeData) => {
  // Base questions that are always included
  const baseQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest professional strengths?",
    "What do you consider to be your weaknesses?",
    "Where do you see yourself in 5 years?",
    "Why are you interested in this position?",
  ];
  
  // Technical questions based on detected skills
  const technicalQuestions = [];
  
  // Only add these if resumeData contains skills
  if (resumeData && resumeData.skills) {
    const keySkills = Array.isArray(resumeData.skills) ? resumeData.skills : resumeData.keySkills || [];
    
    // JavaScript/Frontend questions
    if (keySkills.some(skill => 
        /JavaScript|TypeScript|React|Angular|Vue/i.test(skill))) {
      
      const frontendQuestions = [
        "Explain the difference between let, const, and var in JavaScript.",
        "How does the virtual DOM work in React?",
        "What is your experience with state management in modern frontend frameworks?",
        "Explain the concept of closures in JavaScript.",
        "How do you handle asynchronous operations in JavaScript?",
        "What's your approach to debugging complex frontend issues?"
      ];
      
      // Add 2-3 frontend questions
      technicalQuestions.push(...frontendQuestions.sort(() => 0.5 - Math.random()).slice(0, 3));
    }
    
    // Backend questions
    if (keySkills.some(skill => 
        /Node\.js|Express|Django|Flask|Spring|API|Backend/i.test(skill))) {
      
      const backendQuestions = [
        "Describe your experience building RESTful APIs.",
        "How do you handle authentication and authorization in your backend applications?",
        "Explain your approach to database design and optimization.",
        "How would you handle high traffic loads in a backend service?",
        "What security practices do you follow in backend development?"
      ];
      
      // Add 1-2 backend questions
      technicalQuestions.push(...backendQuestions.sort(() => 0.5 - Math.random()).slice(0, 2));
    }
    
    // Database questions
    if (keySkills.some(skill => 
        /SQL|MongoDB|PostgreSQL|MySQL|Database/i.test(skill))) {
      
      const dbQuestions = [
        "Compare SQL and NoSQL databases. When would you choose one over the other?",
        "How do you optimize database queries for performance?",
        "Explain your experience with database transactions and data integrity.",
        "How do you handle database migrations in production environments?"
      ];
      
      // Add 1-2 database questions
      technicalQuestions.push(...dbQuestions.sort(() => 0.5 - Math.random()).slice(0, 2));
    }
    
    // Cloud/DevOps questions
    if (keySkills.some(skill => 
        /AWS|Azure|Google Cloud|Docker|Kubernetes|DevOps|CI\/CD/i.test(skill))) {
      
      const devopsQuestions = [
        "Describe your experience with cloud infrastructure and deployment.",
        "How do you approach CI/CD pipeline setup and maintenance?",
        "Explain your experience with containerization technologies.",
        "How do you handle monitoring and logging in cloud environments?",
        "What's your approach to infrastructure as code?"
      ];
      
      // Add 1-2 devops questions
      technicalQuestions.push(...devopsQuestions.sort(() => 0.5 - Math.random()).slice(0, 2));
    }
  }
  
  // Experience-based questions
  const experienceQuestions = [];
  
  // Add experience-specific questions if available
  if (resumeData && resumeData.experience && resumeData.experience.length > 0) {
    // Get the most recent job experience
    const recentJob = resumeData.experience[0];
    experienceQuestions.push(
      `Tell me about your experience as a ${recentJob.title} at ${recentJob.company}.`,
      `What were your key achievements at ${recentJob.company}?`
    );
  }
  
  // Project-based questions
  const projectQuestions = [];
  
  // Add project-specific questions if available
  if (resumeData && resumeData.projects && resumeData.projects.length > 0) {
    const project = resumeData.projects[0];
    projectQuestions.push(
      `Tell me about the ${project.name} project. What technologies did you use and what challenges did you face?`,
      `What was your specific contribution to the ${project.name} project?`
    );
  }
  
  // General behavioral questions
  const behavioralQuestions = [
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you approach learning new technologies?",
    "Tell me about a time when you had to meet a tight deadline.",
    "How do you handle feedback and criticism?",
    "Describe your experience working in teams.",
    "How do you prioritize tasks when working on multiple projects?",
    "Tell me about a time when you disagreed with a team member. How did you resolve it?",
    "How do you ensure code quality in your projects?"
  ];
  
  // Combine all questions and limit to 10 total
  const allQuestions = [
    ...baseQuestions.slice(0, 3), // Always include first 3 base questions
    ...experienceQuestions.slice(0, 2), // Up to 2 experience-specific questions
    ...projectQuestions.slice(0, 2), // Up to 2 project-specific questions
    ...technicalQuestions.slice(0, 3), // Up to 3 technical questions
    ...behavioralQuestions // Fill remaining slots with behavioral questions
  ];
  
  // Shuffle and return 10 questions
  return shuffleArray(allQuestions).slice(0, 10);
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
