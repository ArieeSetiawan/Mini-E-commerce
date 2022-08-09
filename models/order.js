'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const seller = require('./seller');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.item, {
        foreignKey: 'item_id',
      })
    }
  }
  order.init({
    customer_id: DataTypes.UUID,
    item_id: DataTypes.UUID,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    statusOrder: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order',
  });
  
  order.addHook('beforeCreate', (order, options) => {
    try {
      order.statusOrder = "Perlu Dibayar";
    } catch (err) {
      throw err;
    }
  });

  return order;
};