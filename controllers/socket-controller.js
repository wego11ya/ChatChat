const { Public_Message } = require("../models");
module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("A user connected");
    const session = socket.request.session;
    const userId = session.passport.user;
    // 接收來自client端的訊息
    socket.on("new message", async (msg) => {
      try {
        io.emit("new message", msg); // 廣播消息給所有連接的用戶
        await Public_Message.create({
          userId,
          message: msg,
        });
      } catch (error) {
        next(error);
      }
    });
    socket.on("disconnect", function () {
      console.log("User disconnected");
    });
  });
};
