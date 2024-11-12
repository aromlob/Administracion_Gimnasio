/**
 *  Rutas para obtener la lista de clientes_planes,
 *  para añadir, eliminar y editar un cliente_plan.
 */

const express = require('express');
const routes = express.Router();
const clientePlanController = require('../controllers/clientePlanControllers.js');

routes.get('/', clientePlanController.cliente_plan);

routes.get('/add', clientePlanController.cliente_planAddFormulario);

routes.get('/add', clientePlanController.cliente_planAddFormulario);

routes.get('/delete/:id', clientePlanController.cliente_planDeleteFormulario);

routes.get('/delete/:id', clientePlanController.cliente_planDel);

routes.get('/edit/:id', clientePlanController.cliente_planEditFormulario);

routes.get('/edit/:id', clientePlanController.cliente_planEdit);

module.exports = routes;