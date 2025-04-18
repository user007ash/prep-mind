
/**
 * AI Agent for resume parsing and ATS scoring
 */

import { readFileContent } from './utils/fileUtils';
import { generateDetailedAnalysis } from './utils/resumeAnalysis';

/**
 * Parse resume text and return ATS score and analysis
 * @param {string|File} resumeData - The resume text or file to parse
 * @returns {Promise<Object>} - Resume analysis including ATS score
 */
export const parseResume = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud or another LLM API
    console.log("Parsing resume with AI agent:", resumeData);
    
    // If we have a file object, extract text content
    let content = resumeData;
    if (resumeData instanceof File) {
      // Read file content if it's a File object
      content = await readFileContent(resumeData);
      console.log("File content extracted successfully");
    }
    
    // Generate a detailed analysis
    const analysis = generateDetailedAnalysis(content);
    console.log("Analysis generated successfully");
    
    return analysis;
  } catch (error) {
    console.error("Error in AI resume parsing:", error);
    throw new Error("Failed to parse resume with AI agent: " + error.message);
  }
};
