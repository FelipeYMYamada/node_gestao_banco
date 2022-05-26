'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transacoesConta extends Model {

    static associate(models) {
      transacoesConta.belongsTo(models.conta, 
        { foreignKey:'conta_id', as:'contaId' });
    }
    
  }
  transacoesConta.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    conta_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'conta',
        key: 'conta_id',
        as: 'transacoes'
      }
    },
    tipo_transacao: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    data_transacao: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'transacoesConta',
    tableName: 'transacoes_conta'
  });
  return transacoesConta;
};