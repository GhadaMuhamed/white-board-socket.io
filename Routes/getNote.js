const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var notesUser=require('../Models/notesUser.js');
const router = express.Router();
var token=require('../token.js');
var auth;
router.get('/:roomName',token,(req,res)=>{
  var username=req.tok.username;
  console.log(username);
  var roomName=req.params.roomName;
  notesUser.find({username:username,roomName:roomName},{_id:0,username:0,roomName:0},function(err,data){
    if(err)throw err;
    res.json(data);
  });
});
module.exports=router;
