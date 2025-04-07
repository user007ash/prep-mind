
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
    console.log("Generating questions from resume data:", resumeData);
    
    // Generate questions based on resume data
    const questions = generateMockQuestions(resumeData);
    
    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate interview questions: " + error.message);
  }
};

/**
 * Generate mock interview questions based on resume data
 * @param {Object} resumeData - The parsed resume data
 * @returns {Array<string>} - Array of interview questions
 */
const generateMockQuestions = (resumeData) => {
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
  if (resumeData && resumeData.keySkills) {
    // Add questions based on skills
    if (resumeData.keySkills.includes("JavaScript") || resumeData.keySkills.includes("React")) {
      technicalQuestions.push(
        "Explain the difference between let, const, and var in JavaScript.",
        "How does React's virtual DOM work?",
        "What is your experience with state management in React?"
      );
    }
    
    if (resumeData.keySkills.includes("Node.js")) {
      technicalQuestions.push(
        "Describe your experience with Node.js and Express.",
        "How would you handle asynchronous operations in Node.js?"
      );
    }
    
    if (resumeData.keySkills.includes("TypeScript")) {
      technicalQuestions.push(
        "What benefits does TypeScript provide over plain JavaScript?",
        "Explain how you use interfaces and types in TypeScript."
      );
    }
  }
  
  // Experience-based questions
  const experienceQuestions = [
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you approach learning new technologies?",
    "Tell me about a time you had to meet a tight deadline.",
    "How do you handle feedback and criticism?"
  ];
  
  // Combine all questions and limit to 10 total
  const allQuestions = [
    ...baseQuestions,
    ...technicalQuestions,
    ...experienceQuestions
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
