"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { Add, Edit, Delete, School } from "@mui/icons-material"
import { addEducation, updateEducation, deleteEducation } from "../../store/slices/profileSlice"
import { addToast } from "../../store/slices/uiSlice"

const EducationTab = ({ education = [], userId }) => {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentEducation, setCurrentEducation] = useState(null)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    grade: "",
    activities: "",
    description: "",
  })
  const dispatch = useDispatch()

  const handleOpen = (edu = null) => {
    if (edu) {
      setCurrentEducation(edu)
      setFormData({
        institution: edu.institution || "",
        degree: edu.degree || "",
        field: edu.field || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        grade: edu.grade || "",
        activities: edu.activities || "",
        description: edu.description || "",
      })
    } else {
      setCurrentEducation(null)
      setFormData({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        grade: "",
        activities: "",
        description: "",
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      if (currentEducation) {
        // Update existing education
        await dispatch(
          updateEducation({
            userId,
            educationId: currentEducation.id,
            educationData: formData,
          }),
        ).unwrap()
        dispatch(
          addToast({
            message: "Education updated successfully",
            severity: "success",
          }),
        )
      } else {
        // Add new education
        await dispatch(
          addEducation({
            userId,
            educationData: formData,
          }),
        ).unwrap()
        dispatch(
          addToast({
            message: "Education added successfully",
            severity: "success",
          }),
        )
      }
      handleClose()
    } catch (error) {
      dispatch(
        addToast({
          message: error || "Failed to save education",
          severity: "error",
        }),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (educationId) => {
    if (window.confirm("Are you sure you want to delete this education record?")) {
      try {
        await dispatch(
          deleteEducation({
            userId,
            educationId,
          }),
        ).unwrap()
        dispatch(
          addToast({
            message: "Education deleted successfully",
            severity: "success",
          }),
        )
      } catch (error) {
        dispatch(
          addToast({
            message: error || "Failed to delete education",
            severity: "error",
          }),
        )
      }
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">Education</Typography>
        <Button startIcon={<Add />} variant="contained" onClick={() => handleOpen()}>
          Add Education
        </Button>
      </Box>

      {education.length === 0 ? (
        <Card variant="outlined" sx={{ textAlign: "center", py: 4 }}>
          <School sx={{ fontSize: 60, color: "text.secondary", opacity: 0.3 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            No education records yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your educational background to enhance your profile
          </Typography>
          <Button variant="outlined" onClick={() => handleOpen()}>
            Add Education
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {education.map((edu) => (
            <Grid item xs={12} key={edu.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {edu.institution}
                  </Typography>
                  <Typography variant="subtitle1">
                    {edu.degree} in {edu.field}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {edu.startDate} - {edu.endDate || "Present"}
                  </Typography>
                  {edu.grade && (
                    <Typography variant="body2">
                      <strong>Grade:</strong> {edu.grade}
                    </Typography>
                  )}
                  {edu.activities && (
                    <Typography variant="body2">
                      <strong>Activities:</strong> {edu.activities}
                    </Typography>
                  )}
                  {edu.description && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {edu.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton size="small" onClick={() => handleOpen(edu)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(edu.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Education Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{currentEducation ? "Edit Education" : "Add Education"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institution"
                value={formData.institution}
                onChange={handleChange("institution")}
                placeholder="University or School Name"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Degree"
                value={formData.degree}
                onChange={handleChange("degree")}
                placeholder="e.g. Bachelor's, Master's, Ph.D."
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field of Study"
                value={formData.field}
                onChange={handleChange("field")}
                placeholder="e.g. Computer Science, Business"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="month"
                value={formData.startDate}
                onChange={handleChange("startDate")}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date (or Expected)"
                type="month"
                value={formData.endDate}
                onChange={handleChange("endDate")}
                InputLabelProps={{ shrink: true }}
                placeholder="Leave blank if current"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Grade"
                value={formData.grade}
                onChange={handleChange("grade")}
                placeholder="e.g. 3.8 GPA, First Class, 85%"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Activities and Societies"
                value={formData.activities}
                onChange={handleChange("activities")}
                placeholder="e.g. Student Council, Debate Club, Robotics Team"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange("description")}
                placeholder="Additional details about your education, achievements, projects, etc."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.institution || !formData.degree || !formData.startDate || isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EducationTab
