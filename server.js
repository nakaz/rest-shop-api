var config = require('./config/config.json');
var restify = require('restify');

var server = restify.createServer({
  name: 'Nakz Bodega',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next){
  res.send(req.params);
  return next();
});

server.listen(8080, function (){
  console.log('%s steh werkin at %s', server.name, server.url);
});