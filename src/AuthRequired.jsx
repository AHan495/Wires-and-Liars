import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

function AuthRequired() {
  const { currentUser, isLoadingCurrentUser } = useAuth();

  if (isLoadingCurrentUser) {
    return null;
  }

  if (!currentUser?.userId) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthRequired;
