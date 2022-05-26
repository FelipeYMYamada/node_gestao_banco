'use strict';

const { Model,Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    
    static associate(models) {
      cliente.hasMany(models.conta,
        { foreignKey: 'cliente_id', as: 'contas' })
    }
    
  }
  cliente.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      get() {
        return undefined;
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'cliente',
    tableName: 'cliente'
  });
  return cliente;
};