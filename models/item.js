'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here)
      this.belongsTo(models.seller, {
        foreignKey: 'sellerID',
      })
      this.hasMany(models.itemgallery, {
        foreignKey: 'item_id',
        as:'itemimage'
      })
      this.hasMany(models.order, {
        foreignKey: 'item_id',
        as:'itemDesc'
      })
    }
  }
  item.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    sellerID: DataTypes.UUID,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'item',
  });


  return item;
};