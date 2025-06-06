"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Chip, Fab } from "@mui/material"
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
          background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
          py: 10,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Chip label="🚀 Now Live for Indian Universities" sx={{ mb: 3, bgcolor: "background.paper" }} />

            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 3,
              }}
            >
              Your Gateway to
              <Box component="span" sx={{ color: "primary.main" }}>
                {" "}
                Career Success
              </Box>
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
              CampusJobs is the specialized platform designed exclusively for undergraduate students in India. Discover
              internships, part-time jobs, and entry-level positions that fit your academic schedule.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" endIcon={<ArrowForward />} sx={{ minWidth: 200 }}>
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/auth/login" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large" sx={{ minWidth: 200 }}>
                  I'm a Recruiter
                </Button>
              </Link>
            </Box>

            {/* Demo Notice */}
            <Box sx={{ mt: 4, p: 2, bgcolor: "warning.light", borderRadius: 1, maxWidth: 600, mx: "auto" }}>
              <Typography variant="body2" color="warning.dark">
                🎯 <strong>Demo Mode:</strong> This is a fully functional demo with mock data. Click the data icon
                (bottom right) to view sample users and jobs!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Why Choose CampusJobs?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Built specifically for the unique needs of undergraduate students
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card sx={{ height: "100%", p: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: `${feature.color}20`,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
