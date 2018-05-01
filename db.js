var mongoose=require('mongoose');
var config=require('./config.js');
var options = {};
options.server = { auto_reconnect: true, poolSize: 5, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }, reconnectTries: 3000 };
mongoose.connect(config.db);
mongoose.set('debug',true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected!")
});
module.exports = mongoose ;
