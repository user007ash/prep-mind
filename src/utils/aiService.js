
/**
 * Utility for interacting with AI services (Grok Cloud in this case)
 */

// Function to analyze resume with AI and get ATS score
const analyzeResume = async (resumeData) => {
  try {
    // In a real implementation, this would call an API endpoint
    // For this demo, we'll simulate the response
    return simulateResumeAnalysis(resumeData);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

// Function to generate interview questions based on resume
const generateInterviewQuestions = async (resumeData) => {
  try {
    // In a real implementation, this would call an API endpoint
    // For this demo, we'll simulate the response
    return simulateQuestionGeneration(resumeData);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};

// Function to analyze interview answers
const analyzeInterviewAnswers = async (questions, answers) => {
  try {
    // In a real implementation, this would call an API endpoint
    // For this demo, we'll simulate the response
    return simulateAnswerAnalysis(questions, answers);
  } catch (error) {
    console.error("Error analyzing answers:", error);
    throw error;
  }
};

// Simulate AI response for resume analysis
const simulateResumeAnalysis = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random ATS score between 60 and 95
      const atsScore = Math.floor(Math.random() * 36) + 60;
      
      resolve({
        atsScore,
        feedback: {
          strengths: [
            "Good use of action verbs",
            "Clear project descriptions",
            "Relevant technical skills highlighted"
          ],
          weaknesses: [
            "Could use more quantifiable achievements",
            "Some technical terms could be more industry-specific",
            "Consider adding more keywords from job descriptions"
          ]
        }
      });
    }, 1500);
  });
};

// Simulate AI response for question generation
const simulateQuestionGeneration = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate questions based on the resume data
      const questions = [
        "Tell me about your experience as a Frontend Developer at Tech Solutions Inc.",
        "What were your main responsibilities at Creative Agency?",
        "Describe the E-commerce Platform project you built. What technologies did you use and what challenges did you face?",
        "How do you approach responsive design in your projects?",
        "Can you explain how you've used React in your previous work?",
        "What is your process for integrating APIs into frontend applications?",
        "How do you stay updated with the latest trends in web development?",
        "Describe a difficult technical problem you solved recently."
      ];
      
      resolve(questions);
    }, 1000);
  });
};

// Simulate AI response for answer analysis
const simulateAnswerAnalysis = async (questions, answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random scores
      const contentScore = Math.floor(Math.random() * 31) + 70;
      const sentimentScore = Math.floor(Math.random() * 31) + 70;
      const clarityScore = Math.floor(Math.random() * 31) + 70;
      
      // Calculate overall score
      const overallScore = Math.round((contentScore + sentimentScore + clarityScore) / 3);
      
      const feedbackResult = {
        overallScore,
        contentScore,
        sentimentScore,
        clarityScore,
        strengths: [
          "Good technical understanding demonstrated in answers",
          "Clear communication of project experiences",
          "Positive attitude throughout the interview",
          "Structured responses with relevant examples"
        ],
        improvements: [
          "Provide more specific examples when discussing achievements",
          "Be more concise in some of your longer responses",
          "Focus more on quantifiable impacts of your work",
          "Highlight more of your collaborative experiences"
        ],
        overall: "You demonstrated strong technical knowledge and communicated your experiences clearly. Your answers were generally well-structured and relevant to the questions. To improve, focus on providing more specific, quantifiable examples of your achievements and being more concise in some responses. Additionally, emphasize your collaborative skills and the impact of your work more clearly."
      };
      
      resolve(feedbackResult);
    }, 2000);
  });
};

export { analyzeResume, generateInterviewQuestions, analyzeInterviewAnswers };
