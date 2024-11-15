const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');

// Ruta para obtener todos los clientes y renderizar la lista
router.get('/clientes', clienteController.cliente);

// Ruta para mostrar el formulario para agregar un nuevo cliente
router.get('/clientes/add', clienteController.clienteAddFormulario);

// Ruta para agregar un cliente a la base de datos
router.post('/clientes/add', clienteController.clienteAdd);

// Ruta para mostrar el formulario para borrar un cliente
router.get('/clientes/delete/:Id_cliente', clienteController.clienteDeleteFormulario);

// Ruta para borrar un cliente de la base de datos
router.post('/clientes/delete/:Id_cliente', clienteController.clienteDel);

// Ruta para mostrar el formulario para editar un cliente
router.get('/clientes/edit/:Id_cliente', clienteController.clienteEditFormulario);

// Ruta para editar un cliente en la base de datos
router.post('/clientes/edit/:Id_cliente', clienteController.clienteEdit);

module.exports = router;
