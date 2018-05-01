const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var usersRooms=require('../Models/Users.js');
const router = express.Router();
var token=require('../token.js');
var auth;
router.get('/',token,(req,res)=>{
  var username=req.tok.body.name;
  console.log(username);
  usersRooms.find({username:username},{_id:0,password:0,type:0},function(err,data){
    if(err)throw err;
    if(data[0]){
      res.json(data[0]);
    }
    else{
      res.end("No rooms");
    }
  });

});
module.exports=router;
