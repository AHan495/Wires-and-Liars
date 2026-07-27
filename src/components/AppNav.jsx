import { Button } from "@mui/material";
import { LogOut, UserRound, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth-api";
import { useAuth } from "../auth/AuthContext";
import { AppNavActions, AppNavRoot, AppNavTitle } from "./AppNav.styles";

function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshCurrentUser } = useAuth();

  function isActive(path) {
    return location.pathname === path;
  }

  function handleLogout() {
    logout().finally(() => {
      refreshCurrentUser();
      navigate("/login", { replace: true });
    });
  }

  return (
    <AppNavRoot component="header">
      <AppNavTitle component="strong">Wires and Liars</AppNavTitle>

      <AppNavActions component="nav" aria-label="Primary navigation">
        <Button
          type="button"
          variant={isActive("/lobby") ? "contained" : "outlined"}
          startIcon={<UsersRound size={15} strokeWidth={2} />}
          onClick={() => navigate("/lobby")}
        >
          Lobby
        </Button>
        <Button
          type="button"
          variant={isActive("/profile") ? "contained" : "outlined"}
          startIcon={<UserRound size={15} strokeWidth={2} />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <Button
          type="button"
          variant="outlined"
          startIcon={<LogOut size={15} strokeWidth={2} />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </AppNavActions>
    </AppNavRoot>
  );
}

export default AppNav;
