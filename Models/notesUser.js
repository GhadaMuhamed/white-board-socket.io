var mongoose = require('../db.js');
var UsersRoomsSchema=new mongoose.Schema(
{
	name:{type:String,unique:true},
	roomName:{type:String},
	notes:Array

},{collection:'notesUser'});
UsersRoomsSchema.index({name: 1}, {unique: true});
module.exports=mongoose.model('UsersRooms',UsersRoomsSchema);
