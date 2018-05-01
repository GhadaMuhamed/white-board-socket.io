var express = require('express');
var router = express.Router();
const isFound = require('../server/utils/Functions.js').isFound;
const createRoom = require('../server/utils/Functions.js').createRoom;
//var authenticate = require('../midware.js');
router.post('/create-room/:roomName',function(req,res){
    var user = req.user;
    var name = req.params.roomName;
    isTeacher(user,(flag) => {
      if (flag) {
        if (isFound(params))
          res.json({"response":"room is duplicated"});
        else
        createRoom(params, ()=> {
          res.json({"response":"room is created"});
        });
      }
      else res.json({"response":"This user can't create room"});
    })

})

module.exports = router
