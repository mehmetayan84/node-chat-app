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

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
    });
});



server.listen(port, () => console.log(`Server started on PORT ${port}`));
