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
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 5 }}> {/* Increased py */}
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}> {/* Increased p, mb and custom borderRadius */}
          <Grid container spacing={4} alignItems="center"> {/* Increased spacing */}
            <Grid item>
              <Avatar
                sx={{
                  width: 120, // Increased size
                  height: 120, // Increased size
                  bgcolor: "primary.light", // Lighter background for avatar
                  fontSize: "3rem", // Increased font size for initials
                  color: "primary.contrastText"
                }}
              >
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}> {/* Changed to h3, added component prop for semantics */}
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}> {/* Added mb */}
                {user.email}
              </Typography>
              {profile?.bio && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {profile.bio}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/dashboard")}> {/* Changed to outlined */}
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}> {/* Increased mb and custom borderRadius */}
            {error}
          </Alert>
        )}

        <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}> {/* Custom borderRadius and overflow hidden for cleaner tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="profile tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 1.5, // Adjust tab padding
                textTransform: 'capitalize', // Nicer capitalization
                fontSize: '1rem',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: 'primary.dark', // Darker color for selected tab
              },
            }}
          >
            <Tab icon={<PersonOutline sx={{ mb: 0.5 }} />} iconPosition="start" label="Personal Info" /> {/* Adjusted icon margin */}
            <Tab icon={<School sx={{ mb: 0.5 }} />} iconPosition="start" label="Education" />
            <Tab icon={<Psychology sx={{ mb: 0.5 }} />} iconPosition="start" label="Skills" />
            <Tab icon={<Description sx={{ mb: 0.5 }} />} iconPosition="start" label="Resume" />
          </Tabs>
          {/* Divider is removed as borderBottom on Tabs serves a similar purpose */}

          <Box sx={{ p: 4 }}> {/* Increased padding for tab content */}
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
