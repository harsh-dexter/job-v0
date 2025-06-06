import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#64748b",
      light: "#94a3b8",
      dark: "#475569",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
    },
    error: {
      main: "#ef4444",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.4px",
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.3px",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.2px",
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.1px",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.5,
    }
  },
  shape: {
    borderRadius: 12, // Increased border radius
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.07)", // Softer, more modern shadow
          transition: "box-shadow 0.3s ease-in-out",
        },
        elevation1: { // Example for default Paper elevation
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
        },
        elevation2: {
          boxShadow: "0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.03)",
        },
        // Add more elevation levels if needed
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
})

export default theme
