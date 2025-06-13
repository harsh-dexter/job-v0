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
  LinearProgress,
} from "@mui/material"
import {
  LogoutOutlined,
  PersonOutlined,
  WorkOutlined,
  SchoolOutlined,
  EmailOutlined,
  BookmarkOutlined,
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome back, {user?.firstName}!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Ready to explore new opportunities? Let's get started.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <PersonOutlined sx={{ mr: 1.5, fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Profile
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <EmailOutlined sx={{ mr: 1.5, fontSize: 20, opacity: 0.8 }} />
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {user?.email}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Chip
                    icon={user?.userType === "student" ? <SchoolOutlined /> : <WorkOutlined />}
                    label={user?.userType === "student" ? "Student" : "Recruiter"}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  />
                </Box>

                {user?.college && (
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                    {user.college}
                    {user.graduationYear && ` • Class of ${user.graduationYear}`}
                  </Typography>
                )}

                <Box>
                  <Typography variant="body2" gutterBottom sx={{ opacity: 0.9 }}>
                    Profile Completion: {profileCompletion}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={profileCompletion}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#fbbf24",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Applications Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  borderRadius: "0 0 0 80px",
                  opacity: 0.1,
                }}
              />
              <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <WorkOutlined sx={{ mr: 1.5, color: "#10b981", fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Applications
                  </Typography>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="#10b981" sx={{ mb: 1 }}>
                  {applications.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {applications.length === 0 ? "No applications yet" : "Total applications"}
                </Typography>

                {applications.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                      Recent Status:
                    </Typography>
                    {recentApplications.map((app) => (
                      <Box key={app.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {app.company}
                        </Typography>
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
            <Card sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  borderRadius: "0 0 0 80px",
                  opacity: 0.1,
                }}
              />
              <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <BookmarkOutlined sx={{ mr: 1.5, color: "#f59e0b", fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Saved Jobs
                  </Typography>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="#f59e0b" sx={{ mb: 1 }}>
                  {savedJobs.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {savedJobs.length === 0 ? "No saved jobs yet" : "Jobs bookmarked"}
                </Typography>

                {savedJobs.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                      Recently Saved:
                    </Typography>
                    {recentSavedJobs.map((job) => (
                      <Typography key={job.id} variant="body2" display="block" sx={{ mb: 1, fontWeight: 500 }}>
                        {job.title} at {job.company}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default DashboardPage
