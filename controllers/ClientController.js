const { response, request } = require('express');
const Client = require('../models/Client');

// CREATE CLIENTE
const createClient = async (req, res = response) => {
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

    // RFC SHOULD BE UNIQUE
    const clientWithSameRfc = await Client.findOne({
      where: {
        rfc,
      },
    });

    if (clientWithSameRfc) {
      return res.status(400).send({
        ok: false,
        message: 'El RFC ya existe en la base de datos',
      });
    }

    const newClient = await Client.create({
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

    return res.json({
      ok: true,
      message: 'Cliente creado correctamente',
      client: newClient,
    });
  } catch (error) {
    return res.status(400).send({
      ok: false,
      message: 'Error al crear cliente',
      error,
    });
  }
};

// READ CLIENTES
const getClients = async (req, res = response) => {
  try {
    const clients = await Client.findAll();
    return res.json({
      ok: true,
      clients,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: 'Error al obtener clientes',
      error,
    });
  }
};

// READ CLIENTE
const getClient = async (req, res = response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    console.log(client);

    if (!client) {
      return res.status(404).send({
        ok: false,
        message: 'Cliente no encontrado',
      });
    }

    return res.json({
      ok: true,
      client,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: 'Error al obtener cliente',
      error,
    });
  }
};

// UPDATE CLIENTE
const updateClient = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      numExt,
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

    const client = await Client.findOne({
      where: {
        idCliente: id,
      },
    });

    if (!client) {
      return res.status(404).send({
        ok: false,
        message: 'Cliente no encontrado',
      });
    }

    await Client.update(
      {
        numExt,
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
          idCliente: id,
        },
      }
    );

    const updatedClient = await Client.findOne({
      where: {
        idCliente: id,
      },
    });

    return res.json({
      ok: true,
      message: 'Cliente actualizado correctamente',
      client: updatedClient,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: 'Error al actualizar cliente',
      error,
    });
  }
};

// DELETE CLIENTE
const deleteClient = async (req, res = response) => {
  try {
    const { id } = req.params;

    const client = await Client.findOne({
      where: {
        idCliente: id,
      },
    });

    if (!client) {
      return res.status(404).send({
        ok: false,
        message: 'Cliente no encontrado',
      });
    }

    await Client.destroy({
      where: {
        idCliente: id,
      },
    });
    return res.json({
      ok: true,
      message: 'Cliente eliminado correctamente',
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: 'Error al eliminar cliente',
      error,
    });
  }
};

module.exports = {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
