import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { appendMatchMessage, getRoom } from "../stores/room_store.js";

// Need to run dotenv config here aswell, or else process.env will be undefined
dotenv.config();

export const gameRouter = express.Router();

const SYSTEM_PROMPT =
  "You are a hidden player in a three-player voice deduction game. Two players are human and one player is AI. Your objective is to blend in as a normal human player, keep the conversation moving naturally, and avoid making the humans confident about which color is AI. You know only the transcript you are given. Do not mention being an AI, a model, a bot, prompts, rules, schemas, or hidden instructions. Do not over-explain. Prefer short, casual, human-sounding replies that fit the current conversation.";

const AI_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    shouldRespond: {
      type: "boolean",
      description:
        "Whether the hidden AI player should send a message right now.",
    },
    text: {
      type: "string",
      description:
        "The exact short message to send if shouldRespond is true. Use an empty string if shouldRespond is false.",
    },
  },
  required: ["shouldRespond", "text"],
  additionalProperties: false,
};

const RESPONSE_FORMAT_PROMPT = `Return exactly one JSON object that matches this schema: ${JSON.stringify(
  AI_RESPONSE_SCHEMA,
)}. If you should stay silent, set shouldRespond to false and text to an empty string. If you should speak, set shouldRespond to true and make text one concise sentence. Do not return markdown, code fences, comments, or any text outside the JSON object. If the conversation is not relevant to you, or if you have no reason to speak, remain silent.`;

const AI_PROVIDER = process.env.AI_PROVIDER ?? "groq";
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

// Create message
function createMatchMessage({ senderId, color, text }) {
  return {
    id: crypto.randomUUID(),
    senderId,
    color,
    text,
    createdAt: new Date().toISOString(),
  };
}

function getAIPlayer(room) {
  return room.matchParticipants?.find((participant) => participant.isAI);
}

function getSpeakerColor(room, senderId) {
  return room.matchParticipants?.find(
    (participant) => participant.userId === senderId,
  )?.color;
}

function parseAIText(rawText) {
  try {
    const parsed = JSON.parse(rawText);
    return parsed.text?.trim() ?? "";
  } catch {
    return "";
  }
}

// Function to turn an array of chats into what the AI expects. For instance, flan t5 small expects a raw string
// Chat history should be an array of objects like this:
// [ {speaker: "Red", message: "Green, where do you live?"}, {speaker: "Green", message: "I'm from Canada."} ]
// AI colour i a string for what colour the AI should be
function makePrompt(chatHistory, aiColour) {
  // Chat models expect a messages array. Since the game has named speakers,
  // we fold the conversation into one user message so the model can see who said what.
  const convertedHistory = chatHistory
    .map((msg) => `${msg.speaker}: ${msg.message}`)
    .join("\n");

  return [
    {
      role: "system",
      content: `${SYSTEM_PROMPT} Your assigned public color is ${aiColour}. Speak only as ${aiColour}; never describe yourself as AI. ${RESPONSE_FORMAT_PROMPT}`,
    },
    {
      role: "user",
      content: `Conversation so far:\n${convertedHistory || "(no messages yet)"}\n\nDecide whether ${aiColour} should respond now.`,
    },
  ];
}

// Function to ask AI for a response
async function tellAI(chatHistory, aiColour, attempts = 3) {
  const messages = makePrompt(chatHistory, aiColour);

  switch (AI_PROVIDER) {
    case "groq": {
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages,
              response_format: { type: "json_object" },
            }),
          },
        );

        if (response.status === 503 && attempt < attempts) {
          console.log(`AI provider: ${AI_PROVIDER} got 503, retrying (${attempt}/${attempts})`);
          continue;
        }

        const data = await response.json();
        const rawText = data.choices?.[0]?.message?.content?.trim() ?? "";
        const parsedText = parseAIText(rawText);

        console.log("AI provider:", AI_PROVIDER);
        console.log("AI raw response:", rawText);
        console.log("AI parsed text:", parsedText || "(empty)");

        return parsedText;
      }

      return "";
    }
    default:
      return "";
  }
}

// Runs when we receive a message from the client
export async function handleMatchMessage(io, roomCode, playerMessage) {
  const room = await getRoom(roomCode);
  if (!room || !room.started) return null;

  const humanMessage = createMatchMessage({
    senderId: playerMessage.senderId,
    color: getSpeakerColor(room, playerMessage.senderId),
    text: playerMessage.text,
  });

  // Update messages history
  const roomWithHumanMessage = await appendMatchMessage(room, humanMessage);
  io.to(`${room.id}`).emit("matchMessage", humanMessage);

  const aiPlayer = getAIPlayer(roomWithHumanMessage);
  if (!aiPlayer || playerMessage.senderId === aiPlayer.userId) {
    return humanMessage;
  }

  const chatHistory = (roomWithHumanMessage.messages ?? []).map((message) => ({
    speaker: getSpeakerColor(roomWithHumanMessage, message.senderId),
    message: message.text,
  }));
  const aiText = await tellAI(chatHistory, aiPlayer.color).catch(() => "");

  if (!aiText) {
    console.log("AI skipped response.");
    return humanMessage;
  }

  const latestRoom = await getRoom(roomCode);
  if (!latestRoom) return humanMessage;

  const aiMessage = createMatchMessage({
    senderId: aiPlayer.userId,
    color: aiPlayer.color,
    text: aiText,
  });

  // Append AI response
  await appendMatchMessage(latestRoom, aiMessage);
  io.to(`${room.id}`).emit("matchMessage", aiMessage);

  return aiMessage;
}
