'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const SOCKET_IO_CHANNEL = 'message1';

const NATS_CLUSTER_ID = 'test-cluster';
const NATS_CLIENT_ID = 'node1_s';
const NATS_SERVER = 'nats://natss:4222';
const NATS_SUBJECT = 'sub1';
const NATS_QUEUE_GROUP = 'appp_group1';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// App
app.get('/', (req, res) => {
    //res.send('Hello world\n');
    res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, HOST, function(){
    console.log(`node1_s is runned on http://${HOST}:${PORT}`);
});


// https://github.com/nats-io/node-nats-streaming
var stan = require('node-nats-streaming').connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_SERVER);




stan.on('connect', function () {

    console.log('Connect to NATS successfully - node1_s');

    // Simple Subscriber
    var opts = stan.subscriptionOptions();
    opts.setStartWithLastReceived();

    var subscription = stan.subscribe(NATS_SUBJECT, NATS_QUEUE_GROUP, opts);

    subscription.on('error', function (err) {
        console.log('subscription for ' + this.subject + " raised an error: " + err);
    });
    subscription.on('unsubscribed', function () {
        console.log('unsubscribed to ' + this.subject);
    });
    subscription.on('ready', function () {
        console.log('subscribed to ' + this.subject + ' qgroup:' + this.qGroup);
    });
    subscription.on('message', function (msg) {
        console.log('node1_s received NATS S message: ');
        console.log(msg.getSubject() + "[" + msg.getSequence() + "]: " + msg.getData());
        io.emit(SOCKET_IO_CHANNEL, msg.getData());
    });

});



