import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import profileService from "../../services/profileService"

// Async thunks
export const fetchUserProfile = createAsyncThunk("profile/fetchUserProfile", async (userId, { rejectWithValue }) => {
  try {
    const response = await profileService.getUserProfile(userId)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch profile")
  }
})

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await profileService.updateUserProfile(userId, profileData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile")
    }
  },
)

export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async ({ userId, educationData }, { rejectWithValue }) => {
    try {
      const response = await profileService.addEducation(userId, educationData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add education")
    }
  },
)

export const updateEducation = createAsyncThunk(
  "profile/updateEducation",
  async ({ userId, educationId, educationData }, { rejectWithValue }) => {
    try {
      const response = await profileService.updateEducation(userId, educationId, educationData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update education")
    }
  },
)

export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation",
  async ({ userId, educationId }, { rejectWithValue }) => {
    try {
      const response = await profileService.deleteEducation(userId, educationId)
      return { educationId, ...response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete education")
    }
  },
)

export const updateSkills = createAsyncThunk(
  "profile/updateSkills",
  async ({ userId, skills }, { rejectWithValue }) => {
    try {
      const response = await profileService.updateSkills(userId, skills)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update skills")
    }
  },
)

export const uploadResume = createAsyncThunk(
  "profile/uploadResume",
  async ({ userId, resumeFile }, { rejectWithValue }) => {
    try {
      const response = await profileService.uploadResume(userId, resumeFile)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to upload resume")
    }
  },
)

export const generateResume = createAsyncThunk(
  "profile/generateResume",
  async ({ userId, templateId, resumeData }, { rejectWithValue }) => {
    try {
      const response = await profileService.generateResume(userId, templateId, resumeData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to generate resume")
    }
  },
)

const initialState = {
  profile: null,
  education: [],
  skills: [],
  resumes: [],
  isLoading: false,
  error: null,
  activeResumeTemplate: "modern",
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveResumeTemplate: (state, action) => {
      state.activeResumeTemplate = action.payload
    },
    clearProfileError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload.profile
        state.education = action.payload.education || []
        state.skills = action.payload.skills || []
        state.resumes = action.payload.resumes || []
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = { ...state.profile, ...action.payload.profile }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Add Education
      .addCase(addEducation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.isLoading = false
        state.education.push(action.payload.education)
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update Education
      .addCase(updateEducation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.education.findIndex((edu) => edu.id === action.payload.education.id)
        if (index !== -1) {
          state.education[index] = action.payload.education
        }
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Delete Education
      .addCase(deleteEducation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.isLoading = false
        state.education = state.education.filter((edu) => edu.id !== action.payload.educationId)
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update Skills
      .addCase(updateSkills.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skills = action.payload.skills
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Upload Resume
      .addCase(uploadResume.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false
        state.resumes.push(action.payload.resume)
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Generate Resume
      .addCase(generateResume.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(generateResume.fulfilled, (state, action) => {
        state.isLoading = false
        state.resumes.push(action.payload.resume)
      })
      .addCase(generateResume.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setActiveResumeTemplate, clearProfileError } = profileSlice.actions
export default profileSlice.reducer
