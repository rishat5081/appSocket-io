var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

//getting the files
app.get('/', function(req,res)
{
  res.sendFile(__dirname +'/index.html');
});

//getting the server overhere
  http.listen(4000,function(){
  console.log("Connected ");
});

//here is the connection for the socket

// this is for th successful connection
io.on('connection' ,function(socket){
  console.log('connection with the socket is done');

// this is for the connection is losed
  socket.on('disconnect',function(){
    console.log('disconnected from the socket ');
  });

// this is for the listening from the HTMl file ....
  socket.on('Socket Created',function(data){
    //this is for the replying for the listening to the HTML file
    socket.broadcast.emit('Socket Created',(data))
  });

// this is for the chat messages to be send to the other user and it is listening from the HTML file
  socket.on('chat-message', function(data){
    // this is the reply for the chat message to be displayed on the next user profile
    socket.broadcast.emit('chat-message',(data))
});

// this is for the user starts typing in the EDIT FIELD and it is the listening for the HTML file

socket.on ('typing', function(data){

//this is for the user is typing anything in the field and it is the response from the  server
socket.broadcast.emit('typing',(data));
});

// this is the part where the user is not typing and it is the listening part from th HTML files
socket.on('notTyping', function(data)
{
  // this is the repsonse from the server that user is not typing in the field
    socket.broadcast.emit('notTyping',(data));
})

});
