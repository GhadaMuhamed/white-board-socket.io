var mongoose = require('../db.js');
var UsersRoomsSchema=new mongoose.Schema(
{
	email:{type:String,unique:true},
	roomName:{type:String},
	notes:Array

},{collection:'notesUser'});
UsersRoomsSchema.index({email: 1}, {unique: true});
module.exports=mongoose.model('UsersRooms',UsersRoomsSchema);
