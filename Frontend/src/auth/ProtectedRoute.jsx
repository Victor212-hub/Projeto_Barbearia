import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ allowedRoles, redirectTo }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
