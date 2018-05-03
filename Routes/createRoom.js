var express = require('express');
var router = express.Router();
const isFound = require('../server/utils/Functions.js').isFound;
const createRoom = require('../server/utils/Functions.js').createRoom;
var token=require('../token.js');
router.post('/create-room/:roomName',token,function(req,res){
    var email = req.tok.body.email;
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
