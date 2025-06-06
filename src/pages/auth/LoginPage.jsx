"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock, Google } from "@mui/icons-material"
import { loginUser, loginWithGoogle, clearError } from "../../store/slices/authSlice"
import { useToast } from "../../components/Toaster"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await dispatch(loginUser(formData)).unwrap()
      toast("Welcome back!", "success")
      navigate("/dashboard")
    } catch (error) {
      toast(error || "Login failed", "error")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap()
      toast("Welcome!", "success")
      navigate("/dashboard")
    } catch (error) {
      toast(error || "Google login failed", "error")
    }
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
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
            Welcome back
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your CampusJobs account
          </Typography>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Continue with Google"}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
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

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Link to="/auth/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mb: 2 }}>
              {isLoading ? <CircularProgress size={20} /> : "Sign in"}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link to="/auth/register" style={{ textDecoration: "none" }}>
              <Typography component="span" color="primary" fontWeight="medium">
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
