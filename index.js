var express = require("express");
var app = express();
var http = require("http").createServer(app);
var path = require("path");
var io = require("socket.io")(http);

//route handler
app.use(express.static(path.join(__dirname, "./client")));

//listen for incoming sockets
io.on("connection", (socket) => {
  console.log("user connected");

  //disconnection event fired by each socket
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//http server is listening on port 3000
http.listen(3000, () => {
  console.log("listening on port 3000");
});
