const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);  // Emit message to all connected clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
