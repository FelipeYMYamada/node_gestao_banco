'use strict';
const cliente = require('./cliente');

const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conta extends Model {
    
    static associate(models) {
      conta.belongsTo(models.cliente,
        { foreignKey:'cliente_id', as:'clienteId' });
      conta.hasMany(models.transacoesConta,
        { foreignKey:'conta_id', as:'transacoes' });
    }
    
  }
  conta.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nr_conta: DataTypes.INTEGER,
    saldo: DataTypes.DOUBLE,
    cliente_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'cliente',
        key: 'cliente_id',
        as: 'clienteId'
      }
    },
    created_at:DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'conta',
    tableName: 'conta'
  });

  return conta;
};