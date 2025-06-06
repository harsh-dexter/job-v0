"use client"

import { useSelector, useDispatch } from "react-redux"
import { Snackbar, Alert } from "@mui/material"
import { removeToast } from "../store/slices/uiSlice"

export const Toaster = () => {
  const { toasts } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  const handleClose = (toastId) => {
    dispatch(removeToast(toastId))
  }

  return (
    <>
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration || 6000}
          onClose={() => handleClose(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => handleClose(toast.id)}
            severity={toast.severity || "info"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}

export const useToast = () => {
  const dispatch = useDispatch()

  const toast = (message, severity = "info", duration = 6000) => {
    dispatch({
      type: "ui/addToast",
      payload: { message, severity, duration },
    })
  }

  return { toast }
}
