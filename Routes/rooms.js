var express = require('express');
var router = express.Router();
var findRoom= require('../server/utils/Functions.js').findRoom;
var getRoomData= require('../server/utils/Functions.js').getRoomData;
var authenticate = require('../token.js');
var addRoomToUser = require('../server/utils/Functions.js').addRoomToUser;
router.get('/:roomName',function(req,res){
  var room = req.params.roomName;
  var user = "dodo";//req.user"";
  findRoom(room, (flag) => {
    if (!flag)
      res.status(404).send("Not Found");
  });

  getRoomData(room,(data) => {
    addRoomToUser(user,room,() => {
      res.status(200).json(data);
    })
  })
})

module.exports = router;
