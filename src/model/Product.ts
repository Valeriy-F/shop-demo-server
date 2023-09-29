import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model
  } from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare price: number;
    declare description?: string;
    
    static associate(models: any) {
      // define association here
    }
  }
  
  Product.init(
    {
      id: {
        field: 'id',
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        field: 'price',
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        field: 'description',
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
    }
  );
  
  return Product;
};