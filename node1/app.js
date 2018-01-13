'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const SOCKET_IO_CHANNEL = 'message1';
const NATS_SERVER = 'nats';
const NATS_CHANNEL = 'ch1';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// https://github.com/nats-io/node-nats
var NATS = require('nats');
var nats = NATS.connect({'url':"nats://" + NATS_SERVER + ":4222"});

// App
app.get('/', (req, res) => {
  //res.send('Hello world\n');
  res.sendFile(__dirname + '/index.html');
});

// Simple Subscriber
nats.subscribe(NATS_CHANNEL, function(msg) {
  console.log('Node1 Received NATS message: ' + msg);
  io.emit(SOCKET_IO_CHANNEL, msg);
});

http.listen(PORT, HOST, function(){
  console.log(`Node1 is runned on http://${HOST}:${PORT}`);
});