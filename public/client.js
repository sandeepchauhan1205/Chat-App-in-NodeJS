const socket = io();

let name;

let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

// Enter name in prompt (If press close button it reload again)
do {
  name = prompt("Please enter your name ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  // Append Message message_area
  appendMessage(msg, "outgoing");

  textarea.value = "";

  scrollToBottom();

  // Send to Server
  socket.emit("message", msg);
}

// append Message
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;

  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

// Receive message
socket.on("message", (msg) => {
  //   console.log(msg);

  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
