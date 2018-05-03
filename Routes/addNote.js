const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var notesUser=require('../Models/notesUser.js');
const router = express.Router();
var token=require('../token.js');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.post('/:roomName',token,(req,res)=>{
  var roomName=req.params.roomName;
  var email=req.tok.body.email;
  var begpoint=req.body.begpoint;
  var endpoint=req.body.endpoint;
  console.log(email);
  var note={
    width:req.body.width,
    color:req.body.color,
    begpoint:begpoint,
    endpoint:endpoint
  };
  console.log(note);
  notesUser.update({email:email,roomName:roomName},{ $push: { notes: note }},{upsert: true} ,function(err,data){
    if(err)throw err;
    res.json({"message":"added well"});
  });
});
module.exports=router;
