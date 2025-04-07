
/**
 * AI Agent for resume parsing and ATS scoring
 */

/**
 * Parse resume text and return ATS score and analysis
 * @param {string|File} resumeData - The resume text or file to parse
 * @returns {Promise<Object>} - Resume analysis including ATS score
 */
export const parseResume = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud or another LLM API
    // For now, we'll use a placeholder implementation
    console.log("Parsing resume:", resumeData);
    
    // If we have a file object, extract text content
    let content = resumeData;
    if (resumeData instanceof File) {
      // Read file content if it's a File object
      content = await readFileContent(resumeData);
    }
    
    // Generate a mock analysis
    const analysis = generateMockAnalysis(content);
    
    return analysis;
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume: " + error.message);
  }
};

/**
 * Generate a mock resume analysis
 * @param {string} content - The resume content
 * @returns {Object} - Mock resume analysis
 */
const generateMockAnalysis = (content) => {
  // Calculate a score based on content length for demo purposes
  let baseScore = 75;
  if (typeof content === 'string') {
    baseScore = Math.min(85, 60 + (content.length / 500));
  }
  
  // Add randomness for more realistic output
  const randomFactor = Math.floor(Math.random() * 10) - 5;
  const atsScore = Math.min(100, Math.max(40, Math.round(baseScore + randomFactor)));
  
  return {
    atsScore,
    summary: "Candidate has strong technical skills and relevant experience.",
    keySkills: ["JavaScript", "React", "Node.js", "TypeScript", "API Integration"],
    missingElements: atsScore < 70 ? ["Quantifiable achievements", "Project details"] : [],
    recommendations: [
      "Add more measurable achievements",
      "Include specific technologies used in each role",
      "Customize keywords based on job descriptions"
    ],
    completeness: atsScore / 100
  };
};

/**
 * Read content from a File object
 * @param {File} file - The file to read
 * @returns {Promise<string>} - The file content
 */
const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
