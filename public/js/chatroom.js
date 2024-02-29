// client-side initialization for socket.io
const socket = io();

// 監聽表單，當表單送出時，取得輸入的訊息，並透過socket.emit()傳送給server端
document
  .getElementById("message-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const message = document.getElementById("message-input").value;

    if (message) {
      socket.emit("new message", message);
      document.getElementById("message-input").value = "";
    }
  });

// 監聽server端傳來的訊息，並顯示在網頁上
socket.on("new message", function (messageData) {
  const messagesList = document.getElementById("messages");
  const newMessageElement = document.createElement("li");
  newMessageElement.classList.add("media", "mb-3");
  newMessageElement.innerHTML = `
    <a href="/users/${messageData.userId}">
      <img src="${messageData.User.avatar}" class="align-self-start mr-3 rounded-circle" alt="User Avatar" style="width: 48px; height: 48px;">
    </a>
    <div class="media-body">
      <div class="mt-0 mb-1">${messageData.User.name}</div>
      <div>${messageData.message}</div>
    </div>
    <small class="text-muted">${messageData.createdAt}</small>
  `;
  messagesList.appendChild(newMessageElement);
  messagesList.scrollTop = messagesList.scrollHeight; // 捲動至最新訊息
});
