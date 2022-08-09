'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.item, {
        foreignKey: 'sellerID',
      })
    }
  }
  seller.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    roleType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'seller',
  });
 
  seller.addHook('beforeCreate', (seller, options) => {
    try {
      seller.id = uuid.v4();
      seller.roleType = 'SELLER';
    } catch (err) {
      throw err;
    }
  });
  
  return seller;
};