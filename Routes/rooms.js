var express = require('express');
var router = express.Router();
var findRoom= require('../server/utils/Functions.js').findRoom;
var token = require('../token.js');
var roomModel=require('../Models/roomModel.js');
router.get('/:roomName',token,function(req,res){
  var room = req.params.roomName;
  var username = req.tok.username;
  findRoom(room, (flag) => {
    if (!flag)
      res.json({"message" : "There isn't a room with that name"});
  });
  roomModel.find({"roomName" : room }, { "board" : 1, "message" : 0 ,"_id":0}, function(err,data){
      if (err) throw err;
      req.json(data);
  });

})

module.exports = router;
