"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Skeleton, Chip } from "@mui/material"
import profileService from "../../services/profileService"

const ResumeTemplateSelector = ({ onTemplateChange, activeTemplate }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await profileService.getResumeTemplates()
        setTemplates(response.data.templates)
      } catch (error) {
        console.error("Failed to fetch resume templates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resume Templates
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select a template for your resume. Your profile information will be used to generate the content.
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} md={6} lg={4} key={template.id}>
              <Card
                variant={activeTemplate === template.id ? "elevation" : "outlined"}
                sx={{
                  border: activeTemplate === template.id ? 2 : 1,
                  borderColor: activeTemplate === template.id ? "primary.main" : "divider",
                }}
              >
                <CardActionArea onClick={() => onTemplateChange(template.id)}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      {template.name} Template
                    </Typography>
                    {activeTemplate === template.id && (
                      <Chip
                        label="Selected"
                        color="primary"
                        size="small"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      />
                    )}
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ResumeTemplateSelector
