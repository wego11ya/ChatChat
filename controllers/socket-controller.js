module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("A user connected");
    // 接收來自client端的訊息
    socket.on("new message", function (msg) {
      io.emit("new message", msg); // 廣播消息給所有連接的用戶
    });

    socket.on("disconnect", function () {
      console.log("User disconnected");
    });
  });
};
