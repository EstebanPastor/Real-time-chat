import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

const PORT = process.env.PORT;

server.listen(PORT);
