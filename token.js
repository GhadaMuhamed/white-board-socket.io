const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('./config.js');
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
    req.tok=data;
  }
});
next();
  }
  else{
    res.sendStatus(403);
  }
}
module.exports=verifytok;
