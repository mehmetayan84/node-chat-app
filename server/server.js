const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {isRealString} = require('./utils/validation');
var {generateMessage, generateLocationMessage} = require('./utils/message');
var {Users} = require('./utils/users');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var users = new Users();

io.on('connection', (socket) => {
   console.log('New user is connected');

   socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
          return callback('Name and room is required to join');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} is joined`));

      callback();
   });

   socket.on('createMessage', (message, callback) => {
       var user = users.getUser(socket.id);
       if(user && isRealString(message.text)) {
           io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
       }
       callback();
       // socket.broadcast.emit('newMessage', {
       //     from: message.from,
       //     text: message.text,
       //     createdAt: new Date().getTime()
       // });
   });

   socket.on('createLocationMessage', (message, callback) => {
      var user = users.getUser(socket.id);
      if(user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
      }
      callback();
   });

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });
});

server.listen(port, () => console.log(`Server started on PORT ${port}`));
