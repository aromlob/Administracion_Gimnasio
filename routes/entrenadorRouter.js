/**
 *  Rutas para obtener la lista de entrenadores,
 *  para añadir, eliminar y editar un entrenador.
 */

const express = require('express');
const routes = express.Router();
const entrenadorController = require('../controllers/entrenadorControllers');

// Ruta para listar entrenadores
routes.get('/', entrenadorController.entrenador);

// Ruta para mostrar el formulario de añadir un entrenador
routes.get('/add', entrenadorController.entrenadorAddFormulario);

// Ruta para añadir un nuevo entrenador (POST)
routes.post('/add', entrenadorController.entrenadorAdd);

// Ruta para mostrar el formulario de eliminar un entrenador
routes.get('/delete/:id', entrenadorController.entrenadorDeleteFormulario);

// Ruta para eliminar un entrenador (POST)
routes.post('/delete/:id', entrenadorController.entrenadorDelete);

// Ruta para mostrar el formulario de editar un entrenador
routes.get('/edit/:id', entrenadorController.entrenadorEditFormulario);

// Ruta para editar un entrenador (POST)
routes.post('/edit/:id', entrenadorController.entrenadorEdit);

routes.get('/:id/sesiones',entrenadorController.sesionesPorEntrenadores);

routes.get('/:id/sesiones/add',entrenadorController.asociarEntrenadorSesionAddFormulario);

routes.post('/:id/sesiones/add', entrenadorController.asociarEntrenadorSesionAdd);

routes.get('/:id/sesiones/delete',entrenadorController.desasociarEntrenadoresSesionDeleteFormulario);

routes.post('/:id/sesiones/delete', entrenadorController.desasociarEntrenadorSesionDelete);

module.exports = routes;
