import express from "express";
import dotenv from "dotenv";

// Need to run dotenv config here aswell, or else process.env will be undefined
dotenv.config();

export const gameRouter = express.Router();

const SYSTEM_PROMPT =
  "You are an AI model attempting to blend in in a social deduction game. In the game, there are 2 humans trying to determine who is the AI. At the end of the game, if they both correctly vote who is the AI, th humans win. Otherwise, the AI wins. Your goal as the AI is to win.";
const MODEL = "meta-llama/Llama-3.2-1B-Instruct:featherless-ai";

// Function to turn an array of chats into what the AI expects. For instance, flan t5 small expects a raw string
// Chat history should be an array of objects like this:
// [ {speaker: "Red", message: "Green, where do you live?"}, {speaker: "Green", message: "I'm from Canada."} ]
// AI colour i a string for what colour the AI should be
function makePrompt(chatHistory, aiColour) {
  switch (MODEL) {
    case "meta-llama/Llama-3.2-1B-Instruct:featherless-ai":
      // Chat model. Expects a messages array.
      // Since the model only has "user" and "assistant" roles, we fold the whole
      // conversation into one user message so it can see who said what.
      const convertedHistory = chatHistory
        .map((msg) => `${msg.speaker}: ${msg.message}`)
        .join("\n");
      return [
        { role: "system", content: `${SYSTEM_PROMPT} You are playing as ${aiColour}.` },
        { role: "user", content: `${convertedHistory}\n${aiColour}:` },
      ];
      break;
  }
}

// Function to ask AI for a response
async function tellAI(chatHistory, aiColour) {
  switch (MODEL) {
    case "meta-llama/Llama-3.2-1B-Instruct:featherless-ai":
    const messages = makePrompt(chatHistory, aiColour);

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, messages: messages }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No Response.";
  }
}

// User said something. Add real time integration here
gameRouter.post("/talk", (req, res) => {});
