"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material"
import { PersonOutline, School, Psychology, Description } from "@mui/icons-material"
import { fetchUserProfile } from "../../store/slices/profileSlice"
import { addToast } from "../../store/slices/uiSlice"
import PersonalInfoTab from "../../components/profile/PersonalInfoTab"
import EducationTab from "../../components/profile/EducationTab"
import SkillsTab from "../../components/profile/SkillsTab"
import ResumeTab from "../../components/profile/ResumeTab"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { profile, education, skills, resumes, isLoading, error } = useSelector((state) => state.profile)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile(user.id))
        .unwrap()
        .catch((error) => {
          dispatch(
            addToast({
              message: error || "Failed to load profile data",
              severity: "error",
            }),
          )
        })
    }
  }, [dispatch, user])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (!user) {
    navigate("/auth/login")
    return null
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                }}
              >
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
              {profile?.bio && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {profile.bio}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="profile tabs"
          >
            <Tab icon={<PersonOutline />} label="Personal Info" />
            <Tab icon={<School />} label="Education" />
            <Tab icon={<Psychology />} label="Skills" />
            <Tab icon={<Description />} label="Resume" />
          </Tabs>
          <Divider />

          <Box sx={{ p: 3 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {activeTab === 0 && <PersonalInfoTab profile={profile} userId={user.id} />}
                {activeTab === 1 && <EducationTab education={education} userId={user.id} />}
                {activeTab === 2 && <SkillsTab skills={skills} userId={user.id} />}
                {activeTab === 3 && <ResumeTab resumes={resumes} userId={user.id} />}
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default ProfilePage
