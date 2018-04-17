var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');

    socket.emit('createMessage', {
       from: 'ece@example.com',
       text: 'Hey there, it is Ece'
    });

});
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(email) {
    console.log('Message is received', JSON.stringify(email));
});
