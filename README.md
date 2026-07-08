[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/sjGoTOz-)

# Wires and Liars

## Team Members

- Ali Rajan - rajanal1
- Austin Han - hanausti
- Kaito Watanabe - watan111

---

## Summary

Wires and Lires will be an online social deduction game. The basic premise is that two people, plus an AI LLM, will join together. Then, the two human players
will try to deduct who the AI is. Meanwhile, the AI will try to blend in and not be caught. In the end, both humans must vote for the AI to win. If either
human votes for another human, then all humans lose. In terms of medium, it will primarily be speech to text for the humans and text to speech for the AI.
The goal of this is to allow people to talk to hopefully make things more fun, while avoiding pure speech which would destroy the social deduction
part of the game and turn it into a TTS detector challenge.

---

## Capabilities

### Authentication

- Assignee: Austin Han

We will be using Google OAuth

### Look and Feel

- Assignee: Ali Rajan and Kaito Watanabe

TBA

### Real-time enablement

- Assignee: Kaito Watanabe

We'll use Socket.IO for real-time enablement. It will handle real-time lobby updates, room creation, player joins, match state, turn changes, AI messages, and transcript/audio updates.

### AI Integration with MCP / tools

- Assignee: Austin Han

We plan on using Hugging Face (because it's free). To integrate it, we'll be using speech to text and
text to speech to interact with it.

### Stripe Integration

- Assignee: Ali Rajan

We will use Webhooks and Cloudflared Tunnels

Sandbox account publishable key: TBA

### Deployment

- Assignee: Everyone(?)

Domain name: TBA

### Architecture

- Assignee: Everyone

---

## Running the App

To run the app, you will need to configure your .env.

You need to run both the frontend (localhost:5173) and backend (localhost:3000).
Run the backend with node app.js in the /server folder.
Run the frontend with npm run dev in the root.
Then visit localhost:5173.
