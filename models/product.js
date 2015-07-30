'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        models.Product.hasMany(models.Inventory);
      }
    }
  });
  return Product;
};