const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var users=require('../Models/Users.js');
const router = express.Router();
router.get('/:name/:password',(req,res)=>{
  var name=req.params.name;
  var password=req.params.password;
  users.find({
    username:name,
    password:password
  },{_id:0,username:0,rooms:0,snapshots:0,iamge:0,password:0},
  function(err,data){
    if(err) throw err;
    console.log(data[0]);
    if(data[0]){
    var  type=data[0].type;
      var body={
        name:name
      };
      JWT.sign({body},config.secret,(err,token)=>{
        res.json({
          token,
          type
        });
      });
    }
    else
      res.status(401).send('Unauthorized');
  });
});
module.exports=router;
