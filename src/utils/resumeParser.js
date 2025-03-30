
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

// Improved resume content validation with more lenient requirements
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

  // Create a score based on the presence of each element
  const essentialElementsFound = [hasContactInfo, hasEducation, hasExperience, hasSkills]
    .filter(Boolean).length;
    
  // Calculate a percentage-based completeness score
  const completenessScore = (essentialElementsFound / 4) * 100;

  return {
    isValid: true, // We'll accept all resumes but provide feedback
    completenessScore,
    elements: {
      contactInfo: hasContactInfo,
      education: hasEducation,
      experience: hasExperience,
      skills: hasSkills
    }
  };
};

// Simulate resume parsing with improved error handling and feedback
const simulateResumeProcessing = async (file) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Read the file to validate content
      const reader = new FileReader();
      
      reader.onload = () => {
        const content = reader.result;
        
        // Validate resume content
        const contentValidation = validateResumeContent(content);
        
        // Generate realistic skills based on content
        const skillsDetected = detectSkills(content);
        
        // Create parsed data with feedback on resume quality
        const mockParsedData = {
          filename: file.name,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          skills: skillsDetected.length > 0 
            ? skillsDetected 
            : ["JavaScript", "React", "Node.js", "CSS", "HTML", "API Integration", "Git", "UI/UX Design"],
          experience: generateExperienceData(),
          education: generateEducationData(),
          projects: generateProjectsData(),
          completenessScore: contentValidation.completenessScore,
          missingElements: Object.entries(contentValidation.elements)
            .filter(([, exists]) => !exists)
            .map(([element]) => element)
        };
        
        resolve(mockParsedData);
      };
      
      reader.onerror = () => {
        // Even if there's an error reading the file, we'll provide mock data
        resolve({
          filename: file.name,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
          experience: generateExperienceData(),
          education: generateEducationData(),
          projects: generateProjectsData(),
          completenessScore: 70,
          missingElements: ["Couldn't fully analyze the resume"]
        });
      };
      
      reader.readAsText(file);
    }, 1500);
  });
};

// Helper function to detect skills from resume content
const detectSkills = (content) => {
  const commonSkills = [
    "JavaScript", "React", "Angular", "Vue", "Node.js", "Express", 
    "Python", "Django", "Flask", "Java", "Spring", "C#", ".NET",
    "PHP", "Laravel", "HTML", "CSS", "SASS", "LESS", "Bootstrap",
    "Tailwind", "Material UI", "SQL", "MongoDB", "PostgreSQL", 
    "MySQL", "Firebase", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
    "Git", "CI/CD", "Jenkins", "GitHub Actions", "Agile", "Scrum",
    "TypeScript", "GraphQL", "REST API", "Redux", "MobX", "Webpack", 
    "Babel", "ESLint", "Jest", "Mocha", "Cypress", "Selenium"
  ];
  
  // Detect skills from content
  const detectedSkills = commonSkills.filter(skill => 
    new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(content)
  );
  
  // Add at least some skills if none detected
  if (detectedSkills.length < 5) {
    const randomSkills = commonSkills
      .sort(() => 0.5 - Math.random())
      .slice(0, 8 - detectedSkills.length);
    return [...new Set([...detectedSkills, ...randomSkills])];
  }
  
  return detectedSkills.slice(0, 10); // Cap at 10 skills
};

// Helper functions to generate mock data
const generateExperienceData = () => [
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
];

const generateEducationData = () => [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    year: "2018"
  }
];

const generateProjectsData = () => [
  {
    name: "E-commerce Platform",
    description: "Built a full-stack e-commerce application with React, Node.js and MongoDB."
  },
  {
    name: "Portfolio Website",
    description: "Designed and developed a responsive portfolio website with modern animations."
  }
];

export { parseResume };
