//Modulo de conexion de la base de datos
const db = require('../db');

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
            if (err) res.send('ERROR al hacer la consulta')
            else res.render('entrenadores/list', { entrenador: response })
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
    db.query(
        'INSERT INTO entrenador (nombre, especialidad, nivel_experiencia) VALUES (?,?,?)',
        [nombre, especialidad, nivel_experiencia],
        (error, respuesta) => {
            if (error) res.send('ERROR Insertando Entrenador' + req.body)
            else res.redirect('/entrenadores')
        }
    );
};


/**
 * Controlador para mostrar el formulario para eliminar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorDeleteFormulario = (req, res) => {
    const { Id_entrenador } = req.params;
    if (isNaN(Id_entrenador)) res.send('PARAMETROS INCORRECTOS')
    else
        db.query(
            'SELECT * FROM entrenador WHERE Id_entrenador=?',
            Id_entrenador,
            (error, respuesta) => {
                if (error) res.send('ERROR al INTENTAR BORRAR EL ENTRENADOR')
                else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/delete', { entrenador: respuesta[0] })
                    } else {
                        res.send('ERROR al INTENTAR BORRAR EL ENTRENADOR, NO EXISTE')
                    }
                }
            });
};

/**
 * Controlador para eliminar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorDelete = (req, res) => {
    const { Id_entrenador} = req.body;
    const paramId = req.params['Id_entrenador'];

    if (isNaN(Id_entrenador) || isNaN(paramId) || Id_entrenador !== paramId) {
        res.send('ERROR BORRANDO')
    } else {
        db.query(
            'DELETE FROM entrenador WHERE Id_entrenador=?',
            Id_entrenador,
            (error, respuesta) => {
                if (error) res.send('ERROR BORRANDO ENTRENADOR' + req.body)
                else res.redirect('/entrenadores')
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
    const { Id_entrenador } = req.params;
    if (isNaN(Id_entrenador)) res.send('PARAMETROS INCORRECTOS')
    else
        db.query(
            'SELECT * FROM entrenador WHERE Id_entrenador=?',
            Id_entrenador,
            (error, respuesta) => {
                if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL ENTRENADOR')
                else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/edit', { entrenador: respuesta[0] })
                    } else {
                        res.send('ERROR al INTENTAR ACTUALIZAR EL ENTRENADOR, NO EXISTE')
                    }
                }
            });
};


/**
 * Controlador para editar un entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenadorEdit = (req, res) => {
    const { Id_entrenador, nombre, especialidad, nivel_experiencia } = req.body;
    const paramId = req.params['Id_entrenador'];

    if (isNaN(Id_entrenador) || isNaN(paramId) || Id_entrenador !== paramId) {
        res.send('ERROR ACTUALIZANDO')
    } else {
        db.query(
            'UPDATE `entrenador` SET `nombre` = ?, `especialidad` = ? , `nivel_experiencia` = ? '+
            ' WHERE `Id_entrenador` = ?',
            [nombre, especialidad, nivel_experiencia, Id_entrenador],
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR ACTUALIZANDO ENTRENADOR' + error)
                    console.log(error)
                }
                else res.redirect('/entrenadores')
            }
        );
    }
};