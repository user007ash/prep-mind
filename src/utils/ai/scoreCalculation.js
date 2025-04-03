
/**
 * Score calculation utilities for interview analysis
 */

// Helper function to calculate content score
const calculateContentScore = (answers) => {
  // Base score
  let score = 70;
  
  // Check answer lengths
  const answerLengths = Object.values(answers).map(a => a.answer.length);
  const avgLength = answerLengths.reduce((sum, len) => sum + len, 0) / answerLengths.length;
  
  // Ideal answer length range is 100-500 characters
  if (avgLength > 100 && avgLength < 500) {
    score += 10;
  } else if (avgLength > 500) {
    score += 5; // Too verbose
  } else {
    score -= 5; // Too short
  }
  
  // Check for keyword diversity
  const allAnswersText = Object.values(answers).map(a => a.answer).join(' ');
  const uniqueWords = new Set(allAnswersText.toLowerCase().match(/\b\w{4,}\b/g) || []).size;
  
  if (uniqueWords > 100) {
    score += 15;
  } else if (uniqueWords > 50) {
    score += 10;
  } else {
    score += 5;
  }
  
  // Cap at 100
  return Math.min(Math.max(score, 50), 100);
};

// Helper function to calculate sentiment score
const calculateSentimentScore = (answers) => {
  // Count different sentiments
  const sentiments = Object.values(answers).map(a => a.sentiment || "neutral");
  const positiveCount = sentiments.filter(s => s === "positive").length;
  const neutralCount = sentiments.filter(s => s === "neutral").length;
  const negativeCount = sentiments.filter(s => s === "negative").length;
  
  // Calculate score (positive is good, but too much can seem insincere)
  const totalAnswers = sentiments.length;
  const positiveRatio = positiveCount / totalAnswers;
  const negativeRatio = negativeCount / totalAnswers;
  
  let score = 75; // Base score
  
  if (positiveRatio > 0.7) {
    score += 10;
  } else if (positiveRatio > 0.5) {
    score += 15; // Optimal positive ratio
  } else if (positiveRatio > 0.3) {
    score += 5;
  }
  
  if (negativeRatio > 0.2) {
    score -= 15; // Too negative
  }
  
  return Math.min(Math.max(score, 50), 100);
};

// Helper function to calculate individual answer score
const calculateAnswerScore = (answer) => {
  // Base score between 70-90
  let score = 70 + Math.floor(Math.random() * 20);
  
  // Length factor
  if (answer.length > 300 && answer.length < 600) {
    score += 5; // Good length
  } else if (answer.length < 100) {
    score -= 10; // Too short
  } else if (answer.length > 800) {
    score -= 5; // Too long
  }
  
  // Check for specific content patterns
  if (/\b(result|achiev|impact|improve|increase|decrease|percent|%|growth)\b/i.test(answer)) {
    score += 5; // Mentioned achievements/metrics
  }
  
  if (/\b(we|team|collaborat|together|communicate)\b/i.test(answer)) {
    score += 5; // Mentioned teamwork
  }
  
  if (/\b(challenge|problem|difficult|obstacle|overcome)\b/i.test(answer)) {
    score += 5; // Mentioned challenges and solutions
  }
  
  // Cap at 100
  return Math.min(Math.max(score, 50), 100);
};

export {
  calculateContentScore,
  calculateSentimentScore,
  calculateAnswerScore
};
