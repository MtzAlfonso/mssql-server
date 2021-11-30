const { Sequelize } = require('sequelize');

// Start Database connection
const sequelize = new Sequelize('proyecto', 'sa', 'admin_password123', {
  host: 'localhost',
  dialect: 'mssql',
});
// End Database connection

sequelize.sync();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
  } catch (error) {
    console.log('Error al conectar a la base de datos');
  }
};

module.exports = {
  sequelize,
  connectDB,
};
