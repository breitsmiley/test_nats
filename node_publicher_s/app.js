'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const NATS_CLUSTER_ID = 'test-cluster';
const NATS_CLIENT_ID = 'node_publisher_s';
const NATS_SERVER = 'nats://natss:4222';
const NATS_SUBJECT = 'sub1';

// https://github.com/nats-io/node-nats-streaming
var stan = require('node-nats-streaming').connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_SERVER);

var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App
app.get('/', (req, res) => {
  //res.send('Hello world\n');
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, HOST, function(){
    console.log(`NPS is runned on http://${HOST}:${PORT}`);
});

stan.on('connect', function () {
    console.log('Connect to NATS successfully - node_publisher_s');
});

// Ajax
app.post('/push', function(req, res){
    // console.log(req.body);
    // console.log('params: ' + JSON.stringify(req.params));
    // console.log('body: ' + JSON.stringify(req.body));
    // console.log('query: ' + JSON.stringify(req.query));

    // Simple Publisher
    var body = '[NPS] #' + req.body.n + ' : ' + '"<b>' + req.body.msg + '</b>"';
//----------------------------
//     stan.on('connect', function () {

        stan.publish(NATS_SUBJECT, body, function(err, guid){
            if(err) {
                console.log(err);
                // process.exit(1);
                stan.close();
            } else {
                console.log('published: |' + body + '| (' + guid + ')');
            }
            // process.exit(0);
            // stan.close();
        });
    // });

    // stan.on('close', function() {
    //     process.exit();
    // });
//----------------------------

    res.json({ ok: true });

});