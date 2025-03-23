
/**
 * Utility for parsing and processing resume files
 */

const parseResume = async (file) => {
  try {
    // Validate file type first
    if (!validateFileType(file)) {
      throw new Error("Invalid file type. Please upload a PDF or Word document.");
    }

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

// Validate the file type is PDF or DOCX
const validateFileType = (file) => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  return validTypes.includes(file.type);
};

// Validate resume content has essential elements
const validateResumeContent = (content) => {
  // Define regex patterns for essential resume elements
  const patterns = {
    contactInfo: /email|phone|@|tel|\d{3}[-.]?\d{3}[-.]?\d{4}/i,
    education: /education|university|college|school|degree|bachelor|master|phd/i,
    experience: /experience|work|job|position|employer|company/i,
    skills: /skills|technologies|languages|proficient|familiar|expertise/i
  };

  // Check if the content contains the essential elements
  const hasContactInfo = patterns.contactInfo.test(content);
  const hasEducation = patterns.education.test(content);
  const hasExperience = patterns.experience.test(content);
  const hasSkills = patterns.skills.test(content);

  // Resume should have at least 3 of these 4 elements
  const essentialElementsFound = [hasContactInfo, hasEducation, hasExperience, hasSkills]
    .filter(Boolean).length;

  return {
    isValid: essentialElementsFound >= 3,
    missingElements: {
      contactInfo: !hasContactInfo,
      education: !hasEducation,
      experience: !hasExperience,
      skills: !hasSkills
    }
  };
};

// Simulate resume parsing (in a real app, this would be an API call)
const simulateResumeProcessing = async (file) => {
  return new Promise((resolve, reject) => {
    // Simulate processing time
    setTimeout(() => {
      // Read the file to validate content
      const reader = new FileReader();
      
      reader.onload = () => {
        const content = reader.result;
        
        // Validate resume content
        const contentValidation = validateResumeContent(content);
        
        if (!contentValidation.isValid) {
          const missingParts = Object.entries(contentValidation.missingElements)
            .filter(([, isMissing]) => isMissing)
            .map(([element]) => element)
            .join(', ');
            
          reject(new Error(`Your resume seems incomplete. Missing: ${missingParts}. Please upload a valid resume with proper details.`));
          return;
        }
        
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
      
      reader.onerror = () => {
        reject(new Error("Failed to read the resume file. Please try again."));
      };
      
      reader.readAsText(file);
    }, 2000);
  });
};

export { parseResume };
