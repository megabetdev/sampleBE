var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  // Send "abc" every 5 seconds for 10 times
  let counter = 0;
  const intervalId = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 99) + 1;
    console.log("Sending: ", randomNum);
    socket.emit("sendDataServer", { data: randomNum.toString() });
    counter++;

    if (counter === 10) {
      clearInterval(intervalId); // Stop the interval after 10 times
    }
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(intervalId); // Stop the interval if the client disconnects
  });
});

server.listen(3000, () => {
  console.log("Server running on 3000");
});
