const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');

// Ruta para obtener todos los clientes y renderizar la lista
router.get('/', clienteController.cliente);

// Ruta para mostrar el formulario para agregar un nuevo cliente
router.get('/add', clienteController.clienteAddFormulario);

// Ruta para agregar un cliente a la base de datos
router.post('/add', clienteController.clienteAdd);

// Ruta para mostrar el formulario para borrar un cliente
router.get('/delete/:id', clienteController.clienteDeleteFormulario);

// Ruta para borrar un cliente de la base de datos
router.post('/delete/:id', clienteController.clienteDel);

// Ruta para mostrar el formulario para editar un cliente
router.get('/edit/:id', clienteController.clienteEditFormulario);

// Ruta para editar un cliente en la base de datos
router.post('/edit/:id', clienteController.clienteEdit);

router.get('/:id/planes',clienteController.planesPorCliente);

module.exports = router;
