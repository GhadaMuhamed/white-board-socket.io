const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('./config.js');
var users=require('./Models/Users.js');
var verifytok=function verifyToken(req,res,next){
  var bearerHeader=req.headers.authorization;
  if(typeof bearerHeader !=='undefined'){
   const bearer=bearerHeader.split(' ');
   var token=bearer[1];
   var authorization;
   JWT.verify(token,config.secret,function(err,data){
  if(err){
   res.status(401).send('Unauthorized');
  }else{
    var username=data.username;
    users.find({username:username},{_id:0,password:0,snapshots:0,rooms:0,type:0,image:0},function(err,data){
      if(err)throw err;
      if(data[0]){
          req.tok=data[0];
          next();
        }
      else  res.status(401).send('Unauthorized');
    });
  }
});
  }
  else{
    res.sendStatus(403);
  }
}
module.exports=verifytok;
