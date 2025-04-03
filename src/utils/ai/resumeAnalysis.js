
/**
 * Resume analysis service
 */

// Function to analyze resume with AI and get ATS score
const analyzeResume = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateResumeAnalysis(resumeData);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

// Improved resume analysis simulation
const simulateResumeAnalysis = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate ATS score based on resume data quality
      let atsScore = calculateATSScore(resumeData);
      
      resolve({
        atsScore,
        resumeData, // Pass the resume data for reference
        feedback: generateATSFeedback(atsScore, resumeData)
      });
    }, 1500);
  });
};

// Calculate ATS score based on resume data quality
const calculateATSScore = (resumeData) => {
  // Base score from resume completeness
  let baseScore = resumeData.completenessScore || 75;
  
  // Skills factor - more relevant skills = higher score
  const skillsFactor = Math.min(resumeData.skills.length / 10, 1) * 20;
  
  // Experience factor
  const experienceFactor = resumeData.experience ? 
    Math.min(resumeData.experience.length * 5, 15) : 0;
  
  // Education factor
  const educationFactor = resumeData.education ? 
    Math.min(resumeData.education.length * 5, 10) : 0;
  
  // Projects factor
  const projectsFactor = resumeData.projects ? 
    Math.min(resumeData.projects.length * 2.5, 5) : 0;
  
  // Calculate weighted score with some randomness to simulate AI variability
  let weightedScore = baseScore * 0.5 + 
    skillsFactor + 
    experienceFactor + 
    educationFactor + 
    projectsFactor;
  
  // Add slight randomness (±5%)
  const randomness = (Math.random() * 10) - 5;
  weightedScore += randomness;
  
  // Ensure score is between 0-100
  return Math.min(Math.max(Math.round(weightedScore), 30), 100);
};

// Generate detailed ATS feedback
const generateATSFeedback = (atsScore, resumeData) => {
  // Determine strengths based on score and data
  const strengths = [];
  if (resumeData.skills.length > 5) strengths.push("Good variety of technical skills");
  if (resumeData.experience && resumeData.experience.length > 1) strengths.push("Solid work experience");
  if (resumeData.education) strengths.push("Relevant educational background");
  if (resumeData.projects && resumeData.projects.length > 0) strengths.push("Project experience demonstrates practical skills");
  
  // Add general strengths
  strengths.push(...[
    "Good use of action verbs",
    "Clear project descriptions",
    "Appropriate length and formatting",
    "Consistent employment history"
  ].slice(0, 5 - strengths.length));
  
  // Determine weaknesses based on resume data
  const weaknesses = [];
  if (resumeData.missingElements && resumeData.missingElements.length > 0) {
    resumeData.missingElements.forEach(element => {
      weaknesses.push(`Missing or weak ${element} section`);
    });
  }
  
  // Add general improvement suggestions
  const remaining = 5 - weaknesses.length;
  weaknesses.push(...[
    "Could use more quantifiable achievements",
    "Some technical terms could be more industry-specific",
    "Consider adding more keywords from job descriptions",
    "Education section could be enhanced",
    "Missing certifications section"
  ].slice(0, remaining));
  
  // Generate improvements based on score and weaknesses
  const suggestedImprovements = [
    "Add metrics to demonstrate impact (e.g., 'Increased conversion rate by 25%')",
    "Incorporate more industry-specific keywords",
    "Add relevant certifications or coursework",
    "Customize resume for each job application",
    "Include a brief professional summary at the top"
  ];
  
  return {
    strengths,
    weaknesses,
    suggestedImprovements
  };
};

export { analyzeResume };
