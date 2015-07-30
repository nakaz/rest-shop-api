var models = require('../models');

var faker = require('faker');

var numberOf = faker.random.number({min:10, max: 30});

models.sequelize
  .sync({force:true})
  .then(function(){
    // adding products
    var products = [];
    for(var i = 0; i < numberOf; i++){
      console.log(faker.commerce.price(0, 1000, 2));
      products.push({
        name: faker.commerce.productName(),
        description: 'It is a ' + faker.commerce.productAdjective().toLowerCase() + ' product made out of ' + faker.commerce.productMaterial().toLowerCase() + ' material!',
        price: Number(faker.commerce.price(0, 1000, 2))
      });
    }
    return models.Product.bulkCreate(products, {returning: true});
  })
  .then(function(products){
    //adding inventory stock for products
    var stock = [];
    for(var i = 0; i < products.length; i++){
      stock.push({
        quantity: faker.random.number({min:0, max:100}),
        product_id: products[i].id
      });
    }
    return models.Inventory.bulkCreate(stock);
  })
  .then(function(){

  });