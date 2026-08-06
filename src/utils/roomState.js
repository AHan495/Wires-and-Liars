import { useLocation } from "react-router-dom";

export function useRoomFromLocationState() {
  const location = useLocation();
  return location.state?.room;
}
