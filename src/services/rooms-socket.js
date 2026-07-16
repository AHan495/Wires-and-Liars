import { io } from "socket.io-client";

const SOCKET_BASE_URL = "http://localhost:3000";

// singleton
let roomsSocket;

export function getRoomsSocket() {
  // create a single connection
  if (!roomsSocket) {
    roomsSocket = io(SOCKET_BASE_URL, {
      withCredentials: true,
      autoConnect: true,
    });
  }

  return roomsSocket;
}

export function subscribeToPublicRooms(onPublicRoomsUpdated) {
  const socket = getRoomsSocket();
  // run onPublicRoomsUpdated when receiving updatedPublicRoom
  socket.on("updatedPublicRoom", onPublicRoomsUpdated);

  // return unsubscribe cleanup function
  return () => {
    socket.off("updatedPublicRoom", onPublicRoomsUpdated);
  };
}

export function subscribeToRoom(roomCode, { onRoomUpdated, onRoomDeleted }) {
  const socket = getRoomsSocket();

  // notify server to join the specified room
  socket.emit("joinRoom", { roomCode });

  // register event listeners
  if (onRoomUpdated) {
    socket.on("updatedRoom", onRoomUpdated);
  }

  if (onRoomDeleted) {
    socket.on("deletedRoom", onRoomDeleted);
  }

  // return cleanup function to leave room
  return () => {
    socket.emit("leaveRoom", { roomCode });

    if (onRoomUpdated) {
      socket.off("updatedRoom", onRoomUpdated);
    }

    if (onRoomDeleted) {
      socket.off("deletedRoom", onRoomDeleted);
    }
  };
}
