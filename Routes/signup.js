const express=require('express');
const config=require('../config.js');
var users=require('../Models/Users.js');
const router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.post('',(req,res)=>{
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var username=req.body.username;
  users.find({username:username},{_id:0,password:0},function(err,data){
    if(err)throw err;
    if(data[0]){
      res.json({"message":"NO"});
    }
    else{
      users.create({
        username:req.body.name,
        password:req.body.password,
        type:false
      },function(err,data){
          if(err)throw err;
          else {
          res.json({"message":"YES"});
          }
      });
    }
  });
});
module.exports=router;
