"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, Grid, TextField, Button, Typography, CircularProgress, Divider, InputAdornment, Paper } from "@mui/material" // Added Paper
import { Phone, Home, Language, GitHub, LinkedIn, Cake } from "@mui/icons-material"
import { updateUserProfile } from "../../store/slices/profileSlice"
import { addToast } from "../../store/slices/uiSlice"

const PersonalInfoTab = ({ profile = {}, userId }) => {
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    website: profile?.website || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    dateOfBirth: profile?.dateOfBirth || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await dispatch(updateUserProfile({ userId, profileData: formData })).unwrap()
      dispatch(
        addToast({
          message: "Personal information updated successfully",
          severity: "success",
        }),
      )
    } catch (error) {
      dispatch(
        addToast({
          message: error || "Failed to update personal information",
          severity: "error",
        }),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}> {/* Added gap and flex properties */}
      {/* Removed old Typography headers */}

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}> {/* Section 1: Bio */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
          About Me
        </Typography>
        <TextField
          fullWidth
          variant="outlined" // Explicitly set variant
          label="Bio"
          multiline
          rows={4}
          value={formData.bio}
          onChange={handleChange("bio")}
          placeholder="Write a short bio about yourself"
          helperText="A brief description about yourself, your interests, and career goals"
        />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}> {/* Section 2: Contact & DOB */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Contact & Personal Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange("phone")}
              placeholder="+91 9876543210"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Cake color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              value={formData.address}
              onChange={handleChange("address")}
              placeholder="Your current address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}> {/* Section 3: Online Presence */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Online Presence
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Personal Website"
              value={formData.website}
              onChange={handleChange("website")}
              placeholder="yourwebsite.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="GitHub"
              value={formData.github}
              onChange={handleChange("github")}
              placeholder="github.com/username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHub color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange("linkedin")}
              placeholder="linkedin.com/in/username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedIn color="primary" /> {/* Changed color */}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}> {/* Keep button at the end, removed Grid item wrapper */}
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ px: 4, py: 1.5 }}> {/* Made button larger, consistent with previous intent */}
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
      </Box> {/* Corrected closing tag for the button's Box */}
      {/* Removed extraneous </Grid> tag that was here */}
    </Box>
  )
}

export default PersonalInfoTab
