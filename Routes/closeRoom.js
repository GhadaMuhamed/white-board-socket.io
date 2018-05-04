var express = require('express');
var router = express.Router();
const closeRoom = require('../server/utils/Functions.js').closeRoom;
const isTeacher = require('../server/utils/Functions.js').isTeacher;
var token=require('../token.js');
router.get('/:roomName',token,function(req,res){
    var username = req.tok.username;
    var name = req.params.roomName;
    isTeacher(username,(flag) => {
      if (flag) {
        closeRoom(name, (err)=> {
          if (err)
            res.json({"message" : "There isn't a room with that name"});
          else res.json({"message" : "The room is closed"});
        });
      }
      else res.json({"message" : "This user isn't authorized to close room"});
    })

})

module.exports = router
