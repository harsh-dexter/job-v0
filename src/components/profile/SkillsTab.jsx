"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  Autocomplete,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Rating,
} from "@mui/material"
import { Add, Psychology } from "@mui/icons-material"
import { updateSkills } from "../../store/slices/profileSlice"
import { addToast } from "../../store/slices/uiSlice"
import { mockSkills } from "../../data/mockData"

const SkillsTab = ({ skills = [], userId }) => {
  const [userSkills, setUserSkills] = useState(skills)
  const [newSkill, setNewSkill] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState("Beginner")
  const [newSkillYears, setNewSkillYears] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skillSuggestions, setSkillSuggestions] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    // Filter out skills that are already added
    const existingSkillNames = userSkills.map((skill) => skill.name.toLowerCase())
    setSkillSuggestions(mockSkills.filter((skill) => !existingSkillNames.includes(skill.toLowerCase())))
  }, [userSkills])

  const handleAddSkill = () => {
    if (!newSkill) return

    const updatedSkills = [
      ...userSkills,
      {
        name: newSkill,
        level: newSkillLevel,
        years: newSkillYears,
      },
    ]

    setUserSkills(updatedSkills)
    setNewSkill("")
    setNewSkillLevel("Beginner")
    setNewSkillYears(1)
  }

  const handleRemoveSkill = (skillToRemove) => {
    setUserSkills(userSkills.filter((skill) => skill.name !== skillToRemove))
  }

  const handleSaveSkills = async () => {
    setIsSubmitting(true)

    try {
      await dispatch(
        updateSkills({
          userId,
          skills: userSkills,
        }),
      ).unwrap()
      dispatch(
        addToast({
          message: "Skills updated successfully",
          severity: "success",
        }),
      )
    } catch (error) {
      dispatch(
        addToast({
          message: error || "Failed to update skills",
          severity: "error",
        }),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "info"
      case "Intermediate":
        return "success"
      case "Advanced":
        return "warning"
      case "Expert":
        return "error"
      default:
        return "default"
    }
  }

  const getLevelRating = (level) => {
    switch (level) {
      case "Beginner":
        return 1
      case "Intermediate":
        return 2
      case "Advanced":
        return 3
      case "Expert":
        return 4
      default:
        return 1
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Add your technical and professional skills to showcase your expertise
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Add a New Skill
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <Autocomplete
                freeSolo
                options={skillSuggestions}
                inputValue={newSkill}
                onInputChange={(event, newValue) => {
                  setNewSkill(newValue)
                }}
                renderInput={(params) => <TextField {...params} label="Skill Name" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Proficiency Level</InputLabel>
                <Select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  label="Proficiency Level"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                type="number"
                label="Years"
                value={newSkillYears}
                onChange={(e) => setNewSkillYears(Number.parseInt(e.target.value) || 0)}
                InputProps={{ inputProps: { min: 0, max: 20 } }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="contained" startIcon={<Add />} onClick={handleAddSkill} disabled={!newSkill}>
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {userSkills.length === 0 ? (
        <Card variant="outlined" sx={{ textAlign: "center", py: 4 }}>
          <Psychology sx={{ fontSize: 60, color: "text.secondary", opacity: 0.3 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            No skills added yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your skills to showcase your expertise to potential employers
          </Typography>
        </Card>
      ) : (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Your Skills
          </Typography>

          <Grid container spacing={2}>
            {userSkills.map((skill, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{ mb: 1 }}>
                  <CardContent sx={{ py: 2 }}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1">{skill.name}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Chip
                          label={skill.level}
                          size="small"
                          color={getLevelColor(skill.level)}
                          sx={{ minWidth: 100 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating value={getLevelRating(skill.level)} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {skill.years} {skill.years === 1 ? "year" : "years"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2} sx={{ textAlign: "right" }}>
                        <Button size="small" color="error" onClick={() => handleRemoveSkill(skill.name)}>
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSaveSkills} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Save Skills"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SkillsTab
