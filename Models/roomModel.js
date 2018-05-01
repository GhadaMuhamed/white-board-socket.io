var mongoose = require('../db.js');
var roomsSchema=new mongoose.Schema({
    roomName : String ,
    Creator : String
},{collection:'currentRooms'});
roomsSchema.index({roomName: 1, Creator: 1}, {unique: true});
module.exports=mongoose.model('currentRooms',roomsSchema);
