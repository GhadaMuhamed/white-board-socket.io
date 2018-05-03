var roomModel = require('../../Models/roomModel.js');
var userModel = require('../../Models/Users.js');
var mongoose = require('../../db.js')
var createRoom = (name,callback) => {
  var db=mongoose.connection;
  db.collections.currentRooms.insert({"roomName" : name,"open":true},function(err){
    callback(err);
  });
}
var isTeacher = (username,callback) => {
  userModel.find({"username" : username},{"type":1},(err,data)=>{
    if (err) throw err;
    if (data.length > 0  && data[0].type)
        callback(true);
    else callback(false);
  })
}
var getRoomData = (room,callback) => {
  roomModel.find({"roomName" : room }, { "board" : 1, "message" : 1 ,"_id":0}, function(err,data){
      if (err) throw err;
      callback(data) ;
  });
}
var addLine = (data , room) => {
  data = {
    "x1" : 1,
      "x2" : 1,
        "y1" : 1,
          "y2" : 1,
            "color" : "white",
            "width" : 10
  };
  roomModel.update({ "roomName": room }, { "$push": { "board": data }}, (err) =>{
    if (err) throw err;
  });
}
var findRoom = (room,callback) => {
  roomModel.find({"roomName" : room},{"open":1},(err,data)=>{
    if (err) throw err;
    if (data.length == 0 || data[0].open == false) callback(false);
    else callback(true);
  })
}
var addRoomToUser = (username,room,callback) => {
  userModel.update({ "username": username }, { "$addToSet": { "rooms": room }}, (err) =>{
    if (err) throw err;
    callback();
  });
}
var closeRoom = (room,callback) => {
  roomModel.findOneAndUpdate({ "roomName": room }, { "$set": { "open": false }}, (err,data) =>{
    if (err) throw err;
    if (data.length == 0)
      callback(true);
    else callback(false);
  });
}
var addMsg = (data, room) => {
  roomModel.update({ "roomName": room }, { "$push": { "message": data }}, (err) =>{
    if (err) throw err;
  });
}
module.exports = {createRoom,getRoomData,addLine,findRoom,addRoomToUser,isTeacher,closeRoom}
