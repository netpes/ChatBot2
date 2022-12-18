const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 2000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./views/user");
const multer = require("multer");
const forms = multer();
const { getAllUsersData } = require("./controllers/server_actions");
const {
  updateChat,
  getChatData,
  convertSender,
} = require("./controllers/chatController");
const dateantime = require("date-and-time");

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(forms.array());
app.use(cors({ origin: " http://localhost:3000" }));
app.use("/", users);

// mongo connection
const url =
  "mongodb+srv://netpes:netpes@cluster0.cnxmrap.mongodb.net/?retryWrites=true&w=majority";
mongoose?.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose?.connection.on("connected", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.sendFile("../src/components/userChat.js");
  console.log("this is true");
});

//SOCKET-IO:

//socket reacting to connection/disconnection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

let messageCheck = "";
io.on("connection", (socket) => {
  const date = dateantime.format(new Date(), "DD/MM/YYYY");
  const time = dateantime.format(new Date(), "HH:mm");
  let sender = "";

  socket.on("chat message", (msg, room, senderId, admin) => {
    console.log("this is room" + room);
    if (msg === messageCheck) return console.log("stopped");
    if (!room) return false;
    if (room) {
      io.to(room).emit("chat message{", msg, senderId);
      console.log(senderId, "the id of the sender");
      if (!senderId) {
        sender = "anon";
      } else {
        convertSender(senderId).then((id) => {
          sender = id.name;
        });
      }
      const message = [
        { sender: sender, message: msg, time: time, date: date },
      ];

      updateChat(msg, room, sender, admin, time, date).then(() => {
        getChatData(room).then((chats) => {
          if (chats) {
            Array.prototype.push.apply(chats, message);
            console.log(chats);
            //force everyone on the server to get send-chat
            socket.to(room).emit("send-chats", chats);
            console.log(true);
          } else {
            socket.to(room).emit("send-chats", message);
            console.log(false);
          }
        });
      });

      messageCheck = msg;
    }
  });
  //join a room
  socket.on("join-room", (room) => {
    if (room) {
      socket.join(room);
      console.log("this is the part of  my " + room);
      getChatData(room)
        .then((chats) => {
          if (chats) {
            socket.emit("send-chats", chats);
          } else {
            socket.emit("send-chats", "");
          }
        })
        .catch((err) => {
          console.log(`error ${err} in chats`);
        });
      socket.emit("message room", room);
    }
  });

  //get all the usersId
  getAllUsersData()
    .then((list) => {
      console.log(list);
      socket.emit("chat-list", list);
    })
    .catch((err) => {
      console.log(err + "in chats");
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
