const express = require('express');
const { connectDB } = require('./database/connection');
const Cliente = require('./models/Cliente');

const app = express();

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.route('/obtener_clientes').get(async (_, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.route('/obtener_cliente/:id').get(async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.route('/crear_cliente').post(async (req, res) => {
  try {
    const {
      numExt,
      rfc,
      colonia,
      municipio,
      estado,
      genero,
      calle,
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
    } = req.body;

    console.log(req.body);

    const cliente = await Cliente.create({
      numExt,
      rfc,
      colonia,
      municipio,
      estado,
      genero,
      calle,
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.route('/actualizar_cliente/:id').put(async (req, res) => {
  try {
    const {
      numExt,
      rfc,
      colonia,
      municipio,
      estado,
      genero,
      calle,
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
    } = req.body;
    const cliente = await Cliente.update(
      {
        numExt,
        rfc,
        colonia,
        municipio,
        estado,
        genero,
        calle,
        nombre,
        apellidoP,
        apellidoM,
        fechaNacimiento,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.route('/eliminar_cliente/:id').delete(async (req, res) => {
  try {
    const cliente = await Cliente.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5500, () => {
  console.log('Server running on port 5500');
});
