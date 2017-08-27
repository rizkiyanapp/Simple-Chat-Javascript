// // VARIABLE
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var socketio = require('socket.io')(http);
var userCount = 0;

// INIT STATIC FILES DIR
app.use(express.static(path.join(__dirname + '/static')));

// SERVER INIT
http.listen(8000, function(){
  console.log('Server running at *:8000');
});

// GET HTML FILES
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/client_page.html'))
});

// GETTING CONNECTION
socketio.on('connection', function(socket){
  userCount += 1;
  if (userCount > 1) {
    console.log(userCount + ' users connected');
  }
  else {
    console.log('a user connected');
  }
  // DISCONNECT
  socket.on('disconnect', function(){
    userCount -= 1;
    if (userCount > 1) {
      console.log(userCount + ' users connected');
    }
    else if (userCount == 1) {
      console.log('a user connected');
    }
    else {
      console.log('no user connected');
    }
  });
  // RECEIVE MESSAGE
  socket.on('message', function(msg){
    socketio.emit('message', msg);
  });
});