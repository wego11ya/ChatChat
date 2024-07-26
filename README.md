# Introduction

Welcome to **Chat Chat**, a simple and efficient multi-user real-time chat application. This full-stack project leverages WebSocket technology to enable real-time messaging, ensuring seamless and instantaneous communication. All chat messages are stored in a relational database for persistence and reliability.

My goal is to continuously improve Chat Chat by adding more features and enhancements that will make your chatting experience even better. Start using Chat Chat today and enjoy effortless real-time communication!

# WebSocket Chat Application Architecture

The diagram below illustrates the architecture of my WebSocket chat application.

![WebSocket Chat Application Architecture](public/images/WebSocket%20Chat%20Application%20Architecture.png)

1. `chat-controller` queries the database for historical messages.
2. `chat-controller` responds to HTTP GET requests and returns the chat room page.
3. The front-end loads the page and sets up event listeners.
4. When a user sends a message, the front-end sends it to the back-end via `socket.emit()`.
5. `socket-controller` writes the message to the database.
6. `socket-controller` sends the message (including the `createdAt` timestamp) to the front-end.
7. The front-end receives the new message and updates the chat room display via DOM manipulation.

# Demo

![ChatChat Demo](public/images/ChatChat%20Demo.gif)

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
