var mongoose = require('../db.js');
var roomsSchema=new mongoose.Schema({
    roomName :{type:String,unique:true},
    open : Boolean,
    board : [{ x1: Number , x2 : Number , y1 : Number , y2: Number , color : String , width : Number}],
    message : [from :String , msg: String]
},{collection:'currentRooms'});
roomsSchema.index({roomName: 1}, {unique: true});
module.exports=mongoose.model('currentRooms',roomsSchema);
