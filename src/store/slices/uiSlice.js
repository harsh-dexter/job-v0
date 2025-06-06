import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  toasts: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const toast = {
        id: Date.now(),
        ...action.payload,
      }
      state.toasts.push(toast)
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = uiSlice.actions
export default uiSlice.reducer
