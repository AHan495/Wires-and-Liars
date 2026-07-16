import { getPublicRooms, getRoom } from "./stores/room_store.js";

export async function broadcastRoomState(io, room) {
  io.to(`${room.id}`).emit("updatedRoom", room);
  io.emit("updatedPublicRoom", { publicRooms: await getPublicRooms() });
}

export async function broadcastRoomDeleted(io, roomCode) {
  io.to(`${roomCode}`).emit("deletedRoom", { roomCode });
  io.emit("updatedPublicRoom", { publicRooms: await getPublicRooms() });
}

export function registerIOListeners(io) {
  // listeners
  io.on("connection", (socket) => {
    // when someone connects, they are assigned a socket object.
    console.log("a user connected");

    // join a room and send the initial room data back to the user
    socket.on("joinRoom", async ({ roomCode }) => {
      if (!roomCode) return;

      // add this client's socket to the specified room group
      socket.join(`${roomCode}`);
      const room = await getRoom(roomCode);
      if (room) {
        socket.emit("updatedRoom", room);
      }
    });

    // leave a room to stop receiving updates for that room
    socket.on("leaveRoom", ({ roomCode }) => {
      if (!roomCode) return;

      // remove this client's socket from the specified room group
      socket.leave(`${roomCode}`);
    });

    // you can listen to socket object events. For example, this is when
    // a user disconnects
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
