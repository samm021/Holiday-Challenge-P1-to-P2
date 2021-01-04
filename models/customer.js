'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Account);
    }
  };
  Customer.init({
    identityNumber: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Identity Number must be filled"
        },
        len: {
          args: [16, 20],
          msg: "Identity Number minimum 16 characters and maximum 20 characters"
        },
        isUnique(val, next) {
          Customer.findOne({where: {identityNumber: val}})
          .then(output => {
            if (output && this.id !== output.id) {
              return next('Identity Number has been registered')
            }
            return next()
          })
          .catch(err => next(err))
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full name must be filled'
        }
      }
    },
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Birthdate must be be filled'
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};