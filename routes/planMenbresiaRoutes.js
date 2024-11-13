const express = require('express');
const router = express.Router();
const planMembresiaController = require('../controllers/planMembresiaController');

/**
 * Ruta para obtener todos los planes de membresía
 */
router.get('/', planMembresiaController.plan_membresia);

/**
 * Ruta para mostrar el formulario de agregar un nuevo plan de membresía
 */
router.get('/add', planMembresiaController.plan_membresiaAddFormulario);

/**
 * Ruta para agregar un nuevo plan de membresía
 */
router.post('/add', planMembresiaController.plan_membresiaAdd);

/**
 * Ruta para mostrar el formulario de eliminar un plan de membresía
 */
router.get('/delete/:Id_plan', planMembresiaController.plan_membresiaDeleteFormulario);

/**
 * Ruta para eliminar un plan de membresía
 */
router.post('/delete/:Id_plan', planMembresiaController.plan_membresiaDel);

/**
 * Ruta para mostrar el formulario de editar un plan de membresía
 */
router.get('/edit/:Id_plan', planMembresiaController.plan_membresiaEditFormulario);

/**
 * Ruta para actualizar un plan de membresía
 */
router.post('/edit/:Id_plan', planMembresiaController.plan_membresiaEdit);

module.exports = router;
