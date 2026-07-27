import crypto from "crypto";
import { redis } from "../redis.js";
import { saveMatchHistories } from "../services/match_history_service.js";

const MAX_PLAYERS = 2;
const MATCH_COLORS = ["red", "blue", "green"];
export const MATCH_DISCUSSION_SECONDS = 60;
export const MATCH_VOTE_SECONDS = 60;

function normalizeRoomCode(roomCode) {
  return roomCode.trim().toUpperCase();
}

function getMatchVotesKey(roomCode) {
  return `${normalizeRoomCode(roomCode)}:matchVotes`;
}

// 2 bytes = 4 hex characters
function createRoomCode() {
  return `RM-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

// Fisher–Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
// Helper to assign random colors to players
function shuffledColors() {
  const colors = [...MATCH_COLORS];

  for (let index = colors.length - 1; index > 0; index -= 1) {
    const swapIndex = crypto.randomInt(index + 1);
    [colors[index], colors[swapIndex]] = [colors[swapIndex], colors[index]];
  }

  return colors;
}

function getPlayerLabel(index) {
  return `Player ${index + 1}`;
}

function addSeconds(date, seconds) {
  return new Date(date.getTime() + seconds * 1000).toISOString();
}

function isVoteOpen(room) {
  const discussionEndsAt = new Date(room.discussionEndsAt).getTime();
  const voteEndsAt = new Date(room.voteEndsAt).getTime();
  if (!Number.isFinite(discussionEndsAt) || !Number.isFinite(voteEndsAt)) {
    return true;
  }

  const now = Date.now();
  return now >= discussionEndsAt && now < voteEndsAt;
}

function isVoteExpired(room) {
  const voteEndsAt = new Date(room.voteEndsAt).getTime();
  if (!Number.isFinite(voteEndsAt)) return false;

  return Date.now() >= voteEndsAt;
}

function getMatchVoteContext(room, voterId, targetId) {
  if (!room.started || room.matchResult) return null;
  if (!isVoteOpen(room)) return null;

  const participants = room.matchParticipants ?? [];

  // find the voter from voterId
  const voter = participants.find(
    (participant) => participant.userId === voterId && !participant.isAI,
  );

  // find the target from targetId
  const target = participants.find(
    (participant) => participant.userId === targetId,
  );

  // find the aiPlayer
  const aiPlayer = participants.find((participant) => participant.isAI);

  // all of the above must exist
  if (!voter || !target || !aiPlayer) return null;

  // list of ids of human players
  const humanPlayerIds = participants
    .filter((participant) => !participant.isAI)
    .map((participant) => participant.userId);

  return { aiPlayer, humanPlayerIds };
}

// check the winner (humans or AI)
function buildMatchResult(matchVotes, humanPlayerIds, aiPlayer) {
  // check if everyone voted or not
  const allHumansVoted = humanPlayerIds.every((humanPlayerId) =>
    Boolean(matchVotes[humanPlayerId]),
  );

  if (!allHumansVoted) {
    return null;
  }

  // if everyone voted on AI, humans win
  return {
    humansWin: humanPlayerIds.every(
      (humanPlayerId) => matchVotes[humanPlayerId] === aiPlayer.userId,
    ),
    aiUserId: aiPlayer.userId,
    completedAt: new Date().toISOString(),
  };
}

// AI wins if vote expires and there is no result yet (humans have to vote within the time limit)
async function finalizeExpiredMatch(room) {
  if (!room.started || room.matchResult || !isVoteExpired(room)) return room;

  const aiPlayer = (room.matchParticipants ?? []).find(
    (participant) => participant.isAI,
  );
  if (!aiPlayer) return room;

  const completedRoom = await saveRoom({
    ...room,
    matchResult: {
      humansWin: false,
      aiUserId: aiPlayer.userId,
      completedAt: new Date().toISOString(),
    },
  });
  await saveMatchHistories(completedRoom);

  return completedRoom;
}

// Random colors are assigned here
function assignMatchParticipants(room) {
  const colors = shuffledColors();
  const participants = [
    ...room.participants.map((participant, index) => ({
      userId: participant.userId,
      color: colors[index],
    })),
    {
      userId: "ai",
      color: colors[2],
      isAI: true,
    },
  ];

  // Fisher–Yates shuffle again (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
  // Shuffle index so the location of the players in the frontend is randomized
  for (let index = participants.length - 1; index > 0; index -= 1) {
    const swapIndex = crypto.randomInt(index + 1);
    [participants[index], participants[swapIndex]] = [
      participants[swapIndex],
      participants[index],
    ];
  }

  return participants.map((participant, index) => ({
    ...participant,
    label: getPlayerLabel(index),
  }));
}

async function saveRoom(room) {
  const normalizedRoom = {
    ...room,
    id: normalizeRoomCode(room.id),
    updatedAt: new Date().toISOString(),
  };

  // Save the full room details (id is the key)
  await redis.set(normalizedRoom.id, JSON.stringify(normalizedRoom));

  // Maintain the public rooms index using a Redis set
  if (normalizedRoom.public && !normalizedRoom.started) {
    await redis.sAdd("public", normalizedRoom.id);
  } else {
    await redis.sRem("public", normalizedRoom.id);
  }

  return normalizedRoom;
}

export async function getPublicRooms() {
  // Fetch all room ids currently listed in the public set index
  const roomCodes = await redis.sMembers("public");
  if (roomCodes.length === 0) return [];

  // Batch-fetch all room data payloads simultaneously
  const rawRooms = await redis.mGet(roomCodes);

  return rawRooms.filter(Boolean).map((rawRoom) => JSON.parse(rawRoom));
}

export async function getRoom(roomCode) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  const rawRoom = await redis.get(normalizedRoomCode);

  if (!rawRoom) return null;

  const room = JSON.parse(rawRoom);
  if (!room.started) return room;

  // hGetAll gets everything in a redis hash
  const roomWithVotes = {
    ...room,
    matchVotes: await redis.hGetAll(getMatchVotesKey(normalizedRoomCode)),
  };

  return finalizeExpiredMatch(roomWithVotes);
}

export async function createRoom(roomInput) {
  let roomCode = createRoomCode();

  // Make sure that the code is unique
  while (await redis.exists(roomCode)) {
    roomCode = createRoomCode();
  }

  const room = {
    id: roomCode,
    name: roomInput.name?.trim() || "Untitled Room",
    hostname: getPlayerLabel(0),
    hostId: roomInput.hostId,
    public: roomInput.public,
    started: false,
    players: 1,
    participants: [{ userId: roomInput.hostId, username: getPlayerLabel(0) }],
    createdAt: new Date().toISOString(),
  };

  return saveRoom(room);
}

export async function joinRoom(room, userId) {
  if (room.started) return null;
  if (room.participants.some((participant) => participant.userId === userId)) {
    return room;
  }
  if (room.participants.length >= MAX_PLAYERS) return null;

  return saveRoom({
    ...room,
    players: room.participants.length + 1,
    participants: [
      ...room.participants,
      { userId, username: getPlayerLabel(room.participants.length) },
    ],
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
  const matchStartedAt = new Date();
  const discussionEndsAt = addSeconds(matchStartedAt, MATCH_DISCUSSION_SECONDS);
  const voteEndsAt = addSeconds(new Date(discussionEndsAt), MATCH_VOTE_SECONDS);
  const roomCode = normalizeRoomCode(room.id);

  await redis.del(getMatchVotesKey(roomCode));
  return saveRoom({
    ...room,
    started: true,
    matchParticipants: assignMatchParticipants(room),
    matchStartedAt: matchStartedAt.toISOString(),
    discussionEndsAt,
    voteEndsAt,
    matchVotes: {},
    matchResult: null,
    messages: room.messages ?? [],
  });
}

export async function appendMatchMessage(room, message) {
  const updatedRoom = {
    ...room,
    messages: [...(room.messages ?? []), message],
  };

  await saveRoom(updatedRoom);
  return updatedRoom;
}


export async function endMatch(roomCode, userId) {
  const room = await getRoom(roomCode);
  if (!room?.matchResult) return null;
  if (
    !room.matchParticipants?.some(
      (participant) => participant.userId === userId,
    )
  ) {
    return null;
  }

  await deleteRoom(room);
  return { room: null, deleted: true };
}

export async function castMatchVote(roomCode, voterId, targetId) {
  const latestRoom = await getRoom(roomCode);
  if (!latestRoom) return null;

  const voteContext = getMatchVoteContext(latestRoom, voterId, targetId);
  if (!voteContext) return null;

  // check https://redis.io/docs/latest/commands/hsetnx/ for hstenx command
  // sets field if it does not exist yet
  // each vote is stored as a seperate field key so, it prevents race condition (updating votes)
  await redis.sendCommand([
    "HSETNX",
    getMatchVotesKey(roomCode),
    voterId,
    targetId,
  ]);

  // get all votes
  const matchVotes = await redis.hGetAll(getMatchVotesKey(roomCode));

  // compute result with the helper if result does not exist
  const matchResult =
    latestRoom.matchResult ??
    buildMatchResult(
      matchVotes,
      voteContext.humanPlayerIds,
      voteContext.aiPlayer,
    );

  if (matchResult && !latestRoom.matchResult) {
    const completedRoom = await saveRoom({
      ...latestRoom,
      matchVotes,
      matchResult,
    });
    await saveMatchHistories(completedRoom);
    return completedRoom;
  }

  return {
    ...latestRoom,
    matchVotes,
    matchResult,
  };
}

export async function deleteRoom(room) {
  await redis.del(room.id);
  await redis.del(getMatchVotesKey(room.id));
  await redis.sRem("public", room.id);

  return true;
}
