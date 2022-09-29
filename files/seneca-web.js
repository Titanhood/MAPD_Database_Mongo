var seneca = require('seneca')()

seneca.add('role:api,cmd:bazinga',function(args,done){
  done(null,{bar:"Bazinga!"});
});

seneca.act('role:web',{use:{
  prefix: '/products',
  pin: {role:'api',cmd:'*'},
  map:{
    bazinga: {GET: true}
  }
}})

var express = require('express')
var app = express()

app.use( seneca.export('web') )

app.listen(3009)
