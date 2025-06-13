"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Fab } from "@mui/material"
import { ArrowForward, People, Work, School, TrackChanges, Security, FlashOn, DataObject } from "@mui/icons-material"
import MockDataDisplay from "../components/MockDataDisplay"

const HomePage = () => {
  const [showMockData, setShowMockData] = useState(false)

  const features = [
    {
      icon: <School sx={{ fontSize: 24 }} />,
      title: "Student-Focused",
      description: "Opportunities tailored for undergraduate students with flexible schedules",
      color: "#2563eb",
    },
    {
      icon: <TrackChanges sx={{ fontSize: 24 }} />,
      title: "Smart Matching",
      description: "AI-powered job recommendations based on your skills, interests, and availability",
      color: "#10b981",
    },
    {
      icon: <FlashOn sx={{ fontSize: 24 }} />,
      title: "Quick Applications",
      description: "Streamlined application process designed for busy student schedules",
      color: "#8b5cf6",
    },
    {
      icon: <Work sx={{ fontSize: 24 }} />,
      title: "Diverse Opportunities",
      description: "From internships to part-time jobs and entry-level positions",
      color: "#f59e0b",
    },
    {
      icon: <Security sx={{ fontSize: 24 }} />,
      title: "Verified Companies",
      description: "All employers are verified to ensure legitimate opportunities",
      color: "#ef4444",
    },
    {
      icon: <People sx={{ fontSize: 24 }} />,
      title: "Community Support",
      description: "Connect with peers and get career guidance from experienced professionals",
      color: "#6366f1",
    },
  ]

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Mock Data FAB */}
      <Fab
        color="secondary"
        aria-label="view mock data"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
        onClick={() => setShowMockData(true)}
      >
        <DataObject />
      </Fab>

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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Sign In</Button>
            </Link>
            <Link to="/auth/register" style={{ textDecoration: "none" }}>
              <Button variant="contained">Get Started</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          py: { xs: 8, md: 12 },
          px: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx=".5" cy=".5" r=".5"><stop offset="0%" stopColor="%23ffffff" stopOpacity=".1"/><stop offset="100%" stopColor="%23ffffff" stopOpacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>\') no-repeat center center',
            backgroundSize: "cover",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 50,
                px: 3,
                py: 1,
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#10b981",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                🚀 Now Live for Indian Universities
              </Typography>
            </Box>

            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                color: "white",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Your Gateway to
              <Box
                component="span"
                sx={{
                  display: "block",
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Career Success
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 6,
                maxWidth: 700,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              CampusJobs is the specialized platform designed exclusively for undergraduate students in India. Discover
              internships, part-time jobs, and entry-level positions that fit your academic schedule.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", mb: 6 }}>
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    minWidth: 220,
                    py: 2,
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    color: "#1f2937",
                    fontWeight: 700,
                    "&:hover": {
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)",
                    },
                  }}
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/auth/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    minWidth: 220,
                    py: 2,
                    fontSize: "1.1rem",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  I'm a Recruiter
                </Button>
              </Link>
            </Box>

            {/* Demo Notice */}
            <Box
              sx={{
                maxWidth: 600,
                mx: "auto",
                p: 3,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>
                🎯 <strong>Demo Mode:</strong> This is a fully functional demo with mock data. Click the data icon
                (bottom right) to view sample users and jobs!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800,
              mb: 2,
            }}
          >
            Why Choose CampusJobs?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Built specifically for the unique needs of undergraduate students
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "primary.main", py: 8, px: 2 }}>
        <Container maxWidth="md">
          <Card sx={{ bgcolor: "primary.main", color: "white", boxShadow: "none" }}>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Ready to Launch Your Career?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of students who have found their dream opportunities through CampusJobs
              </Typography>
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": { bgcolor: "grey.100" },
                    minWidth: 250,
                  }}
                >
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
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

            <Box sx={{ display: "flex", gap: 3 }}>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary" sx={{ "&:hover": { color: "text.primary" } }}>
                  About
                </Typography>
              </Link>
              <Link to="/privacy" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary" sx={{ "&:hover": { color: "text.primary" } }}>
                  Privacy
                </Typography>
              </Link>
              <Link to="/terms" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary" sx={{ "&:hover": { color: "text.primary" } }}>
                  Terms
                </Typography>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="text.secondary" sx={{ "&:hover": { color: "text.primary" } }}>
                  Contact
                </Typography>
              </Link>
            </Box>
          </Box>

          <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 CampusJobs. All rights reserved. Empowering students across India.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mock Data Display Dialog */}
      <MockDataDisplay open={showMockData} onClose={() => setShowMockData(false)} />
    </Box>
  )
}

export default HomePage
