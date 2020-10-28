const express = require('express');
const path = require('path');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

// WebSocket
const SoketIO = require('socket.io');
const io = SoketIO(server);

io.on('connection', (socket) => {

    socket.on('chat:connect', (data) => {
        console.log(`New connection ${data.id}`);
        socket.broadcast.emit('chat:connect', data);
    });

    socket.on('chat:typing', (data) => {
        console.log(data);
        socket.broadcast.emit('chat:typing', data);
    });

    socket.on('chat:stopTyping', () => {
        console.log('stop');
        socket.broadcast.emit('chat:stopTyping');
    });

    socket.on('chat:message', (data) => {
        if( data.type == 1 ){
            io.sockets.emit('chat:message', {
                name: data.name,
                message: data.message,
                hour: data.hour,
                id: data.id,
                type: 1
            });
            console.log(data.name, data.message, data.hour, data.type);
        }else if ( data.type == 2 ){
            io.sockets.emit('chat:message', {
                name: data.name,
                img: data.img,
                hour: data.hour,
                id: data.id,
                type: 2
            });
            console.log(data.name, data.hour, data.type);
        }else {
            io.sockets.emit('chat:message', data);
        }
        socket.broadcast.emit('chat:newMessage');
    });

    socket.on('chat:disconnect', (data) => {
        socket.broadcast.emit('chat:disconnect', data);
    })
});