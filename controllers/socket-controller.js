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
        // Create message and get the creation time
        const createdMessage = await Public_Message.create({
          userId,
          message: msg,
        });

        const messageData = {
          userId,
          message: msg,
          User: user, // Add user info to the message
          createdAt: createdMessage.createdAt, // Get the creation time of the message
        };

        // Emit the message with user info and creation time
        io.emit("new message", messageData);
      } catch (error) {
        next(error);
      }
    });
    socket.on("disconnect", function () {
      console.log("User disconnected");
    });
  });
};
