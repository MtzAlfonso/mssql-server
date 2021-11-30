const { Sequelize } = require('sequelize');
require('dotenv').config();

// Start Database connection
const sequelize = new Sequelize(
  'proyecto',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
  }
);

const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({
      force: false,
    });
    console.log('Conexión a la base de datos establecida correctamente');
  } catch {
    console.log('Error al conectar a la base de datos');
  }
};

module.exports = {
  sequelize,
  databaseConnection,
};
