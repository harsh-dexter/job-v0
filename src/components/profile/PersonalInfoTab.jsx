"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, Grid, TextField, Button, Typography, CircularProgress, Divider, InputAdornment } from "@mui/material"
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
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Update your personal details and contact information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange("bio")}
            placeholder="Write a short bio about yourself"
            helperText="A brief description about yourself, your interests, and career goals"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="+91 9876543210"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange("dateOfBirth")}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={handleChange("address")}
            placeholder="Your current address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Online Presence
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Personal Website"
            value={formData.website}
            onChange={handleChange("website")}
            placeholder="yourwebsite.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Language color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="GitHub"
            value={formData.github}
            onChange={handleChange("github")}
            placeholder="github.com/username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GitHub color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="LinkedIn"
            value={formData.linkedin}
            onChange={handleChange("linkedin")}
            placeholder="linkedin.com/in/username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedIn color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PersonalInfoTab
