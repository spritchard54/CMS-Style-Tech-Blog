const { Model, DataTypes } = require('sequelize');
const SALT_FACTOR = 10;

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(password){
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      //before new user is created
      beforeCreate: async (newUserData) => {
        // newUserData.username = await newUserData.username.toLowerCase();
        //bcrypt.hash excrypts newUserData.password
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          SALT_FACTOR
        );
        return newUserData;
      },
      // Before existing user is updated
      beforeUpdate: async (updatedUserData) => {
        // if (updatedUserData.username.hasOwnProperty('username')) {
        //   updatedUserData.username = await updatedUserData.username.toLowerCase();
        // }
        // Rehash password on update
        if (updatedUserData.password.hasOwnProperty('password')) {
          await bcrypt.hash(updatedUserData.password, SALT_FACTOR);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
