import { createSlice } from "@reduxjs/toolkit"
import { mockJobs, mockApplications, mockSavedJobs } from "../../data/mockData"

const initialState = {
  jobs: mockJobs,
  applications: mockApplications,
  savedJobs: mockSavedJobs,
  isLoading: false,
  error: null,
  filters: {
    location: "",
    type: "",
    skills: [],
    company: "",
  },
}

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload
    },
    addApplication: (state, action) => {
      const newApplication = {
        id: Date.now().toString(),
        ...action.payload,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        statusColor: "info",
      }
      state.applications.push(newApplication)
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status, statusColor } = action.payload
      const application = state.applications.find((app) => app.id === applicationId)
      if (application) {
        application.status = status
        application.statusColor = statusColor
      }
    },
    addSavedJob: (state, action) => {
      const job = state.jobs.find((job) => job.id === action.payload.jobId)
      if (job && !state.savedJobs.find((saved) => saved.id === job.id)) {
        state.savedJobs.push({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          savedDate: new Date().toISOString().split("T")[0],
        })
      }
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter((job) => job.id !== action.payload.jobId)
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        location: "",
        type: "",
        skills: [],
        company: "",
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setJobs,
  addApplication,
  updateApplicationStatus,
  addSavedJob,
  removeSavedJob,
  setFilters,
  clearFilters,
  setLoading,
  setError,
} = jobSlice.actions

export default jobSlice.reducer
