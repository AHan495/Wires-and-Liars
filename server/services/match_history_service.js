import { MatchHistory } from "../models/match_history.js";

function getHumanParticipants(room) {
  return (room.matchParticipants ?? []).filter((participant) => !participant.isAI);
}

function getStoredMessages(room) {
  return (room.messages ?? []).map((message) => ({
    id: message.id,
    senderId: message.senderId,
    color: message.color,
    text: message.text,
    createdAt: message.createdAt,
  }));
}

function getStoredResult(room, player) {
  return {
    ...room.matchResult,
    playerColor: player.color,
  };
}

// save match history for both players
export async function saveMatchHistories(room) {
  if (!room.matchResult) return [];

  // get the transcript
  const messages = getStoredMessages(room);

  // create data to save in db
  const historyRows = getHumanParticipants(room).map((player) => ({
    userId: player.userId,
    roomId: room.id,
    roomName: room.name,
    matchResult: getStoredResult(room, player),
    messages,
  }));

  await Promise.all(
    historyRows.map((historyRow) => MatchHistory.create(historyRow)),
  );

  return historyRows;
}
