import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default ProtectedRoute
