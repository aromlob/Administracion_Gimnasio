// Importa el módulo de base de datos para realizar consultas
const db = require('../db');

/**
 * Consulta todos los registros de la tabla `sesion` y los envía a la vista `sesiones/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesion = (req, res) => {
    db.query(
        'SELECT * FROM sesion', // Consulta todos los registros de la tabla 'sesion'
        (err, response) => {
            if (err) res.send('Error al buscar las sesiones'); // Si ocurre un error, muestra un mensaje
            else res.render('sesiones/list', { sesiones: response }); // Si no hay errores, renderiza la vista con la lista de sesiones
        }
    );
};

/**
 * Renderiza el formulario para agregar una nueva sesión.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionAddFormulario = (req, res) => {
    res.render('sesiones/add'); // Muestra el formulario para agregar una nueva sesión
};

/**
 * Añade una nueva sesión a la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionAdd = (req, res) => {
    // Extrae los valores del cuerpo de la solicitud
    const { fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador } = req.body;

    db.query(
        'INSERT INTO sesion (fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador) VALUES (?, ?, ?, ?, ?)', 
        [fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador], // Inserta una nueva sesión en la base de datos
        (error) => {
            if (error) res.send('Error insertando sesión: ' + error.message); // Muestra el error si ocurre
            else res.redirect('/sesiones'); // Redirige a la lista de sesiones después de agregarla
        }
    );
};

/**
 * Renderiza el formulario para confirmar la eliminación de una sesión.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.sesionDeleteFormulario = (req, res) => {
    const { id } = req.params; // Obtiene el ID de la sesión a eliminar

    if (isNaN(id)) res.send('Parámetros incorrectos'); // Si el ID no es un número, muestra un mensaje de error
    else {
        db.query(
            'SELECT * FROM sesion WHERE id=?', // Consulta si existe una sesión con el ID proporcionado
            [id],
            (error, respuesta) => {
                if (error) res.send('Error al intentar borrar la sesión'); // Si ocurre un error, muestra un mensaje
                else {
                    if (respuesta.length > 0) {
                        res.render('sesiones/delete', { sesion: respuesta[0] }); // Si la sesión existe, muestra el formulario de confirmación de eliminación
                    } else {
                        res.send('Error al intentar borrar la sesión, no existe'); // Si no existe la sesión, muestra un mensaje
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
    const { id } = req.params; // Obtiene el ID de la sesión a eliminar

    if (isNaN(id)) {
        res.send('Error borrando'); // Si el ID no es válido, muestra un mensaje de error
    } else {
        db.query(
            'DELETE FROM sesion WHERE id=?', 
            [id], // Elimina la sesión con el ID proporcionado
            (error) => {
                if (error) res.send('Error borrando sesión: ' + error.message); // Si ocurre un error, muestra un mensaje
                else res.redirect('/sesiones'); // Redirige a la lista de sesiones después de eliminarla
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
    const { id } = req.params; // Obtiene el ID de la sesión a editar

    if (isNaN(id)) res.send('Parámetros incorrectos'); // Si el ID no es un número, muestra un mensaje de error
    else {
        db.query(
            'SELECT * FROM sesion WHERE id=?', 
            [id], // Consulta si existe una sesión con el ID proporcionado
            (error, respuesta) => {
                if (error) {
                    res.send('Error editando sesión'); // Si ocurre un error, muestra un mensaje
                } else {
                    if (respuesta.length > 0) {
                        res.render("sesiones/edit", { sesion: respuesta[0] }); // Si la sesión existe, muestra el formulario para editarla
                    } else {
                        res.send("Error al intentar actualizar la sesión, no existe"); // Si no existe la sesión, muestra un mensaje
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
    // Extrae los valores del cuerpo de la solicitud
    const { fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador } = req.body;
    const { id } = req.params; // Obtiene el ID de la sesión a actualizar

    if (isNaN(id)) {
        res.send('Error actualizando'); // Si el ID no es válido, muestra un mensaje de error
    } else {
        db.query(
            'UPDATE sesion SET fecha_inicio = ?, hora_inicio = ?, duracion_min = ?, id_cliente = ?, id_entrenador = ? WHERE id = ?', 
            [fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador, id], // Actualiza los datos de la sesión en la base de datos
            (error) => {
                if (error) {
                    res.send('Error actualizando la sesión: ' + error.message); // Si ocurre un error, muestra un mensaje
                    console.log(error); // Registra el error en la consola para el desarrollador
                } else res.redirect('/sesiones'); // Redirige a la lista de sesiones después de actualizarla
            }
        );
    }
};
