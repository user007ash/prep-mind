
/**
 * Interview answer analysis service
 */

import { 
  calculateContentScore, 
  calculateSentimentScore, 
  calculateAnswerScore 
} from './scoreCalculation';

import {
  generateAnswerFeedback,
  generateStrengths,
  generateImprovements
} from './feedbackGeneration';

// Function to analyze interview answers with enhanced feedback
const analyzeInterviewAnswers = async (questions, answers) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateAnswerAnalysis(questions, answers);
  } catch (error) {
    console.error("Error analyzing answers:", error);
    throw error;
  }
};

// Simulate AI response for answer analysis with comprehensive feedback
const simulateAnswerAnalysis = async (questions, answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate more realistic scores based on answer content
      const contentScore = calculateContentScore(answers);
      const sentimentScore = calculateSentimentScore(answers);
      const clarityScore = Math.floor(Math.random() * 31) + 70;
      const confidenceScore = Math.floor(Math.random() * 31) + 70;
      const relevanceScore = Math.floor(Math.random() * 31) + 70;
      
      // Calculate overall score
      const overallScore = Math.round((contentScore + sentimentScore + clarityScore + confidenceScore + relevanceScore) / 5);
      
      // Detailed answer analysis
      const answerAnalysis = Object.keys(answers).map(question => {
        const answer = answers[question].answer;
        const answerScore = calculateAnswerScore(answer);
        
        return {
          question,
          answer,
          score: answerScore,
          feedback: generateAnswerFeedback(answerScore, answer),
          sentiment: answers[question].sentiment || "neutral"
        };
      });
      
      const feedbackResult = {
        overallScore,
        contentScore,
        sentimentScore,
        clarityScore,
        confidenceScore,
        relevanceScore,
        answerAnalysis,
        strengths: generateStrengths(answers),
        improvements: generateImprovements(answers),
        communicationFeedback: {
          tone: "Your tone was generally positive and professional, which creates a good impression.",
          pacing: "Your speaking pace was good, though occasionally rushed when discussing technical details.",
          clarity: "Your explanations were mostly clear, but some technical concepts could be explained more simply.",
          confidence: "You demonstrated good confidence in most answers, particularly when discussing your areas of expertise.",
          improvements: "Consider reducing filler words like 'um' and 'you know' to sound more confident and prepared."
        },
        overall: "You demonstrated strong technical knowledge and communicated your experiences clearly. Your answers were generally well-structured and relevant to the questions. To improve, focus on providing more specific, quantifiable examples of your achievements and being more concise in some responses. Additionally, emphasize your collaborative skills and the impact of your work more clearly. Your communication style is professional, though reducing filler words would enhance your delivery."
      };
      
      resolve(feedbackResult);
    }, 2000);
  });
};

export { analyzeInterviewAnswers };
