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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock, Person, School, Google } from "@mui/icons-material"
import { registerUser, loginWithGoogle, clearError } from "../../store/slices/authSlice"
import { useToast } from "../../components/Toaster"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    college: "",
    graduationYear: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  const { toast } = useToast()

  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

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

    if (formData.userType === "student") {
      if (!formData.college.trim()) {
        newErrors.college = "College name is required"
      }
      if (!formData.graduationYear) {
        newErrors.graduationYear = "Graduation year is required"
      }
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await dispatch(registerUser(formData)).unwrap()
      toast("Account created successfully!", "success")
      navigate("/dashboard")
    } catch (error) {
      toast(error || "Registration failed", "error")
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap()
      toast("Welcome to CampusJobs!", "success")
      navigate("/dashboard")
    } catch (error) {
      toast(error || "Google signup failed", "error")
    }
  }

  const handleChange = (field) => (e) => {
    const value = field === "agreeToTerms" ? e.target.checked : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
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
      <Card sx={{ width: "100%", maxWidth: 500 }}>
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
            Join CampusJobs
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Create your account and start your career journey
          </Typography>

          {/* Google Signup */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignup}
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

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

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
              sx={{ mt: 2 }}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>I am a</InputLabel>
              <Select value={formData.userType} onChange={handleChange("userType")} label="I am a">
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </Select>
            </FormControl>

            {formData.userType === "student" && (
              <>
                <TextField
                  fullWidth
                  label="College/University"
                  value={formData.college}
                  onChange={handleChange("college")}
                  error={!!errors.college}
                  helperText={errors.college}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 2 }}
                />

                <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.graduationYear}>
                  <InputLabel>Expected Graduation Year</InputLabel>
                  <Select
                    value={formData.graduationYear}
                    onChange={handleChange("graduationYear")}
                    label="Expected Graduation Year"
                  >
                    {graduationYears.map((year) => (
                      <MenuItem key={year} value={year.toString()}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.graduationYear && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {errors.graduationYear}
                    </Typography>
                  )}
                </FormControl>
              </>
            )}

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
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
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
              sx={{ mt: 2 }}
            />

            <FormControlLabel
              control={<Checkbox checked={formData.agreeToTerms} onChange={handleChange("agreeToTerms")} />}
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link to="/terms" style={{ color: "inherit" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" style={{ color: "inherit" }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
                {errors.agreeToTerms}
              </Typography>
            )}

            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
              {isLoading ? <CircularProgress size={20} /> : "Create account"}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Typography component="span" color="primary" fontWeight="medium">
                Sign in
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RegisterPage
