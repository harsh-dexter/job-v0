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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        p: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx=".5" cy=".5" r=".5"><stop offset="0%" stopColor="%23ffffff" stopOpacity=".05"/><stop offset="100%" stopColor="%23ffffff" stopOpacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/></svg>\') no-repeat center center',
          backgroundSize: "cover",
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 440,
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
              }}
            >
              <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
                CJ
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1,
            }}
          >
            Welcome back
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
            Sign in to your CampusJobs account
          </Typography>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{
              mb: 3,
              py: 1.5,
              borderColor: "#e5e7eb",
              color: "#374151",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#d1d5db",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Continue with Google"}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, fontWeight: 500 }}>
              Or continue with email
            </Typography>
          </Divider>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                "& .MuiAlert-message": { fontWeight: 500 },
              }}
              onClose={() => dispatch(clearError())}
            >
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
              sx={{ mb: 3 }}
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

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Link to="/auth/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ fontWeight: 500 }}>
            Don't have an account?{" "}
            <Link to="/auth/register" style={{ textDecoration: "none" }}>
              <Typography component="span" color="primary" fontWeight="bold">
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
