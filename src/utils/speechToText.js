
/**
 * Utility for speech to text conversion
 */

// Function to convert speech to text
const convertSpeechToText = async (audioBlob) => {
  try {
    // In a real implementation, this would call an API endpoint
    // For this demo, we'll simulate the response
    return simulateSpeechToText(audioBlob);
  } catch (error) {
    console.error("Error converting speech to text:", error);
    throw error;
  }
};

// Mock function to simulate speech to text conversion
const simulateSpeechToText = async (audioBlob) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Example mock responses
      const mockResponses = [
        {
          text: "In my role as a frontend developer, I was responsible for building responsive user interfaces using React and modern JavaScript. I worked closely with designers to implement UI components and integrated REST APIs to fetch and display data. One of my key achievements was improving the page load performance by 40% through code optimization and implementing lazy loading techniques.",
          sentiment: {
            confidence: 0.85,
            emotion: "positive",
            engagement: 0.78,
            clarity: 0.82
          }
        },
        {
          text: "At Creative Agency, I was primarily focused on designing and implementing user interfaces for client websites. I created wireframes and mockups using Figma, and then translated those designs into responsive websites using HTML, CSS, and JavaScript. I also collaborated with the backend team to ensure smooth integration of frontend and backend components.",
          sentiment: {
            confidence: 0.79,
            emotion: "neutral",
            engagement: 0.75,
            clarity: 0.80
          }
        },
        {
          text: "For the e-commerce platform project, I used React for the frontend, Node.js with Express for the backend, and MongoDB for the database. The main challenges were implementing a secure payment system and ensuring the site performed well with a large product catalog. I solved these by using code splitting to reduce bundle size and implementing proper caching strategies.",
          sentiment: {
            confidence: 0.88,
            emotion: "positive",
            engagement: 0.82,
            clarity: 0.85
          }
        },
        {
          text: "When approaching responsive design, I start with a mobile-first approach. I use CSS flexbox and grid for layout, along with media queries to adjust the design for different screen sizes. I test on various devices and make sure that the user experience is consistent across all platforms. I also pay close attention to performance, especially for mobile users who might have slower connections.",
          sentiment: {
            confidence: 0.83,
            emotion: "neutral",
            engagement: 0.76,
            clarity: 0.84
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
