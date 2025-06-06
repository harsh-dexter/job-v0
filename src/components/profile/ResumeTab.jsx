"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
} from "@mui/material"
import { Description, Upload, Add, Download, Visibility } from "@mui/icons-material"
import { uploadResume, generateResume, setActiveResumeTemplate } from "../../store/slices/profileSlice"
import { addToast } from "../../store/slices/uiSlice"
import ResumePreview from "./ResumePreview"
import ResumeTemplateSelector from "./ResumeTemplateSelector"

const ResumeTab = ({ resumes = [], userId }) => {
  const [tabValue, setTabValue] = useState(0)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedResume, setSelectedResume] = useState(null)
  const [resumeName, setResumeName] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const { activeResumeTemplate } = useSelector((state) => state.profile)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true)
  }

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false)
    setResumeName("")
    setResumeFile(null)
  }

  const handleGenerateDialogOpen = () => {
    setGenerateDialogOpen(true)
  }

  const handleGenerateDialogClose = () => {
    setGenerateDialogOpen(false)
    setResumeName("")
  }

  const handlePreviewDialogOpen = (resume) => {
    setSelectedResume(resume)
    setPreviewDialogOpen(true)
  }

  const handlePreviewDialogClose = () => {
    setPreviewDialogOpen(false)
    setSelectedResume(null)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setResumeFile(file)
      if (!resumeName) {
        setResumeName(file.name.replace(/\.[^/.]+$/, ""))
      }
    }
  }

  const handleUploadResume = async () => {
    if (!resumeFile) return

    setIsSubmitting(true)

    try {
      await dispatch(
        uploadResume({
          userId,
          resumeFile: {
            name: resumeName || resumeFile.name,
            type: resumeFile.type,
            size: resumeFile.size,
          },
        }),
      ).unwrap()
      dispatch(
        addToast({
          message: "Resume uploaded successfully",
          severity: "success",
        }),
      )
      handleUploadDialogClose()
    } catch (error) {
      dispatch(
        addToast({
          message: error || "Failed to upload resume",
          severity: "error",
        }),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateResume = async () => {
    if (!resumeName) return

    setIsSubmitting(true)

    try {
      await dispatch(
        generateResume({
          userId,
          templateId: activeResumeTemplate,
          resumeData: {
            name: resumeName,
          },
        }),
      ).unwrap()
      dispatch(
        addToast({
          message: "Resume generated successfully",
          severity: "success",
        }),
      )
      handleGenerateDialogClose()
    } catch (error) {
      dispatch(
        addToast({
          message: error || "Failed to generate resume",
          severity: "error",
        }),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTemplateChange = (templateId) => {
    dispatch(setActiveResumeTemplate(templateId))
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">Resume Management</Typography>
        <Box>
          <Button variant="outlined" startIcon={<Upload />} onClick={handleUploadDialogOpen} sx={{ mr: 2 }}>
            Upload Resume
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleGenerateDialogOpen}>
            Create Resume
          </Button>
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="My Resumes" />
        <Tab label="Resume Builder" />
      </Tabs>

      {tabValue === 0 && (
        <>
          {resumes.length === 0 ? (
            <Card variant="outlined" sx={{ textAlign: "center", py: 4 }}>
              <Description sx={{ fontSize: 60, color: "text.secondary", opacity: 0.3 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                No resumes yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload an existing resume or create a new one using our templates
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button variant="outlined" startIcon={<Upload />} onClick={handleUploadDialogOpen}>
                  Upload Resume
                </Button>
                <Button variant="contained" startIcon={<Add />} onClick={handleGenerateDialogOpen}>
                  Create Resume
                </Button>
              </Box>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {resumes.map((resume) => (
                <Grid item xs={12} md={6} key={resume.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {resume.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Template: {resume.template === "uploaded" ? "Uploaded File" : resume.template}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Created: {resume.createdAt}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button size="small" startIcon={<Visibility />} onClick={() => handlePreviewDialogOpen(resume)}>
                        Preview
                      </Button>
                      <Button size="small" startIcon={<Download />} href={resume.downloadUrl}>
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {tabValue === 1 && (
        <ResumeTemplateSelector onTemplateChange={handleTemplateChange} activeTemplate={activeResumeTemplate} />
      )}

      {/* Upload Resume Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleUploadDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Resume</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Resume Name"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <input
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              id="resume-file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="resume-file-upload">
              <Button variant="outlined" component="span" fullWidth>
                Select File
              </Button>
            </label>

            {resumeFile && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Selected file: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>Cancel</Button>
          <Button onClick={handleUploadResume} variant="contained" disabled={!resumeFile || isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Generate Resume Dialog */}
      <Dialog open={generateDialogOpen} onClose={handleGenerateDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Resume</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Resume Name"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="e.g. Software Developer Resume"
            />

            <Typography variant="subtitle1" gutterBottom>
              Selected Template: {activeResumeTemplate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              You can change the template in the Resume Builder tab
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Your resume will be generated using your profile information, education history, and skills.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGenerateDialogClose}>Cancel</Button>
          <Button onClick={handleGenerateResume} variant="contained" disabled={!resumeName || isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Generate Resume"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Resume Preview Dialog */}
      <Dialog open={previewDialogOpen} onClose={handlePreviewDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent>{selectedResume && <ResumePreview resume={selectedResume} />}</DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewDialogClose}>Close</Button>
          <Button variant="contained" startIcon={<Download />} href={selectedResume?.downloadUrl}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ResumeTab
