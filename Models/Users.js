var mongoose = require('../db.js');
var usersSchema=new mongoose.Schema({
    image:String,
    username:String,
    type : Boolean,
    password: String,
    email:{
      type:String,
      unique: true
    },
    rooms:{ type : Array , "default" : [] },
  	snapshots:{ type : Array , "default" : [] },
    notes:{ type : Array , "default" : [] }
},{collection:'Users'});
usersSchema.index({email: 1}, {unique: true});
module.exports=mongoose.model('Users',usersSchema);
