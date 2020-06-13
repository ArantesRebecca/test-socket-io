var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var path = require("path");

//route handler
app.use(express.static(path.join(__dirname, "./client")));

//http server is listening on port 3000
http.listen(3000, () => {
  console.log("listening on port 3000");
});
