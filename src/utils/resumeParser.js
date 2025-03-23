
/**
 * Utility for parsing and processing resume files
 */

const parseResume = async (file) => {
  try {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('resume', file);

    // In a real implementation, you would send this to a backend API
    // For this demo, we'll simulate the process
    return simulateResumeProcessing(file);
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw error;
  }
};

// Simulate resume parsing (in a real app, this would be an API call)
const simulateResumeProcessing = async (file) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Read the file to get the name at least
      const reader = new FileReader();
      
      reader.onload = () => {
        // Create mock parsed data
        const mockParsedData = {
          filename: file.name,
          skills: [
            "JavaScript", "React", "Node.js", "CSS", "HTML", 
            "API Integration", "Git", "UI/UX Design"
          ],
          experience: [
            {
              title: "Frontend Developer",
              company: "Tech Solutions Inc.",
              duration: "2020 - Present",
              description: "Developed responsive web applications using React and modern JavaScript."
            },
            {
              title: "Web Designer",
              company: "Creative Agency",
              duration: "2018 - 2020",
              description: "Created UI/UX designs and implemented them using HTML, CSS and JavaScript."
            }
          ],
          education: [
            {
              degree: "Bachelor of Science in Computer Science",
              institution: "University of Technology",
              year: "2018"
            }
          ],
          projects: [
            {
              name: "E-commerce Platform",
              description: "Built a full-stack e-commerce application with React, Node.js and MongoDB."
            },
            {
              name: "Portfolio Website",
              description: "Designed and developed a responsive portfolio website with modern animations."
            }
          ]
        };
        
        resolve(mockParsedData);
      };
      
      reader.readAsText(file);
    }, 2000);
  });
};

export { parseResume };
