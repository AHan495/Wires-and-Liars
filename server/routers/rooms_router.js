import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";

export const roomsRouter = Router();
roomsRouter.use(isAuthenticated);

// get all public rooms
roomsRouter.get("/", (req, res) => {
  const publicRooms = getPublicRooms();
  res.json({ publicRooms });
});

// create a new room
roomsRouter.post("/", (req, res) => {
  const newRoom = createRoom(req.session.userId, req.body);
  res.json({ newRoom });
});

// join a specific room by code
roomsRouter.post("/:roomCode/join", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  const updatedRoom = joinRoom(room, req.session.userId);
  if (!updatedRoom) {
    return res.status(400).json({ error: "Failed to join room" });
  }
  res.json({ updatedRoom });
});

// leave a specific room by code
roomsRouter.post("/:roomCode/leave", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  const updatedRoom = leaveRoom(room, req.session.userId);
  if (!updatedRoom) {
    return res.status(400).json({ error: "Failed to leave room" });
  }
  res.json({ updatedRoom });
});

// start a match in a specific room by code
roomsRouter.post("/:roomCode/start", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (room.hostId !== req.session.userId) {
    return res.status(403).json({ error: "Only the host can start the match" });
  }
  if (room.started) {
    return res.status(400).json({ error: "Match already started" });
  }
  const updatedRoom = startMatch(room);
  if (!updatedRoom) {
    return res.status(500).json({ error: "Failed to start match" });
  }
  res.json({ updatedRoom });
});

// end a match in a specific room by code
roomsRouter.post("/:roomCode/end", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  const updatedRoom = endMatch(room);
  if (!updatedRoom) {
    return res.status(500).json({ error: "Failed to end match" });
  }
  res.json({ updatedRoom });
});

// delete a specific room by code
roomsRouter.delete("/:roomCode", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (room.hostId !== req.session.userId) {
    return res.status(403).json({ error: "Only the host can delete the room" });
  }
  const deleted = deleteRoom(room);
  if (!deleted) {
    return res.status(500).json({ error: "Failed to delete room" });
  }
  res.json({ message: "Room deleted successfully" });
});

// get a specific room by code
roomsRouter.get("/:roomCode", (req, res) => {
  const room = getRoom(req.params.roomCode);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json({ room });
});
