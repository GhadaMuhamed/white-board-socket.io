const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var rooms=require('../Models/roomModel.js');
const router = express.Router();
var token=require('../token.js');
var auth;
router.get('/:roomName',token,(req,res)=>{
  var email=req.tok.body.email;
  console.log(email);
  var roomName=req.params.roomName;
  rooms.find({email:email,roomName:roomName},{_id:0},function(err,data){
    if(err)throw err;
    res.json(data);
  });
});
module.exports=router;
