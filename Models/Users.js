var mongoose = require('../db.js');
var usersSchema=new mongoose.Schema({
    username: {
    type:String,
    unique:true
    },
    type : Boolean,
    image:String,
    password: String,
    rooms:{ type : Array , "default" : [] },
  	snapshots:{ type : Array , "default" : [] }
},{collection:'Users'});
usersSchema.index({username: 1}, {unique: true});
module.exports=mongoose.model('Users',usersSchema);
