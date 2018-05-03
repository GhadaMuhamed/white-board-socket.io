const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var users=require('../Models/Users.js');
const router = express.Router();
var token=require('../token.js');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.post('',token,(req,res)=>{
  var username=req.tok.username;
  console.log(username);
  users.update({username:username},   { $push: { snapshots: req.body.snapshot } },function(err,data){
    if(err)throw err;
    res.json({"message":"ok"});
  });
});
module.exports=router;
