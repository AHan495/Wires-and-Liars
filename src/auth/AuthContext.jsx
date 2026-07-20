import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/auth-api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingCurrentUser, setIsLoadingCurrentUser] = useState(true);

  // useCallback gives us a memoized version of the callback that only changes if any of its dependencies changes
  // There are no dependencies, so this function will not change
  const refreshCurrentUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch {
      setCurrentUser(null);
      return null;
    }
  }, []);

  // Since refreshCurrentUser does not change, this effect will only run once on initial render
  useEffect(() => {
    refreshCurrentUser().finally(() => {
      setIsLoadingCurrentUser(false);
    });
  }, [refreshCurrentUser]);
  // Reason for adding dependency to effect: if refreshCurrentUser was modified so that it had some dependencies (e.g.,
  // some new parameters) that could cause it to change, this effect would need to run again upon refreshCurrentUser's
  // change

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoadingCurrentUser, refreshCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return auth;
}
