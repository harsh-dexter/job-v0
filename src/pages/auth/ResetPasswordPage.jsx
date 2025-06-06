"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
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
  IconButton,
} from "@mui/material"
import { Lock, Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material"
import { updatePassword, clearError } from "../../store/slices/authSlice"
import { useToast } from "../../components/Toaster"

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isLoading, error } = useSelector((state) => state.auth)
  const { toast } = useToast()

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      toast("Invalid reset link", "error")
      navigate("/auth/forgot-password")
    }
  }, [searchParams, navigate, toast])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter and one number"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await dispatch(updatePassword({ token, password: formData.password })).unwrap()
      setIsSuccess(true)
      toast("Password updated!", "success")
    } catch (error) {
      toast(error || "Failed to update password", "error")
    }
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSuccess) {
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
              Password updated!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your password has been successfully updated. You can now sign in with your new password.
            </Typography>

            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Continue to login
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
            Set new password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Enter your new password below
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
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} /> : "Update password"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ResetPasswordPage
