import { Box, Typography, Paper, Divider } from "@mui/material"
import { useSelector } from "react-redux"

const ResumePreview = ({ resume }) => {
  const { user } = useSelector((state) => state.auth)
  const { profile, education, skills } = useSelector((state) => state.profile)

  const renderModernTemplate = () => (
    <Paper sx={{ p: 4, minHeight: 600 }}>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            {user?.userType === "student" ? "Student" : "Professional"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email} | {profile?.phone}
          </Typography>
          {profile?.address && (
            <Typography variant="body2" color="text.secondary">
              {profile.address}
            </Typography>
          )}
        </Box>
      </Box>

      {profile?.bio && (
        <>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" paragraph>
            {profile.bio}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {education.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          {education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.institution}
              </Typography>
              <Typography variant="body2">
                {edu.degree} in {edu.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.startDate} - {edu.endDate || "Present"}
              </Typography>
              {edu.grade && <Typography variant="body2">Grade: {edu.grade}</Typography>}
              {edu.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {edu.description}
                </Typography>
              )}
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {skills.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  bgcolor: "grey.100",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {skill.name} ({skill.level})
              </Typography>
            ))}
          </Box>
        </>
      )}
    </Paper>
  )

  const renderProfessionalTemplate = () => (
    <Paper sx={{ p: 4, minHeight: 600 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {user?.userType === "student" ? "Student" : "Professional"}
        </Typography>
        <Typography variant="body2">
          {user?.email} | {profile?.phone} | {profile?.address}
        </Typography>
      </Box>

      {profile?.bio && (
        <>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
            PROFESSIONAL SUMMARY
          </Typography>
          <Typography variant="body2" paragraph>
            {profile.bio}
          </Typography>
        </>
      )}

      {education.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mt: 3 }}>
            EDUCATION
          </Typography>
          {education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree} in {edu.field}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.startDate} - {edu.endDate || "Present"}
                </Typography>
              </Box>
              <Typography variant="body2">{edu.institution}</Typography>
              {edu.grade && <Typography variant="body2">Grade: {edu.grade}</Typography>}
            </Box>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mt: 3 }}>
            SKILLS
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Typography key={index} variant="body2" sx={{ mr: 2, mb: 1 }}>
                • {skill.name} ({skill.level})
              </Typography>
            ))}
          </Box>
        </>
      )}
    </Paper>
  )

  const renderTemplate = () => {
    switch (resume?.template) {
      case "professional":
        return renderProfessionalTemplate()
      case "modern":
      default:
        return renderModernTemplate()
    }
  }

  return <Box sx={{ maxHeight: 600, overflow: "auto" }}>{renderTemplate()}</Box>
}

export default ResumePreview
