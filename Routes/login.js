const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var users=require('../Models/Users.js');
const router = express.Router();
router.get('/:email/:password',(req,res)=>{
  var email=req.params.email;
  var password=req.params.password;
  users.find({
    email:email,
    password:password
  },{_id:0,username:0,rooms:0,snapshots:0,image:0,password:0},
  function(err,data){
    if(err) throw err;
    console.log("data "+data[0]);
    if(data[0]){
    var  type=data[0].type;
      var body={
        email:email
      };
      JWT.sign({body},config.secret,(err,token)=>{
        console.log("token "+token);
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
