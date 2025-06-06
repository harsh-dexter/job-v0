// Mock profile data
const mockProfiles = {
  1: {
    profile: {
      bio: "Computer Science student passionate about web development and AI.",
      phone: "+91 9876543210",
      address: "123 Campus Road, New Delhi",
      website: "johndoe.dev",
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      dateOfBirth: "2000-05-15",
    },
    education: [
      {
        id: "edu1",
        institution: "IIT Delhi",
        degree: "B.Tech",
        field: "Computer Science",
        startDate: "2021-08",
        endDate: "2025-05",
        grade: "8.7 CGPA",
        activities: "Member of Coding Club, Participated in Smart India Hackathon",
        description: "Specializing in Artificial Intelligence and Machine Learning",
      },
      {
        id: "edu2",
        institution: "Delhi Public School",
        degree: "Higher Secondary",
        field: "Science",
        startDate: "2019-04",
        endDate: "2021-03",
        grade: "95%",
        activities: "School Captain, Science Club Lead",
        description: "Graduated with distinction in Physics and Mathematics",
      },
    ],
    skills: [
      { name: "JavaScript", level: "Advanced", years: 3 },
      { name: "React", level: "Intermediate", years: 2 },
      { name: "Python", level: "Advanced", years: 4 },
      { name: "Machine Learning", level: "Intermediate", years: 2 },
      { name: "Node.js", level: "Intermediate", years: 2 },
      { name: "SQL", level: "Intermediate", years: 3 },
    ],
    resumes: [
      {
        id: "res1",
        name: "Software Developer Resume",
        template: "modern",
        createdAt: "2023-12-10",
        downloadUrl: "#",
      },
    ],
  },
  2: {
    profile: {
      bio: "Engineering student with a passion for sustainable technology.",
      phone: "+91 8765432109",
      address: "456 College Avenue, Karnataka",
      website: "priyasharma.tech",
      github: "github.com/priyasharma",
      linkedin: "linkedin.com/in/priyasharma",
      dateOfBirth: "2001-03-22",
    },
    education: [
      {
        id: "edu1",
        institution: "NIT Karnataka",
        degree: "B.Tech",
        field: "Electrical Engineering",
        startDate: "2020-08",
        endDate: "2024-05",
        grade: "9.2 CGPA",
        activities: "IEEE Student Branch, Robotics Club",
        description: "Focusing on renewable energy systems and smart grids",
      },
    ],
    skills: [
      { name: "Circuit Design", level: "Advanced", years: 3 },
      { name: "MATLAB", level: "Advanced", years: 3 },
      { name: "Arduino", level: "Advanced", years: 4 },
      { name: "Python", level: "Intermediate", years: 2 },
      { name: "AutoCAD", level: "Intermediate", years: 2 },
    ],
    resumes: [
      {
        id: "res1",
        name: "Electrical Engineer Resume",
        template: "professional",
        createdAt: "2023-11-05",
        downloadUrl: "#",
      },
    ],
  },
  3: {
    profile: {
      bio: "Experienced recruiter specializing in tech talent acquisition.",
      phone: "+91 7654321098",
      address: "789 Corporate Park, Bangalore",
      website: "sarahwilson.com",
      linkedin: "linkedin.com/in/sarahwilson",
      dateOfBirth: "1988-09-12",
    },
    education: [
      {
        id: "edu1",
        institution: "University of Delhi",
        degree: "MBA",
        field: "Human Resources",
        startDate: "2010-07",
        endDate: "2012-06",
        grade: "A Grade",
        description: "Specialized in Talent Acquisition and Organizational Development",
      },
      {
        id: "edu2",
        institution: "St. Xavier's College",
        degree: "Bachelor of Arts",
        field: "Psychology",
        startDate: "2007-07",
        endDate: "2010-06",
        grade: "First Class",
        description: "Focus on Industrial Psychology",
      },
    ],
    skills: [
      { name: "Talent Acquisition", level: "Expert", years: 10 },
      { name: "Technical Recruiting", level: "Expert", years: 8 },
      { name: "Applicant Tracking Systems", level: "Advanced", years: 7 },
      { name: "LinkedIn Recruiting", level: "Advanced", years: 9 },
      { name: "Behavioral Interviewing", level: "Expert", years: 10 },
    ],
    resumes: [
      {
        id: "res1",
        name: "HR Professional Resume",
        template: "executive",
        createdAt: "2023-10-15",
        downloadUrl: "#",
      },
    ],
  },
}

// Resume templates
const resumeTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a sidebar for skills and contact info",
    thumbnail: "modern-template.jpg",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout with a focus on experience and achievements",
    thumbnail: "professional-template.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique design with color accents, perfect for design and creative roles",
    thumbnail: "creative-template.jpg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design with plenty of white space",
    thumbnail: "minimal-template.jpg",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions and leadership roles",
    thumbnail: "executive-template.jpg",
  },
]

const profileService = {
  getUserProfile: async (userId) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check if profile exists
    if (!mockProfiles[userId]) {
      // Return empty profile structure if not found
      return {
        data: {
          profile: {},
          education: [],
          skills: [],
          resumes: [],
        },
      }
    }

    return {
      data: mockProfiles[userId],
    }
  },

  updateUserProfile: async (userId, profileData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create profile if it doesn't exist
    if (!mockProfiles[userId]) {
      mockProfiles[userId] = {
        profile: {},
        education: [],
        skills: [],
        resumes: [],
      }
    }

    // Update profile data
    mockProfiles[userId].profile = {
      ...mockProfiles[userId].profile,
      ...profileData,
    }

    return {
      data: {
        profile: mockProfiles[userId].profile,
        message: "Profile updated successfully",
      },
    }
  },

  addEducation: async (userId, educationData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Create profile if it doesn't exist
    if (!mockProfiles[userId]) {
      mockProfiles[userId] = {
        profile: {},
        education: [],
        skills: [],
        resumes: [],
      }
    }

    // Create new education entry
    const newEducation = {
      id: `edu${Date.now()}`,
      ...educationData,
    }

    // Add to education array
    mockProfiles[userId].education.push(newEducation)

    return {
      data: {
        education: newEducation,
        message: "Education added successfully",
      },
    }
  },

  updateEducation: async (userId, educationId, educationData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check if profile exists
    if (!mockProfiles[userId]) {
      throw new Error("Profile not found")
    }

    // Find education entry
    const index = mockProfiles[userId].education.findIndex((edu) => edu.id === educationId)
    if (index === -1) {
      throw new Error("Education record not found")
    }

    // Update education entry
    mockProfiles[userId].education[index] = {
      ...mockProfiles[userId].education[index],
      ...educationData,
    }

    return {
      data: {
        education: mockProfiles[userId].education[index],
        message: "Education updated successfully",
      },
    }
  },

  deleteEducation: async (userId, educationId) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Check if profile exists
    if (!mockProfiles[userId]) {
      throw new Error("Profile not found")
    }

    // Filter out the education entry
    mockProfiles[userId].education = mockProfiles[userId].education.filter((edu) => edu.id !== educationId)

    return {
      data: {
        message: "Education deleted successfully",
      },
    }
  },

  updateSkills: async (userId, skills) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Create profile if it doesn't exist
    if (!mockProfiles[userId]) {
      mockProfiles[userId] = {
        profile: {},
        education: [],
        skills: [],
        resumes: [],
      }
    }

    // Update skills
    mockProfiles[userId].skills = skills

    return {
      data: {
        skills: mockProfiles[userId].skills,
        message: "Skills updated successfully",
      },
    }
  },

  uploadResume: async (userId, resumeFile) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Create profile if it doesn't exist
    if (!mockProfiles[userId]) {
      mockProfiles[userId] = {
        profile: {},
        education: [],
        skills: [],
        resumes: [],
      }
    }

    // Create new resume entry
    const newResume = {
      id: `res${Date.now()}`,
      name: resumeFile.name || `Resume ${mockProfiles[userId].resumes.length + 1}`,
      template: "uploaded",
      createdAt: new Date().toISOString().split("T")[0],
      downloadUrl: "#",
      fileType: resumeFile.type,
      fileSize: resumeFile.size,
    }

    // Add to resumes array
    mockProfiles[userId].resumes.push(newResume)

    return {
      data: {
        resume: newResume,
        message: "Resume uploaded successfully",
      },
    }
  },

  generateResume: async (userId, templateId, resumeData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create profile if it doesn't exist
    if (!mockProfiles[userId]) {
      mockProfiles[userId] = {
        profile: {},
        education: [],
        skills: [],
        resumes: [],
      }
    }

    // Create new resume entry
    const newResume = {
      id: `res${Date.now()}`,
      name: resumeData.name || `Resume ${mockProfiles[userId].resumes.length + 1}`,
      template: templateId,
      createdAt: new Date().toISOString().split("T")[0],
      downloadUrl: "#",
    }

    // Add to resumes array
    mockProfiles[userId].resumes.push(newResume)

    return {
      data: {
        resume: newResume,
        message: "Resume generated successfully",
      },
    }
  },

  getResumeTemplates: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      data: {
        templates: resumeTemplates,
      },
    }
  },
}

export default profileService
