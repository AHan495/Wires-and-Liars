import { Navigate, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage/LobbyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import RoomPage from "./pages/RoomPage/RoomPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/match" element={<MatchPage />} />
    </Routes>
  );
}

export default App;
