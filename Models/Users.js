var mongoose = require('../db.js');
var usersSchema=new mongoose.Schema({
    image:String,
    type : Boolean,
    password: String,
    username:{
      type:String,
      unique: true
    },
    rooms:{ type : Array , "default" : [] },
  	snapshots:{ type : Array , "default" : [] },
},{collection:'Users'});
usersSchema.index({username: 1}, {unique: true});
module.exports=mongoose.model('Users',usersSchema);
