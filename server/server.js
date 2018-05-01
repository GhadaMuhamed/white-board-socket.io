const path = require('path');
const http = require('http');
const Map = require('es6-map');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const createRoom = require('../Routes/createRoom.js');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
map = new Map();
app.use('/CreateRoom',createRoom);
app.use(express.static(publicPath));
let numberOfOnlineUsers = 0;
io.on('connection', (socket) => {
  numberOfOnlineUsers++;
  console.log('New user connected');
  socket.on('createRoom',(params) =>{
    socket.join(params.room);
  })
  socket.on('enter', (params) => {
    console.log(socket.id);
    console.log("joined el room");
    map.set(socket.id, params.room);
  });

  socket.on('new-message', (data) => {
    console.log("Message Received: " +  data.message);
      io.to(map.get(socket.id)).emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    numberOfOnlineUsers--;
    map.delete(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
