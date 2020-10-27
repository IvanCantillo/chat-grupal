const socket = io();
let connect = false;
let timeout

let name = document.getElementById('name');
let validations = document.getElementById('validations');
const saveName = document.getElementById('save-name');

let userDataContainer = document.getElementById('user-data-container');
let chatContainer = document.getElementById('chat-container');

const rename = document.getElementById('rename');
let actions = document.getElementById('actions');

let messageContainer = document.getElementById('message-container');
const message = document.getElementById('message');
const FormSendMessage = document.getElementById('form-send-message');

// Methods
saveName.onclick = () => {
    if (!name.value.trim()) {
        validations.innerText = 'El nombre es obligatorio'
        setTimeout(() => {
            validations.innerText = '';
        }, 2500);
    } else {
        userDataContainer.classList.add('d-none');
        chatContainer.classList.remove('d-none');
        socket.emit('chat:connect', {
            name: name.value,
            id: socket.id
        });
        connect = true;
    }
}
rename.onclick = () => {
    userDataContainer.classList.remove('d-none');
    chatContainer.classList.add('d-none');
}
message.onkeypress = () => {
    clearTimeout(timeout);
    socket.emit('chat:typing', {
        name: name.value
    });
    timeout = setTimeout(() => {
        socket.emit('chat:stopTyping');
        clearTimeout(timeout);
    }, 600);
}
FormSendMessage.onsubmit = ( e ) => {
    e.preventDefault();
    if( !message.value.trim() ){
        return
    }
    socket.emit('chat:message', {
        name: name.value.trim(),
        message: message.value.trim(),
        id: socket.id
    });
    message.value = '';
}

// Listening
socket.on('chat:connect', (data) => {
    if (connect) {
        alertify.set('notifier', 'delay', 2.5);
        alertify.set('notifier', 'position', 'top-right');
        alertify.notify(`${data.name} se ha conectado!`, 'success', 5, function () { console.log('dismissed'); });
    }
})

socket.on('chat:message', (data) => {  
    if (data.id == socket.id) {
        messageContainer.innerHTML += `
            <div class="bg-primary w-50 ml-auto p-1 rounded text-white mb-1">
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                ${data.message}
                <summary class="text-right text" style="font-size: 0.7rem;"> 12:50 P.M </summary>
            </div>
        `;
    } else {
        messageContainer.innerHTML += `
            <div class="bg-secondary w-50 mr-auto p-1 rounded text-white mb-1">
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${data.name} </strong></summary>
                ${data.message}
                <summary class="text-right text" style="font-size: 0.7rem;"> 12:50 P.M </summary>
            </div>
        `;
    }
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('chat:newMessage', () => {
    let sound = document.createElement('iframe');
    sound.setAttribute("src", "./assets/notify.mp3");
    sound.setAttribute("class", "d-none");
    sound.setAttribute("id", "sound");
    document.body.appendChild(sound);
    setTimeout(() => {
        let sound = document.getElementById('sound');
        console.log( sound );
        document.body.removeChild( sound );
    }, 1000);
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<summary style="font-size: 0.8rem;" class="w-50 text"> ${data.name} esta escribiendo... </summary>`;
})

socket.on('chat:stopTyping', (data) => {
    actions.innerHTML = ``;
})
