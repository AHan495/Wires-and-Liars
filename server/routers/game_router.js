import express from "express";
import dotenv from "dotenv";

// Need to run dotenv config here aswell, or else process.env will be undefined
dotenv.config();

export const gameRouter = express.Router();

const SYSTEM_PROMPT =
  "You are an AI model attempting to blend in in a social deduction game. In the game, there are 2 humans trying to determine who is the AI. At the end of the game, if they both correctly vote who is the AI, th humans win. Otherwise, the AI wins. Your goal as the AI is to win.";
const MODEL =
  "https://api-inference.huggingface.co/models/google/flan-t5-small";

// Function to turn an array of chats into what the AI expects. For instance, flan t5 small expects a raw string
// Chat history should be an array of objects like this:
// [ {speaker: "Red", message: "Green, where do you live?"}, {speaker: "Green", message: "I'm from Canada."} ]
// AI colour i a string for what colour the AI should be
function makePrompt(chatHistory, aiColour) {
  switch (MODEL) {
    case "https://api-inference.huggingface.co/models/google/flan-t5-small":
      // Flan t5. Very small. Expects a raw string
      const convertedHistory = chatHistory
        .map((msg) => `${msg.speaker}: ${msg.message}`)
        .join("\n");
      return `${SYSTEM_PROMPT}\n\n${convertedHistory}\n${aiColour}:`;
      break;
  }
}

// Function to ask AI for a response
async function tellAI(chatHistory, aiColour) {
  const prompt = makePrompt(chatHistory, aiColour);

  const response = await fetch(MODEL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const data = await response.json();

  switch (MODEL) {
    case "https://api-inference.huggingface.co/models/google/flan-t5-small":
      return data[0]?.generated_text ?? "No Response.";
  }
}

// User said something. Add real time integration here
gameRouter.post("/talk", (req, res) => {});
