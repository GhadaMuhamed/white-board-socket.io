const express=require('express');
const JWT=require('jsonwebtoken');
const config=require('../config.js');
var request = require('request');
var users=require('../Models/Users.js');
const router = express.Router();
var token=require('../token.js');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null,  Date.now()+'_'+file.originalname  )
    }
});
var upload = multer({storage: storage});
router.post('',token, upload.single('image'),(req,res)=>{
  var username=req.tok.username;
  console.log(req.file);
  users.update({username:username},    { image:  req.file.path } ,function(err,data){
    if(err)throw err;
    res.json({'message': 'File uploaded successfully'});
  });
});
module.exports=router;
