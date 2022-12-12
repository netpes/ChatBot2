const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 2000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const users = require('./views/user')
const multer = require('multer');
const forms = multer();
const {getAllUsers} = require('./controllers/server_actions')
const {updateChat} = require("./controllers/chatController");


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(cors({origin:' http://localhost:3000'}))

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(forms.array());

// mongo connection
const url = 'mongodb+srv://netpes:netpes@cluster0.cnxmrap.mongodb.net/?retryWrites=true&w=majority';
mongoose?.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

mongoose?.connection.on('connected', () => {
    console.log("connected")
})


app.use('/', users)
app.get('/', (req, res) => {
    res.sendFile('../src/components/userChat.js');
    console.log('this is true')
});





//reacting to connection/disconnection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//getting the message from the form and print it
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {

        console.log('message: ' + msg );
    });
});
let messageCheck = "";
// send to anyone:
io.on('connection', (socket) => {

  socket.on('chat message', (msg, room, datatoSave, userId) => {
      updateChat(datatoSave, userId)
      if(msg === messageCheck){
          console.log("stopped")
      } else {
          if (!room) {
              socket.broadcast.emit('chat message', msg);
          } else {
              socket.to(room).emit('chat message', msg)
          }
          messageCheck = msg;
      }
  });
    socket.on("join-room",(room) => {
        if (room) {
            socket.join(room)
            // const list = io.sockets.adapter.rooms;
            socket.emit('chat message', `joined ${room}`);
            console.log(`room ${room}`)

        }
    })

        getAllUsers().then((list) => {
            socket.emit("chat-list",list)
        }).catch((err)=> {
            console.log(err + "in chats")
        })


});



// if you want to send the message to everybody
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         socket.broadcast.emit('chat message', msg);
//     });
// })

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});