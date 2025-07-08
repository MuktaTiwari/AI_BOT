import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const UserModel = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType:{
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'users' // Explicit table name
});

export default UserModel;