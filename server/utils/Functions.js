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
module.exports = {isFound,createRoom}
