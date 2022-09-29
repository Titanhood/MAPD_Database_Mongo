
var plugin = function (options) {
    var seneca = this;

    seneca.add({ role: 'product', cmd: 'add' }, function (msg, respond) {
        this.make('product').data$(msg.data).save$(respond);
    });

    seneca.add({ role: 'product', cmd: 'get' }, function (msg, respond) {
        this.make('product').load$(msg.data.merch_id, respond);
    });

    seneca.add({ role: 'product', cmd: 'get-all' }, function (msg, respond) {
        this.make('product').list$({}, respond);
    });

    seneca.add({ role: 'product', cmd: 'delete' }, function (msg, respond) {
        this.make('product').remove$(msg.data.merch_id, respond);
    });


}

module.exports = plugin;

//var requestCounter = 0;

var seneca = require("seneca")();
seneca.use(plugin);
seneca.use('seneca-entity');

seneca.add('role:api, cmd:add-merch', function (args, done) {
    //requestCounter;
    console.log("--> products GET: recieved request");
    //console.log(" Request Counter:" + requestCounter);
    var product = {
        product: args.product,
        price: args.price,
        category: args.category
    }
    console.log("--> product: " + JSON.stringify(product));
    seneca.act({ role: 'product', cmd: 'add', data: product }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:add-merch1', function (args, done) {
    console.log("--> products GET: recieved request");
    var product = {
        product: "Gaming Laptop",
        price: "1001.99",
        category: "PC"
    }
    console.log("--> product: " + JSON.stringify(product));
    seneca.act({ role: 'product', cmd: 'add', data: product, method: 'POST' }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:get-all-merch', function (args, done) {
    //requestCounter;
    console.log("--> products GET: sending response");
    //console.log(" Request Counter: " + requestCounter);
    seneca.act({ role: 'product', cmd: 'get-all' }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:get-merch', function (args, done) {
    console.log("--> cmd:get-merch, args.merch_id: " + args.merch_id);
    seneca.act({ role: 'product', cmd: 'get', data: { merch_id: args.merch_id } }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});


seneca.add('role:api, cmd:delete-merch', function (args, done) {
    console.log("--> cmd:delete-merch, args.merch_id: " + args.merch_id);
    seneca.act({ role: 'product', cmd: 'delete', data: { merch_id: args.merch_id } }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:delete-all-merch', function (args, done) {
    seneca.act({ role: 'product', cmd: 'delete-all'}, function (err, msg) 
    {
        console.log(msg);
        done(err, { cmd: "delete-all-merch" });
    });
})

seneca.act('role:web', {
    use: {
        prefix: '/products',
        pin: { role: 'api', cmd: '*' },
        map: {
            'add-merch': { GET: true },
            'add-merch1': { POST: true, GET: true },
            'get-all-merch': { GET: true },
            'get-merch': { GET: true, },
            'delete-merch': { GET: true, },
            'delete-all-merch': {GET :true, }
        }
    }
})

let countGET = 0;
let countPOST = 0;

function requestCounter(req,res,next)
{
    if (req.method === "GET") countGET++;
    if (req.method === "POST") countPOST++;
    console.log("successful request counter :: GET "+ countGET+", Post " + countPOST);
    if(next)next();
}

var express = require('express');
var app = express();
app.use (requestCounter);
app.use(require("body-parser").json())
app.use(seneca.export('web'));



app.listen(3009)
console.log("HTTP Server listening on localhost:3009 ...");
console.log("----- GET/POST Requests-----");
console.log("http://localhost:3009/products/add-merch?product=Laptop&price=201.99&category=PC");
console.log("http://localhost:3009/products/add-merch?product=MacBook&price=601.99&category=MAC");
console.log("http://localhost:3009/products/add-merch1");
console.log("http://localhost:3009/products/get-all-merch");
console.log("http://localhost:3009/products/get-merch?merch_id=1245");
console.log("http://localhost:3009/products/delete-merch?merch_id=1245");
console.log("http://localhost:3009/products/delete-all-merch");