const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

/**
 * Ruta para obtener todos los alumnos
 */
router.get('/', alumnoController.alumnos);

/**
 * Ruta para mostrar el formulario de agregar un alumno
 */
router.get('/add', alumnoController.alumnoAddFormulario);

/**
 * Ruta para agregar un nuevo alumno
 */
router.post('/add', alumnoController.alumnoAdd);

/**
 * Ruta para mostrar el formulario de eliminar un alumno
 */
router.get('/delete/:Id_cliente', alumnoController.alumnoDeleteFormulario);

/**
 * Ruta para eliminar un alumno
 */
router.post('/delete/:Id_cliente', alumnoController.alumnoDel);

/**
 * Ruta para mostrar el formulario de editar un alumno
 */
router.get('/edit/:Id_cliente', alumnoController.alumnoEditFormulario);

/**
 * Ruta para actualizar un alumno
 */
router.post('/edit/:Id_cliente', alumnoController.alumnoEdit);

module.exports = router;

