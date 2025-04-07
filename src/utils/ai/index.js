// Main export file for AI services
import { analyzeResume as _analyzeResume } from './resumeAnalysis';
import { generateInterviewQuestions as _generateInterviewQuestions } from './questionGeneration';
import { analyzeInterviewAnswers } from './answerAnalysis';

// Import our new AI agents 
import { parseResume, generateInterviewQuestions as aiGenerateQuestions } from '@/ai-agents';

// Enhanced resume analysis that uses our AI agent
export const analyzeResume = async (resumeData) => {
  try {
    // First use the existing implementation as a fallback
    const existingAnalysis = await _analyzeResume(resumeData);
    
    // Then augment with our new AI agent
    const aiAnalysis = await parseResume(resumeData);
    
    // Merge the results, with AI analysis taking precedence
    return {
      ...existingAnalysis,
      ...aiAnalysis,
      // Keep the original atsScore for now, but we could use the AI one
      // by uncommenting this line:
      // atsScore: aiAnalysis.atsScore,
    };
  } catch (error) {
    console.error("Error in augmented resume analysis:", error);
    // Fall back to the original implementation
    return _analyzeResume(resumeData);
  }
};

// Enhanced question generation that uses our AI agent
export const generateInterviewQuestions = async (resumeData) => {
  try {
    // First generate questions using our AI agent
    const aiQuestions = await aiGenerateQuestions(resumeData);
    
    // If we have enough questions from the AI, use those
    if (aiQuestions && aiQuestions.length >= 5) {
      return aiQuestions;
    }
    
    // Otherwise fall back to the existing implementation
    return _generateInterviewQuestions(resumeData);
  } catch (error) {
    console.error("Error in augmented question generation:", error);
    // Fall back to the original implementation
    return _generateInterviewQuestions(resumeData);
  }
};

export {
  analyzeInterviewAnswers
};
