import crypto from "crypto";
import { redis } from "../redis.js";

const MAX_PLAYERS = 2;

function normalizeRoomCode(roomCode) {
  return roomCode.trim().toUpperCase();
}

function createRoomCode() {
  return `RM-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

async function saveRoom(room) {
  const normalizedRoom = {
    ...room,
    id: normalizeRoomCode(room.id),
    updatedAt: new Date().toISOString(),
  };

  // save the full room details (id is the key)
  await redis.set(normalizedRoom.id, JSON.stringify(normalizedRoom));

  // maintain the public rooms index using a Redis set
  if (normalizedRoom.public) {
    await redis.sAdd("public", normalizedRoom.id);
  } else {
    await redis.sRem("public", normalizedRoom.id);
  }

  return normalizedRoom;
}

export async function getPublicRooms() {
  // fetch all room ids currently listed in the public set index
  const roomCodes = await redis.sMembers("public");
  if (roomCodes.length === 0) return [];

  // batch-fetch all room data payloads simultaneously
  const rawRooms = await redis.mGet(roomCodes);

  return rawRooms.filter(Boolean).map((rawRoom) => JSON.parse(rawRoom));
}

export async function getRoom(roomCode) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  const rawRoom = await redis.get(normalizedRoomCode);

  return rawRoom ? JSON.parse(rawRoom) : null;
}


export async function createRoom(roomInput) {
  let roomCode = createRoomCode();

  // make sure that the code is unique
  while (await redis.exists(roomCode)) {
    roomCode = createRoomCode();
  }

  const room = {
    id: roomCode,
    name: roomInput.name?.trim() || "Untitled Room",
    hostname: roomInput.hostname,
    hostId: roomInput.hostId,
    public: roomInput.public,
    started: false,
    players: 1,
    participants: [{ userId: roomInput.hostId, username: roomInput.hostname }],
    createdAt: new Date().toISOString(),
  };

  return saveRoom(room);
}

export async function joinRoom(room, userId, username) {
  if (room.started) return null;
  if (room.participants.some((participant) => participant.userId === userId)) {
    return room;
  }
  if (room.participants.length >= MAX_PLAYERS) return null;

  return saveRoom({
    ...room,
    players: room.participants.length + 1,
    participants: [...room.participants, { userId, username }],
  });
}

export async function leaveRoom(room, userId) {
  if (room.hostId === userId) {
    await deleteRoom(room);
    return null;
  }

  const participants = room.participants.filter(
    (participant) => participant.userId !== userId,
  );

  return saveRoom({
    ...room,
    players: participants.length,
    participants,
  });
}

export async function startMatch(room) {
  return saveRoom({ ...room, started: true });
}

export async function endMatch(room) {
  return saveRoom({ ...room, started: false });
}

export async function deleteRoom(room) {
  await redis.del(room.id);
  await redis.sRem("public", room.id);

  return true;
}
