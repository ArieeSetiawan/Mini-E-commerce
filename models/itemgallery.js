'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemgallery extends Model {
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
  itemgallery.init({
    url: DataTypes.STRING,
    item_id: DataTypes.UUID,
    public_id: DataTypes.STRING,
    asset_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'itemgallery',
  });

  itemgallery.addHook('beforeCreate', (itemgallery, options) => {
    try {
      itemgallery.id = uuid.v4();
    } catch (err) {
      throw err;
    }
  });

  return itemgallery;
};