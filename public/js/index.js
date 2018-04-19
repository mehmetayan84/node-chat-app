var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');
    socket.on('newMessage', function(message) {
       console.log(message);
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('Message is received', JSON.stringify(message));
    $('#messages').append(`<li>${message.from}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function(message){
   $('#messages').append(`<li>${message.from}: <a target="_blank" href=${message.url}>Link</a></li>`);
});

// socket.emit('createMessage', {
//     from: 'Ece',
//     text: 'Hello'
// }, function (data) {
//     console.log('This is acknowledge', data);
// });

$("#message-form").on('submit', function(e) {
    e.preventDefault();
   socket.emit('createMessage', {
       from: 'User',
       text: $('[name=message]').val()
   }, function(data) {
       console.log('Got it', data);
   });
});

var locationButton = $('#location-button');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
           lattitude: position.coords.latitude,
           longitude: position.coords.longitude
        }, function(data) {
            console.log('Got your location', data);
        });
    }, function() {
       alert('We can not fetch your location');
    });
})