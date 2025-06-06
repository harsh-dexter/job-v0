import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import jobReducer from "./slices/jobSlice"
import profileReducer from "./slices/profileSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    jobs: jobReducer,
    profile: profileReducer,
  },
})
