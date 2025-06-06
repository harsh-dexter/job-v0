// Mock user database
const mockUsers = [
  {
    id: "1",
    email: "john.doe@iitdelhi.ac.in",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    userType: "student",
    college: "IIT Delhi",
    graduationYear: "2025",
    createdAt: "2024-01-15",
    isVerified: true,
  },
  {
    id: "2",
    email: "priya.sharma@nitk.edu.in",
    password: "mypassword",
    firstName: "Priya",
    lastName: "Sharma",
    userType: "student",
    college: "NIT Karnataka",
    graduationYear: "2024",
    createdAt: "2024-02-10",
    isVerified: true,
  },
  {
    id: "3",
    email: "recruiter@techcorp.com",
    password: "recruiter123",
    firstName: "Sarah",
    lastName: "Wilson",
    userType: "recruiter",
    company: "TechCorp Solutions",
    createdAt: "2024-01-20",
    isVerified: true,
  },
]

// Mock password reset tokens
const passwordResetTokens = {}

const authService = {
  login: async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Find user by email
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error("User not found")
    }

    if (user.password !== password) {
      throw new Error("Invalid password")
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email before logging in")
    }

    // Generate mock JWT token
    const token = `mock_jwt_${user.id}_${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return {
      data: {
        user: userWithoutPassword,
        token,
        message: "Login successful",
      },
    }
  },

  register: async (userData) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())

    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userType: userData.userType,
      college: userData.college,
      graduationYear: userData.graduationYear,
      company: userData.company,
      createdAt: new Date().toISOString().split("T")[0],
      isVerified: true, // Auto-verify for demo purposes
    }

    // Add to mock database
    mockUsers.push(newUser)

    // Generate mock JWT token
    const token = `mock_jwt_${newUser.id}_${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser

    return {
      data: {
        user: userWithoutPassword,
        token,
        message: "Registration successful",
      },
    }
  },

  loginWithGoogle: async () => {
    // Simulate Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700))

    // Simulate random Google user data
    const googleUsers = [
      {
        email: "student@gmail.com",
        firstName: "Alex",
        lastName: "Kumar",
        userType: "student",
        college: "Delhi University",
        graduationYear: "2025",
      },
      {
        email: "priya.google@gmail.com",
        firstName: "Priya",
        lastName: "Patel",
        userType: "student",
        college: "Mumbai University",
        graduationYear: "2024",
      },
    ]

    const randomUser = googleUsers[Math.floor(Math.random() * googleUsers.length)]

    // Check if Google user already exists
    let existingUser = mockUsers.find((u) => u.email === randomUser.email)

    if (!existingUser) {
      // Create new Google user
      existingUser = {
        id: `google_${Date.now()}`,
        ...randomUser,
        createdAt: new Date().toISOString().split("T")[0],
        isVerified: true,
        loginMethod: "google",
      }
      mockUsers.push(existingUser)
    }

    const token = `mock_google_token_${existingUser.id}_${Date.now()}`

    return {
      data: {
        user: existingUser,
        token,
        message: "Google login successful",
      },
    }
  },

  resetPassword: async (email) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500))

    // Check if user exists
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error("No account found with this email address")
    }

    // Generate mock reset token
    const resetToken = `reset_${user.id}_${Date.now()}`
    passwordResetTokens[resetToken] = {
      userId: user.id,
      email: user.email,
      expiresAt: Date.now() + 3600000, // 1 hour
    }

    console.log(`Mock reset link: /auth/reset-password?token=${resetToken}`)

    return {
      data: {
        message: "Password reset email sent successfully",
        resetToken, // In real app, this would be sent via email
      },
    }
  },

  updatePassword: async (token, newPassword) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500))

    // Validate reset token
    const tokenData = passwordResetTokens[token]

    if (!tokenData) {
      throw new Error("Invalid or expired reset token")
    }

    if (Date.now() > tokenData.expiresAt) {
      delete passwordResetTokens[token]
      throw new Error("Reset token has expired")
    }

    // Find user and update password
    const userIndex = mockUsers.findIndex((u) => u.id === tokenData.userId)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update password
    mockUsers[userIndex].password = newPassword

    // Remove used token
    delete passwordResetTokens[token]

    return {
      data: {
        message: "Password updated successfully",
      },
    }
  },

  // Additional mock methods for enhanced functionality
  getCurrentUser: async (token) => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Extract user ID from token (mock implementation)
    const tokenParts = token.split("_")
    const userId = tokenParts[2] || tokenParts[1]

    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      throw new Error("Invalid token")
    }

    const { password: _, ...userWithoutPassword } = user

    return {
      data: {
        user: userWithoutPassword,
      },
    }
  },

  updateProfile: async (userId, profileData) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const userIndex = mockUsers.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...profileData,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    const { password: _, ...userWithoutPassword } = mockUsers[userIndex]

    return {
      data: {
        user: userWithoutPassword,
        message: "Profile updated successfully",
      },
    }
  },
}

export default authService
