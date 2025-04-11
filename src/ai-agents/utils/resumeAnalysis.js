
/**
 * Utility functions for resume analysis
 */

import { detectSkillsFromContent } from './skillDetection';
import { generateMissingElements, generateSuggestions, generateSummary } from './feedbackGeneration';

/**
 * Generate a detailed resume analysis with improved metrics
 * @param {string} content - The resume content
 * @returns {Object} - Detailed resume analysis
 */
export const generateDetailedAnalysis = (content) => {
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
