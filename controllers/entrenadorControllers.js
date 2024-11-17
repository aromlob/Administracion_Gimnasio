// Módulo de conexión de la base de datos
const db = require('../db');

// Definimos las especialidades y niveles de experiencia válidos para validaciones
const especialidadesValidas = ['pesas', 'cardio', 'yoga', 'spinning', 'crossfit'];
const nivelesExperienciaValidos = ['experto', 'avanzado', 'intermedio', 'principiante'];

/**
 * Controlador para listar los entrenadores 
 * almacenados en la base de datos
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenador = (req, res) => {
    db.query(
        'SELECT * FROM `entrenador`',
        (err, response) => {
            if (err) {
                res.send('ERROR al hacer la consulta: ' + err.message);
            } else {
                res.render('entrenadores/list', { entrenadores: response });
            }
        }
    );
};

/**
 * Controlador para mostrar el formulario de añadir un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorAddFormulario = (req, res) => {
    res.render('entrenadores/add');
};

/**
 * Controlador para añadir un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorAdd = (req, res) => {
    const { nombre, especialidad, nivel_experiencia } = req.body;

    // Validación de especialidad
    const especialidadLower = especialidad.toLowerCase();
    if (!especialidadesValidas.includes(especialidadLower)) {
        return res.send('Especialidad inválida');
    }

    // Validación de nivel de experiencia
    const nivelExperienciaLower = nivel_experiencia.toLowerCase();
    if (!nivelesExperienciaValidos.includes(nivelExperienciaLower)) {
        return res.send('Nivel de experiencia inválido');
    }

    db.query(
        'INSERT INTO entrenador (nombre, especialidad, nivel_experiencia) VALUES (?,?,?)',
        [nombre, especialidad, nivel_experiencia],
        (error, respuesta) => {
            if (error) {
                res.send('ERROR Insertando Entrenador: ' + error.message);
            } else {
                res.redirect('/entrenadores');
            }
        }
    );
};

/**
 * Controlador para mostrar el formulario para eliminar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorDeleteFormulario = (req, res) => {
    const { id} = req.params;
    if (isNaN(id)) {
        res.send('PARÁMETROS INCORRECTOS');
    } else {
        db.query(
            'SELECT * FROM entrenador WHERE id_entrenador=?',
            id,
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR al intentar borrar el entrenador: ' + error.message);
                } else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/delete', { entrenador: respuesta[0] });
                    } else {
                        res.send('ERROR al intentar borrar el entrenador, no existe');
                    }
                }
            }
        );
    }
};

/**
 * Controlador para eliminar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorDelete = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.send('ERROR BORRANDO');
    } else {
        db.query(
            'DELETE FROM entrenador WHERE id_entrenador=?',
            [id],
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR borrando entrenador: ' + error.message);
                } else {
                    res.redirect('/entrenadores');
                }
            }
        );
    }
};

/**
 * Controlador para mostrar el formulario para editar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorEditFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.send('PARÁMETROS INCORRECTOS');
    } else {
        db.query(
            'SELECT * FROM entrenador WHERE id_entrenador=?',
            id,
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR al intentar actualizar el entrenador: ' + error.message);
                } else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/edit', { entrenador: respuesta[0] });
                    } else {
                        res.send('ERROR al intentar actualizar el entrenador, no existe');
                    }
                }
            }
        );
    }
};

/**
 * Controlador para editar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorEdit = (req, res) => {
    const {nombre, especialidad, nivel_experiencia } = req.body;
    const {id} = req.params;

    if (isNaN(id)) {
        res.send('ERROR ACTUALIZANDO');
    } else {
        // Validación de especialidad
        const especialidadLower = especialidad.toLowerCase();
        if (!especialidadesValidas.includes(especialidadLower)) {
            return res.send('Especialidad inválida');
        }

        // Validación de nivel de experiencia
        const nivelExperienciaLower = nivel_experiencia.toLowerCase();
        if (!nivelesExperienciaValidos.includes(nivelExperienciaLower)) {
            return res.send('Nivel de experiencia inválido');
        }

        db.query(
            'UPDATE `entrenador` SET `nombre` = ?, `especialidad` = ?, `nivel_experiencia` = ? WHERE `id_entrenador` = ?',
            [nombre, especialidad, nivel_experiencia, id],
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR actualizando entrenador: ' + error.message);
                    console.log(error);
                } else {
                    res.redirect('/entrenadores');
                }
            }
        );
    }
};
