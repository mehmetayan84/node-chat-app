var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');
    socket.on('login', function(message) {
       console.log(message);
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(email) {
    console.log('Message is received', JSON.stringify(email));
});
