var seneca = require('seneca')().use('product-storage')
seneca.use('seneca-entity');

var product =  {
    product: "Laptop",
    price: "201.99",
    category: "PC",
}

function add_product() {
    seneca.act({role: 'product', cmd: 'add', data: product}, function (err, msg) {
        console.log(msg);
    });
}

add_product();
