var express = require('express');
var router = express.Router();
const createRoom = require('../server/utils/Functions.js').createRoom;
const isTeacher = require('../server/utils/Functions.js').isTeacher;
const addLine = require('../server/utils/Functions.js').addLine;
var token=require('../token.js');
router.get('/:roomName',token,function(req,res){
    var username = req.tok.username;
    var name = req.params.roomName;
    isTeacher(username,(flag) => {
      if (flag) {
        createRoom(name, (err)=> {
          if (err)
            res.json({"message" : "There isn't a room with that name"});
            else res.json({"message" : "The room is created"});
        });
      }
      else res.json({"message" : "TThis user isn't authorized to close room"});
    })

})


module.exports = router
