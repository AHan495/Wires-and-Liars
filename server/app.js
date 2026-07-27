import "./instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { sequelize } from "./datasource.js";
import { connectRedis } from "./redis.js";
import "./models/user.js";
import "./models/match_history.js";
import { authRouter } from "./routers/auth_router.js";
import { roomsRouter } from "./routers/rooms_router.js";
import { registerIOListeners } from "./sockets.js";
import { billingRouter } from "./routers/billing_router.js";
import { getErrorAttributes } from "./utils/logger.js";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false } });
  Sentry.logger.info("Connection has been established successfully.");
} catch (error) {
  Sentry.logger.error(
    "Unable to connect to the database.",
    getErrorAttributes(error),
  );
}

// Connnect to Redis
try {
  await connectRedis();
} catch (error) {
  Sentry.logger.error("Unable to connect to Redis.", getErrorAttributes(error));
}

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

registerIOListeners(io);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  Sentry.logger.info("HTTP request", {
    method: req.method,
    url: req.url,
    body: JSON.stringify(req.body),
  });
  next();
});

app.use("/auth", authRouter);
app.use("/billing", billingRouter);
app.use(bodyParser.json());
app.use("/rooms", roomsRouter);

// Must come after routes, and before other error middleware
Sentry.setupExpressErrorHandler(app);

httpServer.listen(PORT, (err) => {
  if (err) {
    Sentry.logger.error(
      "Unable to start HTTP server.",
      getErrorAttributes(err),
    );
  } else {
    Sentry.logger.info("HTTP server running.", { port: PORT });
  }
});
