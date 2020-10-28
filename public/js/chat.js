// Funtions 
function imgToBase64(input, preview, temp) {
    let fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        preview.style.backgroundImage = `url('${event.target.result}')`;
        temp.value = event.target.result;
    }
}
const convertHours = ( hour ) => {
    const hours = [
        0,1,2,3,4,5,6,7,8,9,10,11,12,
        1,2,3,4,5,6,7,8,9,10,11,12
    ];

    return hours[hour];
}
const msgStructure = ( name, message = null, img = null, hour, type, person ) => {

    let container = document.createElement("div");

    if( type == 1 ){
        if( person == 1 ){
            container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                    ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }else {
            container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${name} </strong></summary>
                    ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }
    }else if( type == 2 ) {
        if( person == 1 ){
            container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }else {
            container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${name} </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }
    }else {
        if( person == 1 ){
            container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }else {
            container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
            container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${name} </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
        }
    }
    
    return container;
}

// Variables
const socket = io();

let connect = false;
let timeout;
let date = new Date();
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

let previewImg = document.getElementById('preview-img');
let imgTemp = document.getElementById('img-temp');
const btnClosePreviewImg = document.getElementById('btn-close-preview-img');
const selectInput = document.getElementById('select-img');

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
selectInput.onchange = () => {
    let validation = fileValidation(selectInput.value);
    if (validation.code == 'ok') {
        imgToBase64(selectInput, previewImg, imgTemp);
        previewImg.classList.remove('d-none');
    } else {
        console.log(validation.message);
    }
}
btnClosePreviewImg.onclick = () => {
    previewImg.classList.add('d-none');
    previewImg.style.backgroundImage = '';
    selectInput.value = '';
}

FormSendMessage.onsubmit = (e) => {
    e.preventDefault();
    if (!message.value.trim() && !selectInput.value.trim()) {
        console.log('los 2 vacios');
        return
    }else {
        let hour = '';
        if( date.getHours() >= 12 && date.getMinutes() > 0 ){
            hour = `${ convertHours( date.getHours() ) }:${ date.getMinutes() } P.M`;
        }else{
            hour = `${ convertHours( date.getHours() ) }:${ date.getMinutes() } A.M`;
        }
        if (!selectInput.value) {
            socket.emit('chat:message', {
                name: name.value.trim(),
                message: message.value.trim(),
                hour: hour,
                id: socket.id,
                type: 1
            });
        } else if( !message.value.trim() ) {
            socket.emit('chat:message', {
                name: name.value.trim(),
                img: imgTemp.value,
                hour: hour,
                id: socket.id,
                type: 2
            });
            previewImg.classList.add('d-none');
        }else {
            socket.emit('chat:message', {
                name: name.value.trim(),
                message: message.value.trim(),
                img: imgTemp.value,
                hour: hour,
                id: socket.id,
                type: 3
            });
            previewImg.classList.add('d-none');
        }
        message.value = '';
        imgTemp.value = '';
        selectInput.value = '';
    }
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
        messageContainer.appendChild( msgStructure( data.name, (data.message != undefined) ? data.message : null , (data.img != undefined) ? data.img : null, data.hour, data.type, 1 ) );
    } else {
        messageContainer.appendChild( msgStructure( data.name, (data.message != undefined) ? data.message : null , (data.img != undefined) ? data.img : null, data.hour, data.type, 2 ) );
    }
    // console.log( data );
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