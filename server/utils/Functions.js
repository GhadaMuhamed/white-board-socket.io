var roomModel = require('../../Models/roomModel.js');
var userModel = require('../../Models/Users.js');
var mongoose = require('../../db.js')
var isFound = (params) => {
  roomModel.find({"roomName" : params.name , "Creator" : params.room},function(err,data){
      if (err) throw err;
      if (data.length == 0)  return false;
      else return true;
  });
}
var createRoom = (params,callback) => {
  var db=mongoose.connection;
  db.collections.currentRooms.insert({"roomName" : params.name , "Creator" : params.room},function(err){
    if (err) throw err;
    callback();
  });
}
var isTeacher = (user,callback) => {
  userModel.find({"username" : user},{"type":1},(err,data)=>{
    if (data.length > 0  && data[0].type)
        callback(true);
    else callback(false);
  })
}
var getRoomData = (room,callback) => {
  roomModel.find({"roomName" : room }, { "board" : 1,"_id":0}, function(err,data){
      if (err) throw err;
      callback(data) ;
  });
}
var addLine = (data , room) => {
  room = "math";
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
var addRoomToUser = (user,room,callback) => {
  userModel.update({ "username": user }, { "$addToSet": { "rooms": room }}, (err) =>{
    if (err) throw err;
    callback();
  });
}
module.exports = {isFound,createRoom,getRoomData,addLine,findRoom,addRoomToUser}
