// Funtions
function imgToBase64(input, preview, temp) {
  let fReader = new FileReader();
  fReader.readAsDataURL(input.files[0]);
  fReader.onloadend = function (event) {
    preview.style.backgroundImage = `url('${event.target.result}')`;
    temp.value = event.target.result;
  };
}
const convertHours = (hour, minutes) => {
  const hours = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ];
  let newHour = "";

  if (hour >= 12 && minutes > 0) {
    if (minutes < 10) {
      newHour = `${hours[hour]}:0${minutes} P.M`;
    } else {
      newHour = `${hours[hour]}:${minutes} P.M`;
    }
  } else {
    if (minutes < 10) {
      newHour = `${hours[hour]}:0${minutes} A.M`;
    } else {
      newHour = `${hours[hour]}:${minutes} A.M`;
    }
  }
  return newHour;
};
const msgStructure = (name, message = null, img = null, hour, type, person) => {
  let container = document.createElement("div");
  let personName = document.createElement("summary");
  let imageContainer = document.createElement("div");
  let image = document.createElement('img');
  let text = document.createElement("div"); 
  let messageTime = document.createElement("summary");

  if (type == 1) {
    if (person == 1) {
      container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> Yo </strong>`;
      text.innerText = message;
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( text );
      container.appendChild( messageTime );
    } else {
      container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> ${name} </strong>`;
      text.innerText = message;
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( text );
      container.appendChild( messageTime );
    }
  } else if (type == 2) {
    if (person == 1) {
      container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> Yo </strong>`;
      imageContainer.setAttribute("class", "img-msg-container w-100 p-1");
      image.setAttribute("class", "img-msg w-100 h-100 border rounded");
      image.setAttribute("src", `${img}`);
      image.setAttribute("onclick", "modalImg( this )");
      image.setAttribute("data-toggle", "modal");
      image.setAttribute("data-target", "#show-img-modal");
      image.style.cursor = 'pointer';
      imageContainer.appendChild( image );
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( imageContainer );
      container.appendChild( messageTime );
    } else {
      container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> ${name} </strong>`;
      imageContainer.setAttribute("class", "img-msg-container w-100 p-1");
      image.setAttribute("class", "img-msg w-100 h-100 border rounded");
      image.setAttribute("src", `${img}`);
      image.setAttribute("onclick", "modalImg( this )");
      image.setAttribute("data-toggle", "modal");
      image.setAttribute("data-target", "#show-img-modal");
      image.style.cursor = 'pointer';
      imageContainer.appendChild( image );
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( imageContainer );
      container.appendChild( messageTime );
    }
  } else {
    if (person == 1) {
      container.setAttribute("class", "bg-primary w-50 ml-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> Yo </strong>`;
      text.innerText = message;
      imageContainer.setAttribute("class", "img-msg-container w-100 p-1");
      image.setAttribute("class", "img-msg w-100 h-100 border rounded");
      image.setAttribute("src", `${img}`);
      image.setAttribute("onclick", "modalImg( this )");
      image.setAttribute("data-toggle", "modal");
      image.setAttribute("data-target", "#show-img-modal");
      image.style.cursor = 'pointer';
      imageContainer.appendChild( image );
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( imageContainer );
      container.appendChild( text );
      container.appendChild( messageTime );
    } else {
      container.setAttribute("class", "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1");
      personName.setAttribute("class", "text-left");
      personName.style.fontSize = "0.75rem";
      personName.innerHTML = `<strong> ${name} </strong>`;
      text.innerText = message;
      imageContainer.setAttribute("class", "img-msg-container w-100 p-1");
      image.setAttribute("class", "img-msg w-100 h-100 border rounded");
      image.setAttribute("src", `${img}`);
      image.setAttribute("onclick", "modalImg( this )");
      image.setAttribute("data-toggle", "modal");
      image.setAttribute("data-target", "#show-img-modal");
      image.style.cursor = 'pointer';
      imageContainer.appendChild( image );
      messageTime.setAttribute("class", "text-right text");
      messageTime.style.fontSize = "0.7rem";
      messageTime.innerText = hour;
      container.appendChild( personName );
      container.appendChild( imageContainer );
      container.appendChild( text );
      container.appendChild( messageTime );
    }
  }

  return container;
};
const alertValidations = (message, input = null, validation = 'login') => {
  if( validation == 'login' ) {
    validations.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>¡Advertencia!</strong> ${message}
        </div>
    `;

    input.value = "";
    input.focus();

    setTimeout(() => {
      validations.innerHTML = "";
    }, 2500);
  }else if ( validation == 'img-invalid' ){
    let container = document.createElement("div");
    let invalidImgAlert = document.getElementById('invalid-img-alert');

    container.setAttribute("class", "alert alert-warning alert-dismissible fade show img-alert w-75 mx-auto");
    container.setAttribute("role", "alert");
    container.innerHTML = message;
    invalidImgAlert.appendChild( container );
    previewImg.classList.add("d-none");
    previewImg.style.backgroundImage = "";
    selectInput.value = '';
    setTimeout(() => {
      invalidImgAlert.removeChild(container);
    }, 2500);
  }
};
const randomCode = (name) => {
  let code = Math.round(Math.random() * 1000000);
  socket.emit(
    "room:newRoom",
    {
      roomCode: code,
      roomName: name,
    },
    (exist) => {
      if (exist) {
        randomCode();
      }
    }
  );
  return code;
};
const userDisconect = () => {
  if( connect ){
    connect = false;
    socket.emit("chat:disconnect", {
      name: name.value,
      roomCode: roomCode.value,
    });
    return 'hola';
  }
}
const modalImg = ( item ) => {
  let showImg = document.getElementById('show-img');
  showImg.setAttribute("src", item.src);
}

// Variables
const socket = io();

let connect = false;
let timeout;
let date = new Date();
let notify = document.getElementById("notify");
let modalMessageImg = document.getElementById("modal-message-img");

let name = document.getElementById("name");
const roomName = document.getElementById("room-name");
const roomCode = document.getElementById("room-code");
const newRoom = document.getElementById("new-room");
let validations = document.getElementById("validations");
const login = document.getElementById("login");

let userDataContainer = document.getElementById("user-data-container");
let chatContainer = document.getElementById("chat-container");

let chatName = document.getElementById("chat-name");
const exit = document.getElementById("exit");
let actions = document.getElementById("actions");

let messageContainer = document.getElementById("message-container");
const message = document.getElementById("message");

let previewImg = document.getElementById("preview-img");
let imgTemp = document.getElementById("img-temp");
const btnClosePreviewImg = document.getElementById("btn-close-preview-img");
const selectInput = document.getElementById("select-img");

const FormSendMessage = document.getElementById("form-send-message");

// Methods
window.onbeforeunload = () => {
  if(connect){
    return true;
  }
};

newRoom.onchange = () => {
  let roomNameContainer = document.getElementById("room-name-container");
  let roomCodeContainer = document.getElementById("room-code-container");
  roomCode.value = "";
  if (newRoom.checked) {
    roomNameContainer.classList.remove("d-none");
    roomCodeContainer.classList.add("d-none");
    roomCode.readOnly = true;
  } else {
    roomNameContainer.classList.add("d-none");
    roomCodeContainer.classList.remove("d-none");
    roomCode.value = "";
    roomCode.readOnly = false;
  }
};
login.onclick = () => {
  if (!name.value.trim()) {
    alertValidations("El nombre es obligatorio", name);
  } else if (newRoom.checked && !roomName.value.trim()) {
    alertValidations("El nombre de la sala es obligatorio", roomName);
  } else if (!newRoom.checked && !roomCode.value.trim()) {
    alertValidations("El codigo de la sala es obligatorio", roomCode);
  } else {
    if (newRoom.checked) {
      roomCode.value = randomCode(roomName.value);
    }
    if (roomCode.value.trim()) {
      socket.emit(
        "chat:connect",
        {
          name: name.value,
          roomCode: roomCode.value,
          id: socket.id,
        },
        (room, user) => {
          if (room) {
            if (!user) {
              userDataContainer.classList.add("d-none");
              chatContainer.classList.remove("d-none");
              connect = true;
            } else {
              alertValidations("Ya hay un usuario con ese nombre", name);
            }
          } else {
            alertValidations("El codigo de la sala no existe", roomCode);
          }
        }
      );
    }
  }
};
exit.onclick = () => {
  userDisconect
  location.reload();
};

message.onkeyup = () => {
  clearTimeout(timeout);
  socket.emit("chat:typing", {
    name: name.value,
    roomCode: roomCode.value,
  });
  timeout = setTimeout(() => {
    socket.emit("chat:stopTyping", { roomCode: roomCode.value });
    clearTimeout(timeout);
  }, 500);
};
selectInput.onchange = () => {
  let validation = fileValidation(selectInput);
  if (validation.code == "ok") {
    imgToBase64(selectInput, previewImg, imgTemp);
    previewImg.classList.remove("d-none");
  } else {
    alertValidations( validation.message, null, 'img-invalid' );
    // console.log( validation.message );
  }
};
btnClosePreviewImg.onclick = () => {
  previewImg.classList.add("d-none");
  previewImg.style.backgroundImage = "";
  selectInput.value = "";
};

FormSendMessage.onsubmit = (e) => {
  e.preventDefault();
  if (!message.value.trim() && !selectInput.value.trim()) {
    console.log("los 2 vacios");
    return;
  } else {
    let hour = convertHours(date.getHours(), date.getMinutes());

    if (!selectInput.value) {
      socket.emit("chat:message", {
        name: name.value.trim(),
        message: message.value.trim(),
        hour: hour,
        id: socket.id,
        roomCode: roomCode.value,
        type: 1,
      });
    } else if (!message.value.trim()) {
      loading(true);
      socket.emit("chat:message", {
        name: name.value.trim(),
        img: imgTemp.value,
        hour: hour,
        id: socket.id,
        roomCode: roomCode.value,
        type: 2,
      });
      previewImg.classList.add("d-none");
    } else {
      loading(true);
      socket.emit("chat:message", {
        name: name.value.trim(),
        message: message.value.trim(),
        img: imgTemp.value,
        hour: hour,
        id: socket.id,
        roomCode: roomCode.value,
        type: 3,
      });
      previewImg.classList.add("d-none");
    }
    message.value = "";
    imgTemp.value = "";
    selectInput.value = "";
  }
};

// Listening
socket.on("chat:connect", (data) => {
  if (connect) {
    notify.appendChild(notifySuccess(data.name));
    setTimeout(() => {
      let showNotify = document.getElementById("notify-success");
      notify.removeChild(showNotify);
    }, 4000);
  }
});

socket.on("room:newRoom", (data) => {
  // console.log(data);
  let code = document.getElementById("code");
  chatName.innerText = data.roomName;
  code.innerText = `Chat: ${data.roomCode}`;
});

socket.on("chat:message", (data) => {
  if (data.id == socket.id) {
    messageContainer.appendChild(
      msgStructure(
        data.name,
        data.message != undefined ? data.message : null,
        data.img != undefined ? data.img : null,
        data.hour,
        data.type,
        1
      )
    );
    loading( false );
  } else {
    messageContainer.appendChild(
      msgStructure(
        data.name,
        data.message != undefined ? data.message : null,
        data.img != undefined ? data.img : null,
        data.hour,
        data.type,
        2
      )
    );
  }
  // console.log( data );
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on("chat:newMessage", () => {
  let sound = document.createElement("iframe");
  sound.setAttribute("src", "./assets/notify.mp3");
  sound.setAttribute("class", "d-none");
  sound.setAttribute("id", "sound");
  document.body.appendChild(sound);
  setTimeout(() => {
    let sound = document.getElementById("sound");
    document.body.removeChild(sound);
  }, 2000);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<summary style="font-size: 0.8rem;" class="w-50 text"> ${data.name} esta escribiendo... </summary>`;
});

socket.on("chat:stopTyping", (data) => {
  actions.innerHTML = ``;
});

socket.on("chat:disconnect", (data) => {
  if (connect) {
    notify.appendChild(notifyDanger(data.name));
    setTimeout(() => {
      let showNotify = document.getElementById("notify-danger");
      notify.removeChild(showNotify);
    }, 4000);
  }
});
