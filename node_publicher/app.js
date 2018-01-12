'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const SOCKET_IO_CHANNEL = 'message1';
const NATS_SERVER = 'nats';
const NATS_CHANNEL = 'ch1';

var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// https://github.com/nats-io/node-nats
var NATS = require('nats');
// var nats = NATS.connect();
var nats = NATS.connect({'url':"nats://" + NATS_SERVER + ":4222"});


// App
app.get('/', (req, res) => {
  //res.send('Hello world\n');
  res.sendFile(__dirname + '/index.html');
});


// Ajax
app.post('/push', function(req, res){
    // console.log(req.body);
    // console.log('params: ' + JSON.stringify(req.params));
    // console.log('body: ' + JSON.stringify(req.body));
    // console.log('query: ' + JSON.stringify(req.query));
    // Simple Publisher
    nats.publish(NATS_CHANNEL, '# ' + req.body.n + '_' + req.body.msg);
    res.json({ ok: true });

});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

// var timerId = setInterval(function() {
//   io.emit(SOCKET_IO_CHANNEL, 'Test');
//     console.log('Test');
// }, 2000);

// Simple Subscriber
// nats.subscribe(NATS_CHANNEL, function(msg) {
//   console.log('Node Publisher Received NATS message: ' + msg);
//   io.emit(SOCKET_IO_CHANNEL, msg);
// });


http.listen(PORT, HOST, function(){
  console.log(`Node Publisher client is running on http://${HOST}:${PORT}`);
});