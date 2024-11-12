/**
 *  Rutas para obtener la lista de entrenadores,
 *  para añadir, eliminar y editar un entrenador.
 */

const express = require('express');
const routes = express.Router();
const entrenadorController = require('../controllers/entrenadorControllers');

routes.get('/', entrenadorController.entrenador);

routes.get('/add', entrenadorController.entrenadorAddFormulario);

routes.get('/add', entrenadorController.entrenadorAdd);

routes.get('/delete/:id', entrenadorController.entrenadorDeleteFormulario);

routes.get('/delete/:id', entrenadorController.entrenadorDelete);

routes.get('/edit/:id', entrenadorController.entrenadorEditFormulario);

routes.get('/edit/:id', entrenadorController.entrenadorEdit);

module.exports = routes;