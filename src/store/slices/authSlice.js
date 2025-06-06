import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../services/authService"

// Async thunks
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await authService.login(email, password)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed")
  }
})

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.loginWithGoogle()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Google login failed")
  }
})

export const resetPassword = createAsyncThunk("auth/resetPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await authService.resetPassword(email)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to send reset email")
  }
})

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await authService.updatePassword(token, password)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update password")
    }
  },
)

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      state.user = null
      state.token = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
