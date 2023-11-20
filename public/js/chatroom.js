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
socket.on("new message", function (msg) {
  const item = document.createElement("li");
  item.textContent = msg;
  document.getElementById("messages").appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
