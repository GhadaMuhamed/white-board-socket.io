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
  },{_id:0,image:0,rooms:0,snapshots:0,password:0},
  function(err,data){
    if(err) throw err;
    if(data[0]){
      var type=data[0].type;
      var body={
        username:data[0].username
      };
      JWT.sign(body,config.secret,(err,token)=>{
        res.json({
			"message":"found",
          token,
          type
        });
      });
    }
    else
      res.json({"message":"Unauthorized"});
  });
});
module.exports=router;
