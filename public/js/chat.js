var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {

        }
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
    scrollToBottom();
    // $('#messages').append(`<li>${message.from} ${formattedTime}: ${message.text}</li>`);
});

socket.on('updateUserList', function(list) {
   var ol = $('<ol>></ol>');

   list.forEach((user) => {
      ol.append($('<li></li>').text(user));
   });

   $('#users').html(ol);
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
    scrollToBottom();
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