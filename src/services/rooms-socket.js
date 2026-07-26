import { io } from "socket.io-client";

const SOCKET_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Singleton
let roomsSocket;

export function getRoomsSocket() {
  // Create a single connection
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
  // Run onPublicRoomsUpdated when receiving updatedPublicRoom
  socket.on("updatedPublicRoom", onPublicRoomsUpdated);

  // Return unsubscribe cleanup function
  return () => {
    socket.off("updatedPublicRoom", onPublicRoomsUpdated);
  };
}

export function subscribeToRoom(roomCode, { onRoomUpdated, onRoomDeleted }) {
  const socket = getRoomsSocket();

  // Notify server to join the specified room
  socket.emit("joinRoom", { roomCode });

  // Register event listeners
  if (onRoomUpdated) {
    socket.on("updatedRoom", onRoomUpdated);
  }

  if (onRoomDeleted) {
    socket.on("deletedRoom", onRoomDeleted);
  }

  // Return cleanup function to leave room
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

export function subscribeToMatchMessages(
  roomCode,
  { onMatchMessage, onRoomDeleted },
) {
  const socket = getRoomsSocket();

  socket.emit("joinRoom", { roomCode });

  // Run onMatchMessage (function to update messages) when receiving "matchMessage"
  if (onMatchMessage) {
    socket.on("matchMessage", onMatchMessage);
  }

  if (onRoomDeleted) {
    socket.on("deletedRoom", onRoomDeleted);
  }

  // Return cleanup function
  return () => {
    if (onMatchMessage) {
      socket.off("matchMessage", onMatchMessage);
    }

    if (onRoomDeleted) {
      socket.off("deletedRoom", onRoomDeleted);
    }

    socket.emit("leaveRoom", { roomCode });
  };
}

export function sendMatchMessage(roomCode, message) {
  // Send my message to the server
  getRoomsSocket().emit("sendMatchMessage", { roomCode, message });
}
