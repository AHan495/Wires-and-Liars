import { useLocation } from "react-router-dom";

// TODO: may want to weigh pros/cons of using React context instead of passing state via useNavigate
export function useRoomFromLocationState() {
  const location = useLocation();
  return location.state?.room;
}
