// Funtions
function imgToBase64(input, preview, temp) {
  let fReader = new FileReader();
  fReader.readAsDataURL(input.files[0]);
  fReader.onloadend = function (event) {
    preview.style.backgroundImage = `url('${event.target.result}')`;
    temp.value = event.target.result;
  };
}
const convertHours = (hour) => {
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

  return hours[hour];
};
const msgStructure = (name, message = null, img = null, hour, type, person) => {
  let container = document.createElement("div");

  if (type == 1) {
    if (person == 1) {
      container.setAttribute(
        "class",
        "bg-primary w-50 ml-auto p-1 rounded text-white mb-1"
      );
      container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                    ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
    } else {
      container.setAttribute(
        "class",
        "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1"
      );
      container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${name} </strong></summary>
                    ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
    }
  } else if (type == 2) {
    if (person == 1) {
      container.setAttribute(
        "class",
        "bg-primary w-50 ml-auto p-1 rounded text-white mb-1"
      );
      container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
    } else {
      container.setAttribute(
        "class",
        "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1"
      );
      container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> ${name} </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
    }
  } else {
    if (person == 1) {
      container.setAttribute(
        "class",
        "bg-primary w-50 ml-auto p-1 rounded text-white mb-1"
      );
      container.innerHTML = `
                <summary class="text-left" style="font-size: 0.75rem;"><strong> Yo </strong></summary>
                <div class="img-msg-container w-100 p-1">
                    <img src="${img}" class="img-msg w-100 h-100 border rounded" />
                </div>
                ${message}
                <summary class="text-right text" style="font-size: 0.7rem;"> ${hour} </summary>
            `;
    } else {
      container.setAttribute(
        "class",
        "bg-secondary w-50 mr-auto p-1 rounded text-white mb-1"
      );
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
};
const alertValidations = (message, input) => {
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

// Variables
const socket = io();

let connect = false;
let timeout;
let date = new Date();
let notify = document.getElementById("notify");

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
        (exist) => {
          if (exist) {
            userDataContainer.classList.add("d-none");
            chatContainer.classList.remove("d-none");
            connect = true;
          } else {
            alertValidations("El codigo de la sala no existe", roomCode);
          }
        }
      );
    }
  }
};
exit.onclick = () => {
  connect = false;
  socket.emit("chat:disconnect", {
    name: name.value,
    roomCode: roomCode.value,
  });
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
  let validation = fileValidation(selectInput.value);
  if (validation.code == "ok") {
    imgToBase64(selectInput, previewImg, imgTemp);
    previewImg.classList.remove("d-none");
  } else {
    console.log(validation.message);
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
    let hour = "";
    if (date.getHours() >= 12 && date.getMinutes() > 0) {
      hour = `${convertHours(date.getHours())}:${date.getMinutes()} P.M`;
    } else {
      hour = `${convertHours(date.getHours())}:${date.getMinutes()} A.M`;
    }
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
  console.log(data);
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
