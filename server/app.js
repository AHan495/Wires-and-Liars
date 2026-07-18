import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { sequelize } from "./datasource.js";
import { connectRedis } from "./redis.js";
import { authRouter } from "./routers/auth_router.js";
import { roomsRouter } from "./routers/rooms_router.js";
import { registerIOListeners } from "./sockets.js";
import { billingRouter } from "./routers/billing_router.js";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Connnect to Redis
try {
  await connectRedis();
} catch (error) {
  console.error("Unable to connect to Redis:", error);
}

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

registerIOListeners(io);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use("/auth", authRouter);
app.use("/billing", billingRouter);
app.use("/rooms", roomsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
