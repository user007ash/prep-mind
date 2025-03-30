
/**
 * Utility for interacting with AI services (Groq Cloud in this case)
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

// Function to generate interview questions based on resume
const generateInterviewQuestions = async (resumeData) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateQuestionGeneration(resumeData);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};

// Function to analyze interview answers with enhanced feedback
const analyzeInterviewAnswers = async (questions, answers) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateAnswerAnalysis(questions, answers);
  } catch (error) {
    console.error("Error analyzing answers:", error);
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

// Simulate AI response for question generation
const simulateQuestionGeneration = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate questions based on the resume data
      const questions = [];
      
      // Add experience-based questions
      if (resumeData.experience && resumeData.experience.length > 0) {
        resumeData.experience.forEach(exp => {
          questions.push(`Tell me about your experience as a ${exp.title} at ${exp.company}.`);
        });
      }
      
      // Add project-based questions
      if (resumeData.projects && resumeData.projects.length > 0) {
        const project = resumeData.projects[0];
        questions.push(`Describe the ${project.name} project. What technologies did you use and what challenges did you face?`);
      }
      
      // Add skill-based questions
      if (resumeData.skills && resumeData.skills.length > 0) {
        const randomSkills = resumeData.skills
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
          
        randomSkills.forEach(skill => {
          questions.push(`How have you used ${skill} in your previous work?`);
        });
      }
      
      // Add general questions to reach 10 questions total
      const generalQuestions = [
        "How do you approach responsive design in your projects?",
        "What is your process for integrating APIs into frontend applications?",
        "How do you stay updated with the latest trends in web development?",
        "Describe a difficult technical problem you solved recently.",
        "How do you balance meeting deadlines with ensuring code quality?",
        "Tell me about a time when you had to collaborate with a difficult team member.",
        "What's your approach to debugging complex issues?",
        "How do you handle constructive criticism?",
        "Where do you see yourself in 5 years?",
        "Why are you interested in this position?"
      ];
      
      // Fill remaining slots with general questions
      const remainingSlots = 10 - questions.length;
      questions.push(...generalQuestions.slice(0, remainingSlots));
      
      resolve(questions);
    }, 1000);
  });
};

// Simulate AI response for answer analysis with comprehensive feedback
const simulateAnswerAnalysis = async (questions, answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate more realistic scores based on answer content
      const contentScore = calculateContentScore(answers);
      const sentimentScore = calculateSentimentScore(answers);
      const clarityScore = Math.floor(Math.random() * 31) + 70;
      const confidenceScore = Math.floor(Math.random() * 31) + 70;
      const relevanceScore = Math.floor(Math.random() * 31) + 70;
      
      // Calculate overall score
      const overallScore = Math.round((contentScore + sentimentScore + clarityScore + confidenceScore + relevanceScore) / 5);
      
      // Detailed answer analysis
      const answerAnalysis = Object.keys(answers).map(question => {
        const answer = answers[question].answer;
        const answerScore = calculateAnswerScore(answer);
        
        return {
          question,
          answer,
          score: answerScore,
          feedback: generateAnswerFeedback(answerScore, answer),
          sentiment: answers[question].sentiment || "neutral"
        };
      });
      
      const feedbackResult = {
        overallScore,
        contentScore,
        sentimentScore,
        clarityScore,
        confidenceScore,
        relevanceScore,
        answerAnalysis,
        strengths: generateStrengths(answers),
        improvements: generateImprovements(answers),
        communicationFeedback: {
          tone: "Your tone was generally positive and professional, which creates a good impression.",
          pacing: "Your speaking pace was good, though occasionally rushed when discussing technical details.",
          clarity: "Your explanations were mostly clear, but some technical concepts could be explained more simply.",
          confidence: "You demonstrated good confidence in most answers, particularly when discussing your areas of expertise.",
          improvements: "Consider reducing filler words like 'um' and 'you know' to sound more confident and prepared."
        },
        overall: "You demonstrated strong technical knowledge and communicated your experiences clearly. Your answers were generally well-structured and relevant to the questions. To improve, focus on providing more specific, quantifiable examples of your achievements and being more concise in some responses. Additionally, emphasize your collaborative skills and the impact of your work more clearly. Your communication style is professional, though reducing filler words would enhance your delivery."
      };
      
      resolve(feedbackResult);
    }, 2000);
  });
};

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

export { analyzeResume, generateInterviewQuestions, analyzeInterviewAnswers };
