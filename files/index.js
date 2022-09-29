var http = require('http');
var fs = require('fs');

var port = 3009;
var host = '127.0.0.1';
var filename = 'product-management.js';

var requestCounter = 0;


var server = http.createServer(handleRequest);

server.listen(port, host, function () {
    console.log("Server listening on: " + host + ":" + port);
});

function handleRequest(request, response) {    
    requestCounter++;
    console.log(">> Handling request... " + request.url );
    console.log("   Request counter: " +  requestCounter);

    response.writeHead(200, { "Content-Type": "text/plain" });
    fs.readFile(filename, 'utf8', function (err, data) {
        var requestCounterString = "======> Request Count: " + requestCounter + "\n======================================";
        if (err) {
            response.end(requestCounterString + err);
            return console.log(err);
        }
        response.end(requestCounterString + data);
        console.log(data);
    })
};





