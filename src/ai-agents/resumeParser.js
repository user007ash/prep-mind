
/**
 * AI Agent for resume parsing and ATS scoring
 */

import { readFileContent } from './utils/fileUtils';
import { generateDetailedAnalysis } from './utils/resumeAnalysis';

const RESUME_INDICATORS = {
  education: /education|university|college|degree|bachelor|master|phd/i,
  experience: /experience|work|job|position|employer|company/i,
  skills: /skills|technologies|languages|proficient|expertise/i,
  contact: /email|phone|@|\+\d{1,2}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}|\d{3}[-.]?\d{3}[-.]?\d{4}/i
};

/**
 * Validates if the content appears to be a resume
 * @param {string} content - The text content to validate
 * @returns {{ isValid: boolean, missingElements: string[] }}
 */
const validateResumeContent = (content) => {
  const missingElements = [];
  
  for (const [section, pattern] of Object.entries(RESUME_INDICATORS)) {
    if (!pattern.test(content)) {
      missingElements.push(section);
    }
  }
  
  // Consider it valid if it has at least 3 out of 4 key sections
  const isValid = missingElements.length <= 1;
  
  return { isValid, missingElements };
};

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
      // Verify file type
      if (resumeData.type !== 'application/pdf') {
        throw new Error('Please upload your resume in PDF format');
      }
      
      // Read file content
      content = await readFileContent(resumeData);
      
      // Validate content
      const { isValid, missingElements } = validateResumeContent(content);
      if (!isValid) {
        throw new Error(
          `This doesn't look like a resume. Please ensure your file includes sections for: ${missingElements.join(', ')}`
        );
      }
    }
    
    // Generate a detailed analysis
    const analysis = generateDetailedAnalysis(content);
    
    return analysis;
  } catch (error) {
    console.error("Error in AI resume parsing:", error);
    throw new Error(error.message || "Failed to parse resume with AI agent");
  }
};

