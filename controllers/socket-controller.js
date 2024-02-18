const { Public_Message, User } = require("../models");
module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("A user connected");
    const session = socket.request.session;
    const userId = session.passport.user;
    // 接收來自client端的訊息
    socket.on("new message", async (msg) => {
      try {
        // Fetch user info
        const user = await User.findByPk(userId, {
          attributes: ["name", "avatar"],
          raw: true,
        });
        if (!user) throw new Error("User not found.");

        const messageData = {
          userId,
          message: msg,
          User: user, // Add user info to the message
        };

        // Emit the message with user info
        io.emit("new message", messageData);

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
