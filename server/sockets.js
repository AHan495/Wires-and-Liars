import * as Sentry from "@sentry/node";
import { getPublicRooms, getRoom } from "./stores/room_store.js";
import { handleMatchMessage } from "./routers/game_router.js";
import { getErrorAttributes } from "./utils/logger.js";

export async function broadcastRoomState(io, room) {
  io.to(`${room.id}`).emit("updatedRoom", room);
  io.emit("updatedPublicRoom", { publicRooms: await getPublicRooms() });
}

export async function broadcastRoomDeleted(io, roomCode) {
  io.to(`${roomCode}`).emit("deletedRoom", { roomCode });
  io.emit("updatedPublicRoom", { publicRooms: await getPublicRooms() });
}

export function registerIOListeners(io) {
  // Listeners
  io.on("connection", (socket) => {
    // when someone connects, they are assigned a socket object.
    Sentry.logger.info("Socket connected.", { socketId: socket.id });

    // Join a room and send the initial room data back to the user
    socket.on("joinRoom", async ({ roomCode }) => {
      if (!roomCode) return;

      // Add this client's socket to the specified room group
      socket.join(`${roomCode}`);
      const room = await getRoom(roomCode);
      if (room) {
        socket.emit("updatedRoom", room);
      }
    });

    // Leave a room to stop receiving updates for that room
    socket.on("leaveRoom", ({ roomCode }) => {
      if (!roomCode) return;

      // Remove this client's socket from the specified room group
      socket.leave(`${roomCode}`);
    });

    // Send the message to the client
    socket.on("sendMatchMessage", ({ roomCode, message }) => {
      if (!roomCode || !message?.text) return;

      handleMatchMessage(io, roomCode, message).catch((error) => {
        Sentry.logger.error("Failed to handle match message.", {
          ...getErrorAttributes(error),
          roomCode,
        });
      });
    });

    // You can listen to socket object events. For example, this is when
    // a user disconnects
    socket.on("disconnect", () => {
      Sentry.logger.info("Socket disconnected.", { socketId: socket.id });
    });
  });
}
