import { useLocation } from "react-router-dom";
import { defaultRoom } from "../data/rooms";

// TODO: may want to weigh pros/cons of using React context instead of passing state via useNavigate
export function useRoomFromLocationState(fallbackRoom = defaultRoom) {
  const location = useLocation();
  return location.state?.room ?? fallbackRoom;
}
