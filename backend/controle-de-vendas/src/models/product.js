import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

export default Product;
