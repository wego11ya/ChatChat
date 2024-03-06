const { User, Public_Message } = require("../models");
const { getUser } = require("../helpers/auth-helpers");
const chatController = {
  getPublicChatroom: async (req, res, next) => {
    try {
      const publicMessages = await Public_Message.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: User,
            attributes: ["name", "avatar"],
          },
        ],
      });

      const currentUser = await User.findByPk(getUser(req).id, {
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (!currentUser) throw new Error("User not found.");
      return res.render("public-chatroom", { currentUser, publicMessages });
    } catch (error) {
      next(error);
    }
  },
  getAIChat: (req, res) => res.render("ai-chat"),
  getPrivateMessages: (req, res) => res.render("private-messages"),
};
module.exports = chatController;
