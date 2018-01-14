'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const SOCKET_IO_CHANNEL = 'message1';
const NATS_SERVER = ['nats://nats_a:4222', 'nats://nats_b:4222', 'nats://nats_c:4222'];
const NATS_CHANNEL = 'ch1';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// https://github.com/nats-io/node-nats
var NATS = require('nats');
var nats = NATS.connect({
    'servers': NATS_SERVER,
    'dontRandomize': true,
    'reconnect': true,
    'waitOnFirstConnect': true,
    'maxReconnectAttempts': -1
});
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

nats.on('error', function(err) {
    console.log(err);
});

nats.on('connect', function(nc) {
    // currentServer is the URL of the connected server.
    console.log("Connected to " + nats.currentServer.url.host);
});

nats.on('disconnect', function() {
    console.log('disconnect');
});

nats.on('reconnecting', function() {
    console.log('reconnecting');
});

nats.on('reconnect', function(nc) {
    // currentServer is the URL of the connected server.
    console.log("Reconnect to " + nats.currentServer.url.host);
});

nats.on('close', function() {
    console.log('close');
});