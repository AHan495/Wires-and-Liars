import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createRoom,
  castMatchVote,
  deleteRoom,
  endMatch,
  getPublicRooms,
  getRoom,
  joinRoom,
  leaveRoom,
  startMatch,
} from "../stores/room_store.js";
import { broadcastRoomDeleted, broadcastRoomState } from "../sockets.js";

export const roomsRouter = Router();
roomsRouter.use(isAuthenticated);

// get all public rooms
roomsRouter.get("/", async (req, res) => {
  const publicRooms = await getPublicRooms();
  res.json({ rooms: publicRooms });
});

// create a new room
roomsRouter.post("/", async (req, res) => {
  const newRoom = await createRoom({
    ...req.body,
    hostId: req.session.userId,
    hostname: req.session.email,
  });
  await broadcastRoomState(req.io, newRoom);
  res.json({ room: newRoom });
});

// join a specific room by code
roomsRouter.post("/:roomCode/join", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  const updatedRoom = await joinRoom(room, req.session.userId);
  if (!updatedRoom) {
    return res.status(400).json({ error: "Failed to join room" });
  }
  await broadcastRoomState(req.io, updatedRoom);
  res.json({ room: updatedRoom });
});

// leave a specific room by code
roomsRouter.post("/:roomCode/leave", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  if (room.started || room.hostId === req.session.userId) {
    await deleteRoom(room);
    await broadcastRoomDeleted(req.io, room.id);
    return res.json({ room: null, deleted: true });
  }

  const updatedRoom = await leaveRoom(room, req.session.userId);
  if (!updatedRoom) {
    return res.status(400).json({ error: "Failed to leave room" });
  }
  await broadcastRoomState(req.io, updatedRoom);
  res.json({ room: updatedRoom });
});

// start a match in a specific room by code
roomsRouter.post("/:roomCode/start", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (room.hostId !== req.session.userId) {
    return res.status(403).json({ error: "Only the host can start the match" });
  }
  if (room.started) {
    return res.status(400).json({ error: "Match already started" });
  }
  const updatedRoom = await startMatch(room);
  if (!updatedRoom) {
    return res.status(500).json({ error: "Failed to start match" });
  }
  await broadcastRoomState(req.io, updatedRoom);
  res.json({ room: updatedRoom });
});

// end a match in a specific room by code
roomsRouter.post("/:roomCode/end", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  const updatedRoom = await endMatch(room);
  if (!updatedRoom) {
    return res.status(500).json({ error: "Failed to end match" });
  }
  await broadcastRoomState(req.io, updatedRoom);
  res.json({ room: updatedRoom });
});

// cast a match vote for who the humans think is AI
roomsRouter.post("/:roomCode/vote", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const updatedRoom = await castMatchVote(
    req.params.roomCode,
    req.session.userId,
    req.body.targetId,
  );
  if (!updatedRoom) {
    return res.status(400).json({ error: "Failed to cast vote" });
  }

  await broadcastRoomState(req.io, updatedRoom);
  res.json({ room: updatedRoom });
});

// delete a specific room by code
roomsRouter.delete("/:roomCode", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (room.hostId !== req.session.userId) {
    return res.status(403).json({ error: "Only the host can delete the room" });
  }
  const deleted = await deleteRoom(room);
  if (!deleted) {
    return res.status(500).json({ error: "Failed to delete room" });
  }
  await broadcastRoomDeleted(req.io, room.id);
  res.json({ message: "Room deleted successfully" });
});

// get a specific room by code
roomsRouter.get("/:roomCode", async (req, res) => {
  const room = await getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json({ room });
});
