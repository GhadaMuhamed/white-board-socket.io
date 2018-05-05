const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var rooms=require('../Models/roomModel.js');
var users=require('../Models/Users.js');
const router = express.Router();
var token=require('../token.js');
router.get('',token,(req,res)=>{
  var username=req.tok.username;
  console.log(username);
   findrooms(username,findrommsforuser,res);
});
var findrooms = function(username,callback,res) {
    rooms.find({},{roomName:1,_id:0},function(err,data){
      if(err)throw err;
      console.log("data"+data);
      callback(username,data,res);
    });
}
var findrommsforuser = function(username,data,res) {
    users.find({username:username},{_id:0,type:0,snapshots:0,image:0,password:0},function(err,data1){
      if(err)throw err;
      var rooms=[];
      console.log("dataforuser"+data1);
      console.log(data.length);
      for (i = 0; i < data.length; i++) {
        console.log("now "+data[i].roomName);
        console.log("lol  "+data1[0].rooms.includes(data[i].roomName));
          if(!data1[0].rooms.includes(data[i].roomName)){
            rooms.push(data[i].roomName);
            console.log(rooms);
          }
      }
    res.json("message":"Authorized"
      ,rooms);
    });
};
module.exports=router;
