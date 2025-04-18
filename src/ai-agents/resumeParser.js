
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
  // More lenient validation - consider it a resume even with missing sections
  // This way we provide feedback rather than blocking uploads
  const missingElements = [];
  let matchCount = 0;
  
  for (const [section, pattern] of Object.entries(RESUME_INDICATORS)) {
    if (pattern.test(content)) {
      matchCount++;
    } else {
      missingElements.push(section);
    }
  }
  
  // Consider it a valid resume if it has at least 2 out of 4 key sections
  // More lenient than before to prevent false rejections
  const isValid = matchCount >= 2;
  
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
        console.log("Invalid file type:", resumeData.type);
        throw new Error('Please upload your resume in PDF format');
      }
      
      try {
        // Read file content
        content = await readFileContent(resumeData);
        
        // Validate content
        const { isValid, missingElements } = validateResumeContent(content);
        
        if (!isValid) {
          console.log("Resume validation failed, missing sections:", missingElements);
          throw new Error(
            `This doesn't look like a resume. Please ensure your file includes sections for: ${missingElements.join(', ')}`
          );
        }
        
        console.log("✅ Valid resume uploaded and parsed successfully");
        
        // Generate a detailed analysis
        const analysis = generateDetailedAnalysis(content);
        
        return analysis;
      } catch (error) {
        console.error("Error reading or validating resume:", error);
        throw error; // Propagate the error to be handled by the caller
      }
    }
    
    // Handle direct text content case
    const analysis = generateDetailedAnalysis(content);
    
    return analysis;
  } catch (error) {
    console.error("Error in AI resume parsing:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
