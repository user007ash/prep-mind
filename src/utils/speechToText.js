
/**
 * Utility for speech to text conversion with sentiment analysis
 */

// Function to convert speech to text and analyze sentiment
const convertSpeechToText = async (audioBlob) => {
  try {
    // In a real implementation, this would call Groq Cloud's API endpoint
    // For this demo, we'll simulate the response
    return simulateSpeechToText(audioBlob);
  } catch (error) {
    console.error("Error converting speech to text:", error);
    throw error;
  }
};

// Mock function to simulate speech to text conversion with sentiment analysis
const simulateSpeechToText = async (audioBlob) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Example mock responses with more detailed sentiment analysis
      const mockResponses = [
        {
          text: "In my role as a frontend developer, I was responsible for building responsive user interfaces using React and modern JavaScript. I worked closely with designers to implement UI components and integrated REST APIs to fetch and display data. One of my key achievements was improving the page load performance by 40% through code optimization and implementing lazy loading techniques.",
          sentiment: {
            confidence: 0.85,
            emotion: "positive",
            engagement: 0.78,
            clarity: 0.82,
            hesitationRatio: 0.05,
            fillerWordCount: 2,
            speakingRate: "good",
            toneAnalysis: "confident and professional"
          }
        },
        {
          text: "At Creative Agency, I was primarily focused on designing and implementing user interfaces for client websites. I created wireframes and mockups using Figma, and then translated those designs into responsive websites using HTML, CSS, and JavaScript. I also collaborated with the backend team to ensure smooth integration of frontend and backend components.",
          sentiment: {
            confidence: 0.79,
            emotion: "neutral",
            engagement: 0.75,
            clarity: 0.80,
            hesitationRatio: 0.08,
            fillerWordCount: 4,
            speakingRate: "moderate",
            toneAnalysis: "informative but slightly monotone"
          }
        },
        {
          text: "For the e-commerce platform project, I used React for the frontend, Node.js with Express for the backend, and MongoDB for the database. The main challenges were implementing a secure payment system and ensuring the site performed well with a large product catalog. I solved these by using code splitting to reduce bundle size and implementing proper caching strategies.",
          sentiment: {
            confidence: 0.88,
            emotion: "positive",
            engagement: 0.82,
            clarity: 0.85,
            hesitationRatio: 0.03,
            fillerWordCount: 1,
            speakingRate: "good",
            toneAnalysis: "enthusiastic and knowledgeable"
          }
        },
        {
          text: "When approaching responsive design, I start with a mobile-first approach. I use CSS flexbox and grid for layout, along with media queries to adjust the design for different screen sizes. I test on various devices and make sure that the user experience is consistent across all platforms. I also pay close attention to performance, especially for mobile users who might have slower connections.",
          sentiment: {
            confidence: 0.83,
            emotion: "neutral",
            engagement: 0.76,
            clarity: 0.84,
            hesitationRatio: 0.06,
            fillerWordCount: 3,
            speakingRate: "good",
            toneAnalysis: "methodical and clear"
          }
        },
        {
          text: "Umm, I think I've worked on several, you know, projects that required team collaboration. Like, we had to, um, coordinate with different departments and, like, make sure everyone was on the same page. It was challenging at times, but we managed to, um, complete the project on time.",
          sentiment: {
            confidence: 0.60,
            emotion: "uncertain",
            engagement: 0.55,
            clarity: 0.48,
            hesitationRatio: 0.25,
            fillerWordCount: 8,
            speakingRate: "slow with pauses",
            toneAnalysis: "uncertain and hesitant"
          }
        },
        {
          text: "I believe my greatest strength is my ability to adapt quickly to new technologies and environments. In my previous role, I had to learn a completely new framework within two weeks to meet a critical deadline, and I was able to deliver the project successfully.",
          sentiment: {
            confidence: 0.90,
            emotion: "positive",
            engagement: 0.88,
            clarity: 0.92,
            hesitationRatio: 0.02,
            fillerWordCount: 0,
            speakingRate: "excellent pace",
            toneAnalysis: "confident and assertive"
          }
        },
      ];
      
      // Return a random mock response
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      resolve(randomResponse);
    }, 1500);
  });
};

export { convertSpeechToText };
