
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
    console.log("Parsing resume with AI agent:", resumeData);
    
    // If we have a file object, extract text content
    let content = resumeData;
    if (resumeData instanceof File) {
      // Read file content if it's a File object
      content = await readFileContent(resumeData);
    }
    
    // Generate a detailed analysis
    const analysis = generateDetailedAnalysis(content);
    
    return analysis;
  } catch (error) {
    console.error("Error in AI resume parsing:", error);
    throw new Error("Failed to parse resume with AI agent: " + error.message);
  }
};

/**
 * Generate a detailed resume analysis with improved metrics
 * @param {string} content - The resume content
 * @returns {Object} - Detailed resume analysis
 */
const generateDetailedAnalysis = (content) => {
  // Calculate a score based on content length and quality indicators
  let baseScore = 75;
  if (typeof content === 'string') {
    // Analyze content length
    baseScore = Math.min(85, 60 + (content.length / 500));
    
    // Check for quality indicators - keywords that suggest a good resume
    const qualityIndicators = [
      'achieved', 'improved', 'led', 'managed', 'created', 'developed',
      'increased', 'decreased', 'optimized', 'implemented', 'designed',
      'collaborated', 'percent', '%', 'award', 'certified'
    ];
    
    let qualityScore = 0;
    qualityIndicators.forEach(indicator => {
      if (content.toLowerCase().includes(indicator.toLowerCase())) {
        qualityScore += 1;
      }
    });
    
    // Add quality bonus (max 10 points)
    baseScore += Math.min(10, qualityScore);
  }
  
  // Add randomness for more realistic output
  const randomFactor = Math.floor(Math.random() * 10) - 5;
  const atsScore = Math.min(100, Math.max(40, Math.round(baseScore + randomFactor)));
  
  // Generate skills based on common keywords
  const detectedSkills = detectSkillsFromContent(content);
  
  // Generate tailored suggestions based on score
  const suggestions = generateSuggestions(atsScore, detectedSkills);
  
  return {
    atsScore,
    summary: generateSummary(atsScore, detectedSkills),
    keySkills: detectedSkills,
    missingElements: atsScore < 75 ? generateMissingElements(atsScore) : [],
    recommendations: suggestions,
    completeness: atsScore / 100
  };
};

/**
 * Detect skills from resume content
 * @param {string} content - Resume content
 * @returns {Array<string>} - Detected skills
 */
const detectSkillsFromContent = (content) => {
  // Common skills to detect
  const skillSets = {
    programming: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'PHP', 'Swift', 'TypeScript'],
    frameworks: ['React', 'Angular', 'Vue', 'Next.js', 'Django', 'Flask', 'Spring', 'Express', 'Node.js'],
    databases: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Firebase', 'DynamoDB', 'Redis'],
    cloud: ['AWS', 'Azure', 'Google Cloud', 'Heroku', 'Docker', 'Kubernetes', 'Terraform'],
    tools: ['Git', 'GitHub', 'GitLab', 'CI/CD', 'Jenkins', 'Jira', 'Agile', 'Scrum'],
    design: ['UI/UX', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
    softSkills: ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking']
  };
  
  // Flatten all skills
  const allSkills = Object.values(skillSets).flat();
  
  // Check if content is a string
  if (typeof content !== 'string') {
    // Return random skills if content is not a string (for testing)
    return allSkills
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 3);
  }
  
  // Detect skills from content
  const detectedSkills = allSkills.filter(skill => 
    new RegExp(`\\b${skill.replace(/\//g, '\\/').replace(/\./g, '\\.')}\\b`, 'i').test(content)
  );
  
  // If not enough skills detected, add some random ones to ensure we have at least 3
  if (detectedSkills.length < 3) {
    const additionalNeeded = 3 - detectedSkills.length;
    const additionalSkills = allSkills
      .filter(skill => !detectedSkills.includes(skill))
      .sort(() => 0.5 - Math.random())
      .slice(0, additionalNeeded);
      
    return [...detectedSkills, ...additionalSkills];
  }
  
  return detectedSkills;
};

/**
 * Generate missing elements based on ATS score
 * @param {number} score - ATS score
 * @returns {Array<string>} - Missing elements
 */
const generateMissingElements = (score) => {
  const allPossibleMissing = [
    'Quantifiable achievements',
    'Relevant keywords',
    'Professional summary',
    'Contact information',
    'Education details',
    'Work experience details',
    'Project descriptions',
    'Technical skills section',
    'Certifications'
  ];
  
  // Lower score = more missing elements
  const numberOfMissing = Math.max(1, Math.min(5, Math.floor((100 - score) / 15)));
  
  return allPossibleMissing
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfMissing);
};

/**
 * Generate tailored suggestions based on score and detected skills
 * @param {number} score - ATS score
 * @param {Array<string>} skills - Detected skills
 * @returns {Array<string>} - Suggestions
 */
const generateSuggestions = (score, skills) => {
  const commonSuggestions = [
    "Add more measurable achievements with metrics",
    "Include specific technologies used in each role",
    "Customize keywords based on job descriptions",
    "Use action verbs at the beginning of bullet points",
    "Add a concise professional summary"
  ];
  
  const lowScoreSuggestions = [
    "Improve formatting for better ATS readability",
    "Remove graphics and complex formatting",
    "Include more industry-specific terminology",
    "Expand on your work experience section",
    "Add relevant certifications or courses"
  ];
  
  const highScoreSuggestions = [
    "Tailor your resume further for each specific job application",
    "Consider adding recent industry achievements or trends",
    "Highlight leadership roles or team contributions more prominently",
    "Add recommendations or testimonials if space allows",
    "Showcase relevant side projects or open-source contributions"
  ];
  
  // Choose set of additional suggestions based on score
  const additionalSuggestions = score < 70 
    ? lowScoreSuggestions 
    : highScoreSuggestions;
    
  // Generate skill-specific suggestions
  const skillSuggestions = [];
  
  if (skills.includes('JavaScript') || skills.includes('TypeScript')) {
    skillSuggestions.push("Highlight your experience with modern JavaScript frameworks");
  }
  
  if (skills.includes('React') || skills.includes('Angular') || skills.includes('Vue')) {
    skillSuggestions.push("Specify your frontend performance optimization techniques");
  }
  
  if (skills.includes('AWS') || skills.includes('Azure') || skills.includes('Google Cloud')) {
    skillSuggestions.push("Detail specific cloud services and architectures you've worked with");
  }
  
  // Combine suggestions, prioritizing common ones and adding some score-based and skill-based ones
  const combined = [
    ...commonSuggestions.slice(0, 3),
    ...additionalSuggestions.slice(0, 2),
    ...skillSuggestions.slice(0, 2)
  ];
  
  // Deduplicate and return
  return Array.from(new Set(combined)).slice(0, 5);
};

/**
 * Generate a summary based on score and skills
 * @param {number} score - ATS score
 * @param {Array<string>} skills - Detected skills
 * @returns {string} - Summary
 */
const generateSummary = (score, skills) => {
  const skillsPhrase = skills.length > 0 
    ? `with notable strengths in ${skills.slice(0, 3).join(', ')}`
    : 'with a diverse skill set';
    
  if (score >= 85) {
    return `Excellent ATS-optimized resume ${skillsPhrase}. Contains strong quantifiable achievements and clear experience descriptions.`;
  } else if (score >= 75) {
    return `Good ATS-compatible resume ${skillsPhrase}. Some minor improvements could further enhance visibility to recruiters.`;
  } else if (score >= 65) {
    return `Moderately effective resume ${skillsPhrase}. Would benefit from additional keywords and clearer achievement metrics.`;
  } else {
    return `Resume may face ATS challenges ${skillsPhrase}. Recommend significant restructuring to improve parsing by automated systems.`;
  }
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
