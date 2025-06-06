"use client"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
} from "@mui/material"
import {
  LogoutOutlined,
  PersonOutlined,
  WorkOutlined,
  SchoolOutlined,
  EmailOutlined,
  BookmarkOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material"
import { logout } from "../store/slices/authSlice"

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)
  const { applications, savedJobs } = useSelector((state) => state.jobs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/auth/login")
  }

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    let completed = 0
    const total = 6

    if (user?.firstName && user?.lastName) completed++
    if (user?.email) completed++
    if (user?.college) completed++
    if (user?.graduationYear) completed++
    if (user?.skills?.length > 0) completed++
    if (user?.resume) completed++

    return Math.round((completed / total) * 100)
  }

  const profileCompletion = calculateProfileCompletion()

  // Recent applications
  const recentApplications = applications.slice(0, 3)

  // Recent saved jobs
  const recentSavedJobs = savedJobs.slice(0, 3)

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                CJ
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              CampusJobs
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Welcome back, {user?.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ready to explore new opportunities? Let's get started.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonOutlined sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="h6">Profile</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <EmailOutlined sx={{ mr: 1, color: "text.secondary", fontSize: 16 }} />
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={user?.userType === "student" ? <SchoolOutlined /> : <WorkOutlined />}
                    label={user?.userType === "student" ? "Student" : "Recruiter"}
                    color={user?.userType === "student" ? "primary" : "secondary"}
                    size="small"
                  />
                </Box>

                {user?.college && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {user.college}
                    {user.graduationYear && ` • Class of ${user.graduationYear}`}
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Profile Completion: {profileCompletion}%
                  </Typography>
                  <LinearProgress variant="determinate" value={profileCompletion} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Applications Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <WorkOutlined sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="h6">Applications</Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold">
                  {applications.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {applications.length === 0 ? "No applications yet" : "Total applications"}
                </Typography>

                {applications.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recent Status:
                    </Typography>
                    {recentApplications.map((app) => (
                      <Box key={app.id} sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="caption">{app.company}</Typography>
                        <Chip label={app.status} size="small" color={app.statusColor} />
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Saved Jobs Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <BookmarkOutlined sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="h6">Saved Jobs</Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold">
                  {savedJobs.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {savedJobs.length === 0 ? "No saved jobs yet" : "Jobs bookmarked"}
                </Typography>

                {savedJobs.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Recently Saved:
                    </Typography>
                    {recentSavedJobs.map((job) => (
                      <Typography key={job.id} variant="caption" display="block" sx={{ mt: 0.5 }}>
                        {job.title} at {job.company}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Getting Started Card */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Getting Started
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Complete these steps to make the most of CampusJobs
                </Typography>

                <List>
                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon>
                      <PersonOutlined color={profileCompletion >= 50 ? "success" : "action"} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Complete your profile"
                      secondary="Add your skills, experience, and preferences"
                    />
                    <Button
                      variant={profileCompletion >= 50 ? "outlined" : "contained"}
                      size="small"
                      onClick={() => navigate("/profile")}
                    >
                      {profileCompletion >= 50 ? "Update" : "Complete"}
                    </Button>
                  </ListItem>

                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon>
                      <TrendingUpOutlined color={user?.resume ? "success" : "action"} />
                    </ListItemIcon>
                    <ListItemText primary="Upload your resume" secondary="Make it easier for recruiters to find you" />
                    <Button variant="outlined" size="small">
                      Upload
                    </Button>
                  </ListItem>

                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon>
                      <WorkOutlined color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Browse opportunities"
                      secondary="Discover internships and jobs tailored for you"
                    />
                    <Button variant="outlined" size="small">
                      Browse
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Quick Stats
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Profile Views This Week
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {Math.floor(Math.random() * 50) + 10}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Job Matches
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {Math.floor(Math.random() * 20) + 5}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Response Rate
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {Math.floor(Math.random() * 30) + 60}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default DashboardPage
