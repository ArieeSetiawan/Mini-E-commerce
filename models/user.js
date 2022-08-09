'use strict';

const uuid = require('uuid');
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleType: DataTypes.STRING,   
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('beforeCreate', (user, options) => {
    try {
      user.id = uuid.v4();
      user.roleType = 'ADMIN';
    } catch (err) {
      throw err;
    }
  });

  return user;
};