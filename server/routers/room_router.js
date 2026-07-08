import { Router } from "express";

export const roomsRouter = Router();

// get all public rooms
roomsRouter.get("/", (req, res) => {
  res.json({});
});

// create a new room
roomsRouter.post("/", (req, res) => {
  res.json({});
});

// join a specific room by code
roomsRouter.post("/:roomCode/join", (req, res) => {
  res.json({});
});

// leave a specific room by code
roomsRouter.post("/:roomCode/leave", (req, res) => {
  res.json({});
});

// start a match in a specific room by code
roomsRouter.post("/:roomCode/start", (req, res) => {
  res.json({});
});

// end a match in a specific room by code
roomsRouter.post("/:roomCode/end", (req, res) => {
  res.json({});
});

// delete a specific room by code
roomsRouter.delete("/:roomCode", (req, res) => {
  res.json({});
});

// get a specific room by code
roomsRouter.get("/:roomCode", (req, res) => {
  res.json({});
});
