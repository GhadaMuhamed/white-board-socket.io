var mongoose = require('../db.js');
var usersSchema=new mongoose.Schema({
    username: {
    type:String,
    unique:true
    },
    type : Boolean,
    password: String
},{collection:'Users'});
usersSchema.index({username: 1}, {unique: true});
module.exports=mongoose.model('Users',usersSchema);
