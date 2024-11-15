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
router.get('/delete/:Id_sesion', sesionController.sesionDeleteFormulario);

/**
 * Ruta para eliminar u, sesion
 */
router.post('/delete/:Id_sesion', sesionController.sesionDel);

/**
 * Ruta para mostrar el formulario de editar u, sesion
 */
router.get('/edit/:Id_sesion', sesionController.sesionEditFormulario);

/**
 * Ruta para actualizar u, sesion
 */
router.post('/edit/:Id_sesion', sesionController.sesionEdit);

module.exports = router;
