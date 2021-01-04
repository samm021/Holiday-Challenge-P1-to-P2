'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.STRING,
      validate: {
        checkBalance (val) {
          if (val && +val === -Infinity) {
            throw new Error('Minimum balance for new account: Rp500.000')
          }
        }
      }
    },
    CustomerId: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.accountNumber = Math.random().toString().slice(2,11);
        if (!instance.balance) {
          instance.balance = 500000;
        }
      },
      beforeBulkUpdate: (instances, option) => {
        if (+instances.attributes.balance < 0) {
          throw new Error('Insufficient Balance')
        }
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};