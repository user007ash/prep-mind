
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

// Simulate AI response for resume analysis
const simulateResumeAnalysis = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random ATS score between 60 and 95
      const atsScore = Math.floor(Math.random() * 36) + 60;
      
      resolve({
        atsScore,
        feedback: {
          strengths: [
            "Good use of action verbs",
            "Clear project descriptions",
            "Relevant technical skills highlighted",
            "Appropriate length and formatting",
            "Consistent employment history"
          ],
          weaknesses: [
            "Could use more quantifiable achievements",
            "Some technical terms could be more industry-specific",
            "Consider adding more keywords from job descriptions",
            "Education section could be enhanced",
            "Missing certifications section"
          ],
          suggestedImprovements: [
            "Add metrics to demonstrate impact (e.g., 'Increased conversion rate by 25%')",
            "Incorporate more industry-specific keywords",
            "Add relevant certifications or coursework",
            "Customize resume for each job application",
            "Include a brief professional summary at the top"
          ]
        }
      });
    }, 1500);
  });
};

// Simulate AI response for question generation
const simulateQuestionGeneration = async (resumeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate questions based on the resume data
      const questions = [
        "Tell me about your experience as a Frontend Developer at Tech Solutions Inc.",
        "What were your main responsibilities at Creative Agency?",
        "Describe the E-commerce Platform project you built. What technologies did you use and what challenges did you face?",
        "How do you approach responsive design in your projects?",
        "Can you explain how you've used React in your previous work?",
        "What is your process for integrating APIs into frontend applications?",
        "How do you stay updated with the latest trends in web development?",
        "Describe a difficult technical problem you solved recently.",
        "How do you balance meeting deadlines with ensuring code quality?",
        "Tell me about a time when you had to collaborate with a difficult team member."
      ];
      
      resolve(questions);
    }, 1000);
  });
};

// Simulate AI response for answer analysis with comprehensive feedback
const simulateAnswerAnalysis = async (questions, answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random scores
      const contentScore = Math.floor(Math.random() * 31) + 70;
      const sentimentScore = Math.floor(Math.random() * 31) + 70;
      const clarityScore = Math.floor(Math.random() * 31) + 70;
      const confidenceScore = Math.floor(Math.random() * 31) + 70;
      const relevanceScore = Math.floor(Math.random() * 31) + 70;
      
      // Calculate overall score
      const overallScore = Math.round((contentScore + sentimentScore + clarityScore + confidenceScore + relevanceScore) / 5);
      
      // Detailed answer analysis
      const answerAnalysis = Object.keys(answers).map(question => {
        const answerScore = Math.floor(Math.random() * 31) + 70;
        return {
          question,
          answer: answers[question].answer,
          score: answerScore,
          feedback: generateRandomFeedback(answerScore),
          sentiment: answers[question].sentiment
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
        strengths: [
          "Good technical understanding demonstrated in answers",
          "Clear communication of project experiences",
          "Positive attitude throughout the interview",
          "Structured responses with relevant examples",
          "Effective explanation of problem-solving approaches"
        ],
        improvements: [
          "Provide more specific examples when discussing achievements",
          "Be more concise in some of your longer responses",
          "Focus more on quantifiable impacts of your work",
          "Highlight more of your collaborative experiences",
          "Reduce filler words and hesitations in responses"
        ],
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

// Helper function to generate random feedback based on score
const generateRandomFeedback = (score) => {
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

export { analyzeResume, generateInterviewQuestions, analyzeInterviewAnswers };
