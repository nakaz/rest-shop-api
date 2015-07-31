var config = require('./config/config.json');
var restify = require('restify');
var models = require('./models/');

var server = restify.createServer({
  name: 'Nakz Bodega',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/products', function (req, res){
  models.Product
    .findAll()
    .then(function (products){
      return res.json(products);
    });
});

server.get('/products/:id', function (req, res){
  var id = req.params.id;
  models.Product
    .findOne({where: {'id': id}})
    .then(function(product){
      return res.json(product);
    });
});

server.get('/orders', function (req, res){
  models.Order
    .findAll({
      include: [{
        model: models.Product
      }]
    })
    .then(function (orders){
      return res.json(orders);
    });
});

server.get('/orders/:id', function (req, res){
  var id = req.params.id;
  models.Order
    .findOne({where: {'id': id}})
    .then(function (order){
      return res.json(order);
    });
});

server.post('/orders', function (req, res){
  models.Order
    .create({
      name: req.body.name,
      quantity: req.body.quantity,
      product_id: req.body.product_id
    })
    .then(function (order){
      return res.json(order);
    });
});

server.listen(8080, function (){
  console.log('%s steh werkin at %s', server.name, server.url);
});