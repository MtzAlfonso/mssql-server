const { Router } = require('express');
const { check } = require('express-validator');
const {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} = require('../controllers/ClientController');

const { fieldsValidate } = require('../middlewares/fieldsValidate');

const clientRouter = Router();

clientRouter.get(
  '/',

  getClients
);

clientRouter.get('/:id', [check('id').isInt(), fieldsValidate], getClient);

clientRouter.post(
  '/create',
  [
    check('numExt').isInt(),
    check('rfc').isLength({ min: 10, max: 13 }),
    check('colonia').isLength({ min: 3, max: 50 }),
    check('municipio').isLength({ min: 3, max: 50 }),
    check('estado').isLength({ min: 3, max: 50 }),
    check('genero').isIn(['H', 'M']),
    check('calle').isLength({ min: 3, max: 50 }),
    check('nombre').isLength({ min: 3, max: 50 }),
    check('apellidoP').isLength({ min: 3, max: 50 }),
    check('apellidoM').isLength({ min: 3, max: 50 }),
    check('fechaNacimiento').isDate(),
    fieldsValidate,
  ],
  createClient
);

clientRouter.put(
  '/update/:id',
  [
    check('id').isInt(),
    check('numExt').isInt(),
    check('colonia').isLength({ min: 3, max: 50 }),
    check('municipio').isLength({ min: 3, max: 50 }),
    check('estado').isLength({ min: 3, max: 50 }),
    check('genero').isIn(['H', 'M']),
    check('calle').isLength({ min: 3, max: 50 }),
    check('nombre').isLength({ min: 3, max: 50 }),
    check('apellidoP').isLength({ min: 3, max: 50 }),
    check('apellidoM').isLength({ min: 3, max: 50 }),
    check('fechaNacimiento').isDate(),
    fieldsValidate,
  ],
  updateClient
);

clientRouter.delete(
  '/delete/:id',
  [check('id').isInt(), fieldsValidate],
  deleteClient
);

module.exports = clientRouter;
