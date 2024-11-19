const db = require('../db');

/**
 * Consulta todos los registros de la tabla `sesion` y los envía a la vista `sesiones/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesion = (req, res) => {
    db.query(
        'SELECT * FROM sesion',
        (err, response) => {
            if (err) res.send('Error al buscar las sesiones');
            else res.render('sesiones/list', { sesiones: response});
        }
    );
};

/**
 * Renderiza el formulario para agregar una nueva sesión.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionAddFormulario = (req, res) => {
    res.render('sesiones/add');
};

/**
 * Añade una nueva sesión a la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionAdd = (req, res) => {
    const { fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador } = req.body;

    db.query(
        'INSERT INTO sesion (fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador) VALUES (?, ?, ?, ?, ?)',
        [fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador],
        (error) => {
            if (error) res.send('Error insertando sesión: ' + error.message);
            else res.redirect('/sesiones');
        }
    );
};

/**
 * Renderiza el formulario para confirmar la eliminación de una sesión.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionDeleteFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) res.send('Parámetros incorrectos');
    else {
        db.query(
            'SELECT * FROM sesion WHERE id=?',
            [id],
            (error, respuesta) => {
                if (error) res.send('Error al intentar borrar la sesión');
                else {
                    if (respuesta.length > 0) {
                        res.render('sesiones/delete', { sesion: respuesta[0] });
                    } else {
                        res.send('Error al intentar borrar la sesión, no existe');
                    }
                }
            }
        );
    }
};

/**
 * Elimina una sesión de la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionDel = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.send('Error borrando');
    } else {
        db.query(
            'DELETE FROM sesion WHERE id=?',
            [id],
            (error) => {
                if (error) res.send('Error borrando sesión: ' + error.message);
                else res.redirect('/sesiones');
            }
        );
    }
};

/**
 * Renderiza el formulario para editar una sesión existente.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionEditFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) res.send('Parámetros incorrectos');
    else {
        db.query(
            'SELECT * FROM sesion WHERE id=?',
            [id],
            (error, respuesta) => {
                if (error){
                    res.send('Error editando sesion')
                }else {
                    if (respuesta.length > 0) {
                        res.render("sesiones/edit", { sesion: respuesta[0] });
                    } else {
                        res.send("Error al intentar actualizar el sesion, no existe");
                    }
                }
            }
        );
    }
};

/**
 * Actualiza una sesión en la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionEdit = (req, res) => {
    const { fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador } = req.body;
    const { id } = req.params;

    if (isNaN(id)) {
        res.send('Error actualizando');
    } else {
        db.query(
            'UPDATE sesion SET fecha_inicio = ?, hora_inicio = ?, duracion_min = ?, id_cliente = ?, id_entrenador = ? WHERE id = ?',
            [fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador, id],
            (error) => {
                if (error) {
                    res.send('Error actualizando la sesión: ' + error.message);
                    console.log(error);
                } else res.redirect('/sesiones');
            }
        );
    }
};

