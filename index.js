const express = require('express');
const path = require('path');
const app = express();
const imageToBase64 = require('image-to-base64');

// Settings
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${ app.get('port') }`);
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
        console.log(data);
        if (data.type == 'img') {
            let img = '';
            imageToBase64(`${data.message}`)
                .then((response) => { img = response; })
                .catch((error) => { console.log(error); });
            io.sockets.emit('chat:message', {
                name: data.name,
                message: img,
                id: data.id,
                type: data.type
            });
        } else {
            io.sockets.emit('chat:message', data);
        }
        socket.broadcast.emit('chat:newMessage');
    });

    socket.on('chat:disconnect', (data) => {
        socket.broadcast.emit('chat:disconnect', data);
    })
});