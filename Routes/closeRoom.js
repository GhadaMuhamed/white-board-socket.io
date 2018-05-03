var express = require('express');
var router = express.Router();
const closeRoom = require('../server/utils/Functions.js').closeRoom;
const isTeacher = require('../server/utils/Functions.js').isTeacher;
var token=require('../token.js');
router.get('/:roomName',token,function(req,res){
    var username = req.tok.body.username;
    var name = req.params.roomName;
    isTeacher(username,(flag) => {
      if (flag) {
        closeRoom(name, (err)=> {
          if (err)
            res.status(404).end();
          else res.status(200).end();
        });
      }
      else res.status(403).end();
    })

})

module.exports = router
