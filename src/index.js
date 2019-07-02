const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://instagran:24862486@cluster0-2keac.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'))

server.listen(3333, () => console.log('Up'));
