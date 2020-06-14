var express = require("express");
var app = express();
var http = require("http").createServer(app);
var path = require("path");
var randomColor = require("randomcolor");
var io = require("socket.io")(http);

const { v4: uuidv4 } = require("uuid");

//route handler
app.use(express.static(path.join(__dirname, "./client")));

//listen for incoming sockets
io.on("connection", (socket) => {
  const userId = uuidv4();
  const userColor = randomColor();
  var userName = "";
  console.log(`user ${userId} connected`);

  socket.on("nickName", (nickName) => {
    userName = nickName;
  });

  socket.on("message", (msg) => {
    io.emit("message", msg, userId, userColor, userName);
  });

  //disconnection event fired by each socket
  socket.on("disconnect", () => {
    console.log(`user ${userId} disconnected`);
  });
});

//http server is listening on port 3000
http.listen(3000, () => {
  console.log("listening on port 3000");
});
