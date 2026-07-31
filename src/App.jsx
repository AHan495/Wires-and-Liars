import { Navigate, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentTransitionPage from "./pages/PaymentPage/PaymentTransitionPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RoomPage from "./pages/RoomPage/RoomPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import AuthRequired from "./AuthRequired";
import SubscriptionRequired from "./SubscriptionRequired";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthRequired />}>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentTransitionPage />} />
        <Route element={<SubscriptionRequired />}>
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/match" element={<MatchPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
