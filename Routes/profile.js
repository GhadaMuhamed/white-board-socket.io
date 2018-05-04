const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var users=require('../Models/Users.js');
const router = express.Router();
var token=require('../token.js');
router.get('',token,(req,res)=>{
    console.log(req.tok);
  var username=req.tok.username;
  users.find({username:username},{_id:0,password:0},function(err,data){
    if(err)throw err;
    if(data[0]){
      res.json(data[0]);
    }
  });
});
module.exports=router;
