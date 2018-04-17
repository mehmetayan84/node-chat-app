const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const http = require('http');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user is connected');

   socket.on('createMessage', (message) => {
       console.log('New message is received\n',JSON.stringify(message, undefined, 2));
   });

    socket.emit('newMessage', {
        from: 'Ece',
        text: 'See you then',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
    });
});

server.listen(port, () => console.log(`Server started on PORT ${port}`));
