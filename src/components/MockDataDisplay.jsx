"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material"
import { useSelector } from "react-redux"

const MockDataDisplay = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0)
  const { user } = useSelector((state) => state.auth)
  const { applications, savedJobs, jobs } = useSelector((state) => state.jobs)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ p: 2 }}>{children}</Box>}</div>
  )

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Mock Data Overview</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="User Data" />
          <Tab label="Applications" />
          <Tab label="Saved Jobs" />
          <Tab label="Available Jobs" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Current User
          </Typography>
          <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>Name:</strong> {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body2">
              <strong>Type:</strong> {user?.userType}
            </Typography>
            {user?.college && (
              <Typography variant="body2">
                <strong>College:</strong> {user.college}
              </Typography>
            )}
            {user?.graduationYear && (
              <Typography variant="body2">
                <strong>Graduation:</strong> {user.graduationYear}
              </Typography>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Applications ({applications.length})
          </Typography>
          {applications.length === 0 ? (
            <Typography color="text.secondary">No applications yet</Typography>
          ) : (
            <List>
              {applications.map((app) => (
                <ListItem key={app.id} divider>
                  <ListItemText primary={app.jobTitle} secondary={`${app.company} • Applied: ${app.appliedDate}`} />
                  <Chip label={app.status} color={app.statusColor} size="small" />
                </ListItem>
              ))}
            </List>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Saved Jobs ({savedJobs.length})
          </Typography>
          {savedJobs.length === 0 ? (
            <Typography color="text.secondary">No saved jobs yet</Typography>
          ) : (
            <List>
              {savedJobs.map((job) => (
                <ListItem key={job.id} divider>
                  <ListItemText
                    primary={job.title}
                    secondary={`${job.company} • ${job.location} • Saved: ${job.savedDate}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Available Jobs ({jobs.length})
          </Typography>
          <List>
            {jobs.slice(0, 5).map((job) => (
              <ListItem key={job.id} divider>
                <ListItemText
                  primary={job.title}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        {job.company} • {job.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.type} • {job.stipend || job.salary}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {job.skills.slice(0, 3).map((skill) => (
                          <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MockDataDisplay
