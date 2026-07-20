import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

function SubscriptionRequired() {
  const { currentUser, isLoadingCurrentUser } = useAuth();

  if (isLoadingCurrentUser) {
    return null;
  }

  if (!currentUser?.hasSubscriptionAccess) {
    return <Navigate to="/payment" replace />;
  }

  return <Outlet />;
}

export default SubscriptionRequired;
