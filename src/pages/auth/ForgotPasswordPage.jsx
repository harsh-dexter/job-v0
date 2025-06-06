"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material"
import { Email, ArrowBack, CheckCircle } from "@mui/icons-material"
import { resetPassword, clearError } from "../../store/slices/authSlice"
import { useToast } from "../../components/Toaster"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")

  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const { toast } = useToast()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError("")

    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    try {
      await dispatch(resetPassword(email)).unwrap()
      setIsSubmitted(true)
      toast("Reset link sent!", "success")
    } catch (error) {
      toast(error || "Failed to send reset email", "error")
    }
  }

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
          p: 2,
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 400 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "success.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CheckCircle sx={{ fontSize: 32, color: "success.main" }} />
            </Box>

            <Typography variant="h5" gutterBottom fontWeight="bold">
              Check your email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We've sent a password reset link to <strong>{email}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Didn't receive the email? Check your spam folder or
            </Typography>
            <Button variant="text" onClick={() => setIsSubmitted(false)} sx={{ mb: 3 }}>
              try again with a different email
            </Button>

            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth startIcon={<ArrowBack />}>
                Back to login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.main",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                CJ
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Forgot password?
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            No worries, we'll send you reset instructions
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mb: 2 }}>
              {isLoading ? <CircularProgress size={20} /> : "Send reset link"}
            </Button>
          </Box>

          <Link to="/auth/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" fullWidth startIcon={<ArrowBack />}>
              Back to login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ForgotPasswordPage
