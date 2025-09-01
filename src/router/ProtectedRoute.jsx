import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem("role") // 'individual' | 'agency'

  if (!userRole) {
    return <Navigate to="/" replace /> // not logged in
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />// unauthorized
  }

  return children
}

export default ProtectedRoute;
