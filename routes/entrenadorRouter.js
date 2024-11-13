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

routes.get('/delete/:Id_entrenador', entrenadorController.entrenadorDeleteFormulario);

routes.get('/delete/:Id_entrenador', entrenadorController.entrenadorDelete);

routes.get('/edit/:Id_entrenador', entrenadorController.entrenadorEditFormulario);

routes.get('/edit/:Id_entrenador', entrenadorController.entrenadorEdit);

module.exports = routes;