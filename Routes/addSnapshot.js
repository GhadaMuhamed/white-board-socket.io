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
  var email=req.tok.body.email;
  console.log(email);
  users.update({email:email},   { $push: { snapshots: req.body.snapshot } },function(err,data){
    if(err)throw err;
    res.end("ok");
  });
});
module.exports=router;
