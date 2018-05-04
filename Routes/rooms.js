var express = require('express');
var router = express.Router();
var findRoom= require('../server/utils/Functions.js').findRoom;
var getRoomData= require('../server/utils/Functions.js').getRoomData;
var token = require('../token.js');
var addRoomToUser = require('../server/utils/Functions.js').addRoomToUser;
router.get('/:roomName',token,function(req,res){
  var room = req.params.roomName;
  var username = req.tok.username;
  findRoom(room, (flag) => {
    if (!flag)
      res.json({"message" : "There isn't a room with that name"});
  });

  getRoomData(room,(data) => {
    addRoomToUser(username,room,() => {
      res.status(200).json(data);
    })
  })
})

module.exports = router;
