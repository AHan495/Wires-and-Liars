import { Navigate, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import LoginPage from "./pages/LoginPage";
import MatchPage from "./pages/MatchPage";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lobby" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/match" element={<MatchPage />} />
    </Routes>
  );
}

export default App;
