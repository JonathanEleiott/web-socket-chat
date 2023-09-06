const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user has connected');

  socket.on('message', (msg) => {
    console.log('MESSAGE:', msg);

    io.emit('new message', msg);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));