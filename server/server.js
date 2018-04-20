const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const http = require('http');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user is connected');

   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user logged in'));

   socket.on('createMessage', (message, callback) => {
       io.emit('newMessage', generateMessage(message.from, message.text));
       callback();
       // socket.broadcast.emit('newMessage', {
       //     from: message.from,
       //     text: message.text,
       //     createdAt: new Date().getTime()
       // });
   });

   socket.on('createLocationMessage', (message, callback) => {
      io.emit('newLocationMessage',generateLocationMessage('Admin', message.latitude, message.longitude));
      callback();
   });

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
    });
});

server.listen(port, () => console.log(`Server started on PORT ${port}`));
