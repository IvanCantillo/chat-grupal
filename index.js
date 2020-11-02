const express = require('express');
const path = require('path');
const app = express();
let allRooms = {};

// Settings
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

// Funtions
const searchRoom = ( code ) => {
    let arrayIndex = Object.keys( allRooms );
    return arrayIndex.includes( code );
}

const searchUser = ( room, user ) => {
    return allRooms[room].users.includes( user );
}

// WebSocket
const SoketIO = require('socket.io');
const io = SoketIO(server);

io.on('connection', (socket) => {

    socket.on('room:newRoom', (data, callback) => {
        let existRoomCode = searchRoom( data.roomCode );
        console.log( existRoomCode );
        if( !existRoomCode ){
            allRooms[data.roomCode] = {
                roomName: data.roomName,
                users: []
            };
            console.log( allRooms );
        }
        callback( existRoomCode );
    });

    socket.on('chat:connect', (data, callback) => {
        let existRoomCode = searchRoom( data.roomCode );
        let existUser = false;
    
        if( existRoomCode ){
            existUser = searchUser( data.roomCode, data.name );
            if( existUser ){
                callback( true, true );
            }else{
                socket.join( data.roomCode );
                
                allRooms[data.roomCode].users.push(`${data.name}`);
                console.log(`New user connect in room: ${ data.roomCode }, users in the room ${ allRooms[data.roomCode].users }`);

                socket.broadcast.to( data.roomCode ).emit('chat:connect', data);
                io.to( data.roomCode ).emit('room:newRoom', {
                    roomName: allRooms[data.roomCode].roomName, 
                    roomCode: data.roomCode
                });
                callback( true, false );
            }
        }else {
            callback( false, false );
        }
    });

    socket.on('chat:typing', (data) => {
        console.log(data);
        socket.broadcast.to( data.roomCode ).emit('chat:typing', data);
    });

    socket.on('chat:stopTyping', (data) => {
        console.log('stop');
        socket.broadcast.to( data.roomCode ).emit('chat:stopTyping');
    });

    socket.on('chat:message', (data) => {
        if( data.type == 1 ){
            io.to( data.roomCode ).emit('chat:message', {
                name: data.name,
                message: data.message,
                hour: data.hour,
                id: data.id,
                type: 1
            });
            console.log(data.name, data.message, data.hour, data.type);
        }else if ( data.type == 2 ){
            io.to( data.roomCode ).emit('chat:message', {
                name: data.name,
                img: data.img,
                hour: data.hour,
                id: data.id,
                type: 2
            });
            console.log(data.name, data.hour, data.type);
        }else {
            io.to( data.roomCode ).emit('chat:message', data);
        }
        socket.broadcast.to( data.roomCode ).emit('chat:newMessage');
    });

    socket.on('chat:disconnect', (data) => {
        let index = allRooms[data.roomCode].users.indexOf( `${ data.name }` );
        allRooms[data.roomCode].users.splice( index, 1 );
        console.log( allRooms[data.roomCode].users );
        socket.broadcast.to(data.roomCode).emit('chat:disconnect', data);
    })
});