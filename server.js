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

server.use(restify.CORS());

// server.use(
//   function crossOrigin(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     return next();
//   }
// );

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
    .findById(id)
    .then(function(product){
      return res.json(product);
    });
});

server.get('/orders', function (req, res){
  models.Order
    .findAll({
      order: "updated_at DESC",
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
    .findById(id,{
      include: [{
        model: models.Product
      }]
    })
    .then(function (order){
      return res.json(order);
    });
});

server.post('/orders', function (req, res){
  var product_id = req.body.product_id;
  var quantity = req.body.quantity;

  models.Inventory
    .findOne(
      {where: {'product_id': product_id}}
    )
    .then(function (prodInventory){
      if (prodInventory.quantity >= quantity){
        return models.Order
          .create({
            name: req.body.name,
            quantity: req.body.quantity,
            product_id: req.body.product_id
          })
          .then(function (newOrder){
            var id = newOrder.id;
            return models.Order
              .findById(id,{
                include: [{
                  model: models.Product
                }]
              });
          })
          .then(function(order){
            prodInventory.update({'quantity': (prodInventory.quantity - quantity) });
            return res.json(order);
          });
      }else {
        return res.json({message: 'Sorry, not enough stock'}).status(400);
      }
    });

});

server.listen(8080, function (){
  console.log('%s steh werkin at %s', server.name, server.url);
});