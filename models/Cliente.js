const { Sequelize } = require('sequelize');
const { sequelize } = require('../database/connection');

const Cliente = sequelize.define(
  'cliente',
  {
    idCliente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numExt: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rfc: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    colonia: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    municipio: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genero: {
      type: Sequelize.CHAR,
      allowNull: false,
      validate: {
        isIn: [['H', 'M']],
      },
    },
    calle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoP: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoM: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'CLIENTE',
    schema: 'persona',
  }
);

module.exports = Cliente;
