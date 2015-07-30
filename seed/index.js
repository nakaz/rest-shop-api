var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force:true})
  .then(function(){
    var products = [];
    var numberOf = faker.random.number({min:10, max: 30});
    for(var i = 0; i < numberOf; i++){
      console.log(faker.commerce.price(0, 1000, 2));
      products.push({
        name: faker.commerce.productName(),
        description: 'It is a ' + faker.commerce.productAdjective().toLowerCase() + ' product made out of ' + faker.commerce.productMaterial().toLowerCase() + ' material!',
        price: Number(faker.commerce.price(0, 1000, 2))
      });
    }
    return models.Product.bulkCreate(products);
  });