'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    roleType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'customer',
  });

  customer.addHook('beforeCreate', (customer, options) => {
    try {
      customer.id = uuid.v4();
      customer.roleType = 'CUSTOMER';
    } catch (err) {
      throw err;
    }
  });

  return customer;
};