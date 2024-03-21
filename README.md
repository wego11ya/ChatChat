# Product Features

Welcome to **Chat Chat**, a simple and fun app that lets you talk to both people and **AI**. Whether you’re looking to make new friends or just have a chat with this smart AI, I've got you covered. Here's what makes Chat Chat special:

- **Chat with AI**: Ever wanted a friend who's always there? My AI chat buddy is ready to chat anytime you are. Ask it about the weather, tell it a joke, or share your thoughts. It's designed to understand you and keep the conversation going.

- **Public Chat Rooms**: Join this chat room for easy chatting. Talk, share ideas, or have fun with others. Open to everyone, it's simple to use and join.

- **Super Easy to Use**: I believe chatting should be straightforward and enjoyable. That's why I made Chat Chat super easy to dive into. No complicated setups, just open the app and start the conversation.

My goal is to keep making Chat Chat better, adding more features that you’ll love. Start chatting today and see how much fun it is!

# Install Locally

1. Install Node.js, npm, nodemon, MySQL
2. Clone this project to your local repository
3. Change directory to project folder
4. Install npm packages `npm install`
5. Create a .env file based on the instruction of .env.example
6. Set your own MySQL setting in config/config.js

   ```js
   development: {
       username: "<user name>",
       password: "<user password>",
       database: "<database name>",
       host: "127.0.0.1",
       dialect: "mysql"
     }
   ```

7. Run migration files and load seed data

   ```
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

8. Run project `npm run dev`
9. You will see this message when the project has been successfully executed

   ```
   App is running on http://localhost:3000
   ```

   Open your web browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action.

# Test Account

### **User1**

Email address : user1@example.com

Password: 12345678

### **User2**

Email address : user2@example.com

Password: 12345678

# Developer

### [Wei Lin](https://www.cakeresume.com/wei-34d4b5-0c4f93)
