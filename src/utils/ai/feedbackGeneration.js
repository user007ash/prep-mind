
/**
 * Feedback generation utilities for interview analysis
 */

// Helper function to generate answer feedback
const generateAnswerFeedback = (score, answer) => {
  const excellentFeedback = [
    "Excellent answer that clearly demonstrates your expertise.",
    "Very comprehensive response with great examples.",
    "Strong answer that effectively addresses the question.",
    "Well-structured response with relevant details."
  ];
  
  const goodFeedback = [
    "Good answer that covers the key points.",
    "Solid response, though could include more specific examples.",
    "Effective answer that demonstrates your knowledge.",
    "Clear response that addresses the question well."
  ];
  
  const averageFeedback = [
    "Adequate answer but could be more comprehensive.",
    "Basic response that meets minimum requirements.",
    "Answer covers some key points but lacks detail.",
    "Relevant response but could be better organized."
  ];
  
  const poorFeedback = [
    "Response lacks sufficient detail and examples.",
    "Answer is too vague and doesn't fully address the question.",
    "Could provide more concrete examples to support your claims.",
    "Response needs more structure and clarity."
  ];
  
  if (score >= 90) {
    return excellentFeedback[Math.floor(Math.random() * excellentFeedback.length)];
  } else if (score >= 80) {
    return goodFeedback[Math.floor(Math.random() * goodFeedback.length)];
  } else if (score >= 70) {
    return averageFeedback[Math.floor(Math.random() * averageFeedback.length)];
  } else {
    return poorFeedback[Math.floor(Math.random() * poorFeedback.length)];
  }
};

// Helper function to generate strengths
const generateStrengths = (answers) => {
  const strengths = [
    "Good technical understanding demonstrated in answers",
    "Clear communication of project experiences",
    "Positive attitude throughout the interview",
    "Structured responses with relevant examples",
    "Effective explanation of problem-solving approaches"
  ];
  
  // Add conditional strengths based on answer content
  const allAnswersText = Object.values(answers).map(a => a.answer).join(' ');
  
  if (/\b(team|collaborat|together)\b/i.test(allAnswersText)) {
    strengths.unshift("Strong emphasis on teamwork and collaboration");
  }
  
  if (/\b(problem[\s-]solv|debug|fix|resolv|solution)\b/i.test(allAnswersText)) {
    strengths.unshift("Excellent problem-solving abilities highlighted");
  }
  
  if (/\b(leader|lead|guidance|direct|manage)\b/i.test(allAnswersText)) {
    strengths.unshift("Leadership qualities demonstrated throughout responses");
  }
  
  return strengths.slice(0, 5);
};

// Helper function to generate improvements
const generateImprovements = (answers) => {
  return [
    "Provide more specific examples when discussing achievements",
    "Be more concise in some of your longer responses",
    "Focus more on quantifiable impacts of your work",
    "Highlight more of your collaborative experiences",
    "Reduce filler words and hesitations in responses"
  ];
};

export {
  generateAnswerFeedback,
  generateStrengths,
  generateImprovements
};
