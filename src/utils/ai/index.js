
// Main export file for AI services
import { analyzeResume as _analyzeResume } from './resumeAnalysis';
import { generateInterviewQuestions as _generateInterviewQuestions } from './questionGeneration';
import { analyzeInterviewAnswers } from './answerAnalysis';

// Import our AI agents
import { parseResume, generateInterviewQuestions as aiGenerateQuestions } from '@/ai-agents';

// Enhanced resume analysis that uses our AI agent
export const analyzeResume = async (resumeData) => {
  try {
    console.log("Starting augmented resume analysis with AI agent");
    
    // First use the AI agent for analysis
    const aiAnalysis = await parseResume(resumeData);
    
    // If AI agent fails or returns incomplete results, use existing implementation as fallback
    if (!aiAnalysis || !aiAnalysis.atsScore) {
      console.log("AI agent analysis incomplete, falling back to existing implementation");
      return _analyzeResume(resumeData);
    }
    
    // For backup, also get the existing analysis (could be useful for comparison/debugging)
    const existingAnalysis = await _analyzeResume(resumeData);
    
    // Log both analyses for comparison
    console.log("AI Agent Analysis:", aiAnalysis);
    console.log("Existing Analysis:", existingAnalysis);
    
    // Merge the results, with AI analysis taking precedence
    return {
      ...existingAnalysis,
      ...aiAnalysis,
      // Add a flag to indicate this was processed by our AI agent
      processedByAIAgent: true
    };
  } catch (error) {
    console.error("Error in AI augmented resume analysis:", error);
    // Log detailed error for debugging
    console.log("Error details:", error.message);
    
    // Fall back to the original implementation
    console.log("Falling back to existing resume analysis implementation");
    return _analyzeResume(resumeData);
  }
};

// Enhanced question generation that uses our AI agent
export const generateInterviewQuestions = async (resumeData) => {
  try {
    console.log("Starting question generation with AI agent");
    
    // First generate questions using our AI agent
    const aiQuestions = await aiGenerateQuestions(resumeData);
    
    // If we have enough questions from the AI, use those
    if (aiQuestions && aiQuestions.length >= 5) {
      console.log("Successfully generated questions with AI agent:", aiQuestions.length);
      return aiQuestions;
    }
    
    console.log("AI agent didn't generate enough questions, falling back to enhanced implementation");
    
    // Fall back to the enhanced implementation
    return _generateInterviewQuestions(resumeData);
  } catch (error) {
    console.error("Error in AI augmented question generation:", error);
    // Log detailed error for debugging
    console.log("Error details:", error.message);
    
    // Fall back to the enhanced implementation
    console.log("Falling back to enhanced question generation implementation");
    return _generateInterviewQuestions(resumeData);
  }
};

export {
  analyzeInterviewAnswers
};
