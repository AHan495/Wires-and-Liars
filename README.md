# Wires and Liars

This repository is a copy of the original on Github Classroom, and was made with 2 other people.
The "ai-sessions" directory has been purged from this copy for containing session keys and other secrets.

Some mistakes from the original remain (Such as not guarding backend endpoints behind authentication) but since those were in someone elses scope during the project I didn't bother fixing them in this copy.

Overall I'm pretty happy with how we did. Everything I was responsible for (Google OAuth, AI integration, TTS and STT, deployment) went very well.

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

We'll use Socket.IO for real-time enablement. It will handle real-time lobby updates, room creation, player joins, match state, turn changes, AI messages, and transcript/audio updates. We will store the match room info in redis.

### AI Integration with MCP / tools

- Assignee: Austin Han

We plan on using Hugging Face or Groq (because it's free). To integrate it, we'll be using speech to text and
text to speech to interact with it.

### Stripe Integration

- Assignee: Ali Rajan

We will use Webhooks and Cloudflared Tunnels

### Deployment

- Assignee: Autin Han

### Architecture

- Assignee: Everyone

---

## Running the App

### Prerequisites

- Node.js (`v16` or higher)
- `npm` or `yarn`
- Docker and Docker Compose (for local PostgreSQL and Redis)

### Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp server/example.env server/.env
   ```

3. Update `server/.env` with your PostgreSQL and Redis connection details. Defaults are provided for local Docker setup.

4. For local development, start the PostgreSQL and Redis containers:

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

### Redis

Redis is used to store real-time room state, public room indexes, match participants, and match message history.

The backend connects to Redis using:

```env
REDIS_URL=redis://localhost:6379
REDIS_PORT=6379
```

Clear local Redis data:

```bash
docker exec -it wires-and-liars-redis redis-cli FLUSHDB
```

### Database and Redis Management

Stop the PostgreSQL and Redis containers:

```bash
docker-compose down
```

Stop PostgreSQL and Redis, then remove stored data:

```bash
docker-compose down -v
```

View PostgreSQL logs:

```bash
docker-compose logs postgres
```

### Stripe Local Development

Stripe webhooks need to be registered through the Stripe account. This involves providing a publicly-accessible webhook
URL; for local development, we use a Cloudflare tunnel to map localhost to a public host.

1. Setup `cloudflared` from
   https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/

2. Run

```bash
cloudflared tunnel --url http://localhost:3000
```

This will output a tunnel URL.

3. Follow these instructions to add the tunnel URL as an event destination:
   https://docs.stripe.com/webhooks#register-webhook

   Select the event types used in the codebase.

Note: each time you run `cloudflared` and obtain a new tunnel URL, you will need to edit this destination.

### Switching Database Providers

To use a different PostgreSQL provider (Supabase, Railway, Render, etc.), update your `.env` file with the provider's connection details and restart the backend. No code changes are needed.

## Stripe Account Setup

Follow these steps to setup a Stripe account that can be used for our site's Stripe-related features.

1. Sign up and create a Stripe account: https://dashboard.stripe.com/register

2. Create a product for our site's subscription by following these steps:
   https://docs.stripe.com/products-prices/manage-prices#create-product

   - Set the pricing to be _Recurring_ with _Monthly_ frequency.
   - Click "More pricing options", then set _Lookup key_ to some (meaningful) unique string. Lookup keys will be used
     for Stripe API calls (e.g., when retrieving prices).
   - Currently, must match SUBSCRIPTION_PRICE_LOOKUP_KEY value.

3. Go to Developers > API keys to get your sandbox secret key (`sk_test_...`). Set `STRIPE_SECRET_KEY` in
   `/server/.env` to this key.

4. Configure your webhook as follows:

   1. Go to Workbench > Webhooks and click "Add destination".

   2. Select "Your account" for the scope, and for the events, select all events used by our webhook endpoint (e.g.,
      `checkout.session.completed`). Click "Next".

   3. Select "Webhook endpoint". Click "Continue".

   4. Enter your webhook endpoint URL (`base-url/billing/webhook`). For local development, follow the previous steps on
      creating a Cloudflare tunnel and use the tunnel's URL as your base URL (note that each time you create a tunnel,
      you will need to update the endpoint URL through "Edit destination"). Click "Create destination".

   5. In your webhook, copy the signing secret (`whsec_...`) and set `STRIPE_WEBHOOK_ENDPOINT_SECRET` in `/server/.env`
      to this secret.

   The webhook is now configured. You can also view events and their requests/responses through "Event deliveries" in
   the Stripe dashboard. Test card numbers can be found here: https://docs.stripe.com/testing

## Deployment

Run

ssh root@project-wires-and-liars.amazingcloud.space

to access the VM.

Because of the two workflows, this should be unneeded, and any changes pushed to the main branch will
automatically update on the VM.

To move .env files, run

scp project-wires-and-liars/.env root@project-wires-and-liars.amazingcloud.space:~~/wires-and-liars/.env
scp project-wires-and-liars/server/.env root@project-wires-and-liars.amazingcloud.space:~~/wires-and-liars/server/.env

(Or just whatever your file directory system is)
