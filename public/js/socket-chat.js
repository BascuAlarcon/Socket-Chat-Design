var socket = io();

var params = new URLSearchParams(window.location.search);
if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enterChat', user, function(resp){
        console.log(resp);
    })
}); 

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('createMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// 
socket.on('listPersons', function(mensaje) {

    console.log(mensaje);

});

// private messages
socket.on('privateMessage', function(message) {
    console.log('private message: ', message)
});