import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const http = createServer(app);

const PORT = 8000;

// create socket to app server
const io = new Server(http, {
  ///
});

// express middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

http.listen(PORT, () => {
  console.log(`Server is running on ${PORT} PORT`);
});

// Socket
io.on("connection", (socket) => {
  console.log("Socket Connected...");

  // Here 'message' is Event name
  socket.on("message", (msg) => {
    // console.log("Msg", msg);

    // send message all other users
    socket.broadcast.emit("message", msg);
  });
});
