const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionControllers');

/**
 * Ruta para obtener todos lo, sesions
 */
router.get('/', sesionController.sesion);

/**
 * Ruta para mostrar el formulario de agregar u, sesion
 */
router.get('/add', sesionController.sesionAddFormulario);

/**
 * Ruta para agregar un nuev, sesion
 */
router.post('/add', sesionController.sesionAdd);

/**
 * Ruta para mostrar el formulario de eliminar u, sesion
 */
router.get('/delete/:id', sesionController.sesionDeleteFormulario);

/**
 * Ruta para eliminar u, sesion
 */
router.post('/delete/:id', sesionController.sesionDel);

/**
 * Ruta para mostrar el formulario de editar u, sesion
 */
router.get('/edit/:id', sesionController.sesionEditFormulario);

/**
 * Ruta para actualizar u, sesion
 */
router.post('/edit/:id', sesionController.sesionEdit);

module.exports = router;
