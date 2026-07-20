import { Navigate, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentTransitionPage from "./pages/PaymentPage/PaymentTransitionPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route
        path="/lobby"
        element={
          <ProtectedRoute>
            <LobbyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room"
        element={
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match"
        element={
          <ProtectedRoute>
            <MatchPage />
          </ProtectedRoute>
        }
      />
      <Route path="/payment/success" element={<PaymentTransitionPage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/match" element={<MatchPage />} />
    </Routes>
  );
}

export default App;
