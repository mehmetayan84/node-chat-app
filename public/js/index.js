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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('Message is received', JSON.stringify(message));
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    // $('#messages').append(`<li>${message.from} ${formattedTime}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
       url: message.url,
       from: message.from,
       createdAt: formattedTime
    });
    $('#messages').append(html);
   // $('#messages').append(`<li>${message.from} ${formattedTime}: <a target="_blank" href=${message.url}>My Location</a></li>`);
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
   }, function() {
       $('[name=message]').val('');
   });
});

var locationButton = $('#location-button');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Your browser does not support geolocation');
    }
    locationButton.attr('disabled', true).text('Sending Location');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        }, function() {
            console.log('Got your location');
        });
    }, function() {
       alert('We can not fetch your location');
       locationButton.removeAttr('disabled').text('Send Location');
    });
});