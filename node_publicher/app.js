'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const NATS_SERVER = 'nats';
const NATS_CHANNEL = 'ch1';

var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// https://github.com/nats-io/node-nats
var NATS = require('nats');
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
    nats.publish(NATS_CHANNEL, '[NP] #' + req.body.n + ' : ' + '"<b>' + req.body.msg + '</b>"');
    res.json({ ok: true });

});

http.listen(PORT, HOST, function(){
    console.log(`NP is runned on http://${HOST}:${PORT}`);
});