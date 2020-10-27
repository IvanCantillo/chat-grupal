const socket = io();

let connect = false;
let timeout
let notify = document.getElementById('notify');

let name = document.getElementById('name');
let validations = document.getElementById('validations');
const saveName = document.getElementById('save-name');

let userDataContainer = document.getElementById('user-data-container');
let chatContainer = document.getElementById('chat-container');

const exit = document.getElementById('exit');
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
exit.onclick = () => {
    connect = false;
    socket.emit('chat:disconnect', {
        name: name.value
    });
    userDataContainer.classList.remove('d-none');
    chatContainer.classList.add('d-none');
}
message.onkeyup = () => {
    clearTimeout(timeout);
    socket.emit('chat:typing', {
        name: name.value
    });
    timeout = setTimeout(() => {
        socket.emit('chat:stopTyping');
        clearTimeout(timeout);
    }, 500);
}
FormSendMessage.onsubmit = (e) => {
    e.preventDefault();
    if (!message.value.trim()) {
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
        notify.appendChild(notifySuccess(data.name));
        setTimeout(() => {
            let showNotify = document.getElementById('notify-success');
            notify.removeChild(showNotify);
        }, 4000);
    }
});

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
        console.log(sound);
        document.body.removeChild(sound);
    }, 2000);
});

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<summary style="font-size: 0.8rem;" class="w-50 text"> ${data.name} esta escribiendo... </summary>`;
});

socket.on('chat:stopTyping', () => {
    actions.innerHTML = ``;
});

socket.on('chat:disconnect', (data) => {
    if (connect) {
        notify.appendChild(notifyDanger(data.name));
        setTimeout(() => {
            let showNotify = document.getElementById('notify-danger');
            notify.removeChild(showNotify);
        }, 4000);
    }
});