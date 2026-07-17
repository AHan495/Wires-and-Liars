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

### Real-time enablement

- Assignee: Kaito Watanabe

We will be using WebRTC with PeerJS for real time enablement, using Peer to Peer to Peer architecture

### AI Integration with MCP / tools

- Assignee: Austin Han

We plan on using Hugging Face (because it's free). To integrate it, we'll be using speech to text and
text to speech to interact with it.

### Stripe Integration

- Assignee: Ali Rajan

We will use Webhooks and Cloudflared Tunnels

Sandbox account publishable key:

```bash
pk_test_51TqwFeLK7OPlaQg67SQgt5NK11tetG5sEJursoiDp8XulqkmHPlHvR1SolNJAlCtoYFVmyzV7vd7B8XbzKw4OAM600wUaihOIy
```

### Deployment

- Assignee: Everyone(?)

Domain name: TBA

### Architecture

- Assignee: Everyone

---

## Running the App

### Prerequisites

- Node.js (`v16` or higher)
- `npm` or `yarn`
- Docker and Docker Compose (for local PostgreSQL)

### Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp server/example.env server/.env
   ```

3. Update `server/.env` with your PostgreSQL connection details. Defaults are provided for local Docker setup.

4. For local development, start the PostgreSQL container:

   ```bash
   docker-compose up -d
   ```

5. Run the backend (in one terminal):

   ```bash
   npm run backend
   ```

   The backend will start on `localhost:3000`.

6. Run the frontend (in another terminal):

   ```bash
   npm run dev
   ```

   The frontend will start on `localhost:5173`.

7. Visit `http://localhost:5173`.

### Database Management

Stop the PostgreSQL container:

```bash
docker-compose down
```

Stop PostgreSQL and remove data:

```bash
docker-compose down -v
```

View PostgreSQL logs:

```bash
docker-compose logs postgres
```

### Switching Database Providers

To use a different PostgreSQL provider (Supabase, Railway, Render, etc.), update your `.env` file with the provider's connection details and restart the backend. No code changes are needed.
