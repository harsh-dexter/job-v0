import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Box } from "@mui/material"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "./pages/auth/ResetPasswordPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/profile/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "./components/Toaster"

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/auth/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/auth/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={user ? <Navigate to="/dashboard" /> : <ResetPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Box>
  )
}

export default App
