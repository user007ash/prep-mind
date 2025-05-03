
/**
 * Utility functions for generating feedback and suggestions
 */

/**
 * Generate missing elements based on ATS score
 * @param {number} score - ATS score
 * @returns {Array<string>} - Missing elements
 */
export const generateMissingElements = (score) => {
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
export const generateSuggestions = (score, skills) => {
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
export const generateSummary = (score, skills) => {
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
