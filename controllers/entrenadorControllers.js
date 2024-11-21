// Módulo de conexión de la base de datos
const db = require('../db');

// Definimos las especialidades y niveles de experiencia válidos para validaciones
const especialidadesValidas = ['pesas', 'cardio', 'yoga', 'spinning', 'crossfit'];
const nivelesExperienciaValidos = ['experto', 'avanzado', 'intermedio', 'principiante'];

/**
 * Controlador para listar los entrenadores almacenados en la base de datos
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.entrenador = (req, res) => {
    db.query(
        'SELECT * FROM `entrenador`', // Realiza la consulta para obtener todos los entrenadores
        (err, response) => {
            if (err) {
                res.send('ERROR al hacer la consulta: ' + err.message); // En caso de error en la consulta
            } else {
                res.render('entrenadores/list', { entrenadores: response}); // Muestra la lista de entrenadores en la vista
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
    res.render('entrenadores/add'); // Renderiza el formulario de agregar entrenador
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
        return res.send('Especialidad inválida'); // Si la especialidad no es válida, muestra un mensaje
    }

    // Validación de nivel de experiencia
    const nivelExperienciaLower = nivel_experiencia.toLowerCase();
    if (!nivelesExperienciaValidos.includes(nivelExperienciaLower)) {
        return res.send('Nivel de experiencia inválido'); // Si el nivel de experiencia no es válido, muestra un mensaje
    }

    db.query(
        'INSERT INTO entrenador (nombre, especialidad, nivel_experiencia) VALUES (?,?,?)',
        [nombre, especialidad, nivel_experiencia], // Inserta el entrenador en la base de datos
        (error, respuesta) => {
            if (error) {
                res.send('ERROR Insertando Entrenador: ' + error.message); // En caso de error en la inserción
            } else {
                res.redirect('/entrenadores'); // Redirige a la lista de entrenadores si la inserción es exitosa
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
        res.send('PARÁMETROS INCORRECTOS'); // Verifica si el id es válido
    } else {
        db.query(
            'SELECT * FROM entrenador WHERE id=?', // Obtiene el entrenador por ID
            id,
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR al intentar borrar el entrenador: ' + error.message); // Error al intentar obtener el entrenador
                } else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/delete', { entrenador: respuesta[0] }); // Muestra el formulario de eliminación
                    } else {
                        res.send('ERROR al intentar borrar el entrenador, no existe'); // Si el entrenador no existe
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
        res.send('ERROR BORRANDO'); // Verifica si el id es válido
    } else {
        db.query('DELETE FROM sesion WHERE id_entrenador = ?', 
            [id], (error) => { // Elimina las sesiones asociadas al entrenador
                if (error) {
                    res.send('ERROR eliminando sesiones asociadas: ' + error.message); // Error al eliminar sesiones
                } else {
                    db.query('DELETE FROM entrenador WHERE id = ?', 
                        [id], (error) => { // Elimina el entrenador
                            if (error) {
                                res.send('ERROR borrando entrenador: ' + error.message); // Error al eliminar el entrenador
                            } else {
                                res.redirect('/entrenadores'); // Redirige a la lista de entrenadores
                            }
                    });
                }
        });
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
        res.send('PARÁMETROS INCORRECTOS'); // Verifica si el id es válido
    } else {
        db.query(
            'SELECT * FROM entrenador WHERE id=?', // Obtiene el entrenador por ID
            id,
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR al intentar actualizar el entrenador: ' + error.message); // Error al obtener los datos del entrenador
                } else {
                    if (respuesta.length > 0) {
                        res.render('entrenadores/edit', { entrenador: respuesta[0] }); // Muestra el formulario de edición
                    } else {
                        res.send('ERROR al intentar actualizar el entrenador, no existe'); // Si el entrenador no existe
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
        res.send('ERROR ACTUALIZANDO'); // Verifica si el id es válido
    } else {
        // Validación de especialidad
        const especialidadLower = especialidad.toLowerCase();
        if (!especialidadesValidas.includes(especialidadLower)) {
            return res.send('Especialidad inválida'); // Si la especialidad no es válida, muestra un mensaje
        }

        // Validación de nivel de experiencia
        const nivelExperienciaLower = nivel_experiencia.toLowerCase();
        if (!nivelesExperienciaValidos.includes(nivelExperienciaLower)) {
            return res.send('Nivel de experiencia inválido'); // Si el nivel de experiencia no es válido, muestra un mensaje
        }

        db.query(
            'UPDATE `entrenador` SET `nombre` = ?, `especialidad` = ?, `nivel_experiencia` = ? WHERE `id` = ?',
            [nombre, especialidad, nivel_experiencia, id], // Actualiza los datos del entrenador
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR actualizando entrenador: ' + error.message); // En caso de error al actualizar
                    console.log(error);
                } else {
                    res.redirect('/entrenadores'); // Redirige a la lista de entrenadores si la actualización es exitosa
                }
            }
        );
    }
};

/**
 * Controlador que muestra las sesiones según el entrenador
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.sesionesPorEntrenadores = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.send("Error id"); // Verifica si el id es válido
    } else {
        db.query(
            `SELECT * FROM entrenador WHERE entrenador.id = ?`, 
            [id],
            (errorEntrenador, entrenadorData) => {
                if(!errorEntrenador)
                    db.query(
                        `SELECT 
                            e.id, 
                            e.nombre, 
                            s.id, 
                            s.fecha_inicio,
                            s.hora_inicio,
                            s.duracion_min
                        FROM entrenador e
                        JOIN 
                            sesion s ON e.id = s.id_entrenador
                        WHERE 
                            e.id = ?;`,
                        [id],
                        (error, response) => {
                            if (error)
                                res.send("Error seleccionando la sesión del entrenador" + error.message);
                            else {
                                db.query('SELECT * FROM entrenador', (errorEntrenador, entrenadoresResponse) => {
                                    console.log(response);
                                    res.render("entrenadores/sesiones", { sesiones: response, entrenadorData: entrenadorData[0], listaEntrenadores: entrenadoresResponse });
                                });
                            }
                        }
                    );
            }
        );
    }
};

// Función para asociar un entrenador a una sesión
exports.asociarEntrenadorSesionAddFormulario = (req, res) => {
    const {id} = req.params;
    
    if(isNaN(id)){
        res.send('Error id entrenador inválido'); // Verifica si el id del entrenador es válido
    } else {
        db.query(
            `SELECT e.id, e.nombre FROM entrenador e
            WHERE e.id NOT IN(
                SELECT id_entrenador FROM sesion
                WHERE id_entrenador=?)`,
            [id],
            (error, sesiones) =>{
                if(error){
                    res.send('Error al obtener las sesiones'); // Error al obtener sesiones
                } else {
                    res.render('entrenadores/sesionesAdd', {sesiones, entrenadorId: id}); // Muestra el formulario para asociar el entrenador
                }
            }
        );
    }
}

// Función para agregar una sesión a un entrenador
exports.asociarEntrenadorSesionAdd = (req, res) => {
    const { id } = req.params;
    const { sesionId, id_cliente, hora_inicio, duracion_min } = req.body;

    const fecha_inicio = new Date().toISOString().split("T")[0];

    if (isNaN(id) || isNaN(sesionId) || isNaN(id_cliente)) {
        res.send('Error: IDs inválidos'); // Verifica si los IDs son válidos
    } else {
        const query = `
            INSERT INTO sesion (fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador)
            VALUES (?, ?, ?, ?, ?)`;
        const values = [fecha_inicio, hora_inicio, duracion_min, id_cliente, id];

        db.query(query, values, (error) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.send('Error al asociar la sesión con el entrenador'); // Error al insertar la sesión
            } else {
                res.redirect(`/entrenadores/${id}/sesiones`); // Redirige a la página de sesiones del entrenador
            }
        });
    }
};

// Función para desasociar un entrenador de una sesión
exports.desasociarEntrenadorSesionDeleteFormulario = (req, res) => {
    const {idEntrenador, idSesion} = req.params;
    if(isNaN(idEntrenador)|| isNaN(idSesion)){
        res.send('Error id entrenador inválido'); // Verifica si los IDs son válidos
    } else {
        db.query(
            `SELECT sesion.* 
            FROM sesion
            JOIN entrenador ON sesion.id_entrenador = entrenador.id
            WHERE sesion.id_entrenador = ?`, 
            [idEntrenador],
            (error, sesiones) => {
                if(error){
                    res.send('Error al obtener las sesiones'); // Error al obtener sesiones
                } else {
                    res.render('entrenadores/sesionesDelete', {sesiones, idEntrenador, idSesion}); // Muestra el formulario para eliminar la asociación
                }
            }
        );
    }
}

// Función para eliminar la asociación entre entrenador y sesión
exports.desasociarEntrenadorSesionDelete = (req, res) => {
    const {idEntrenador, idSesion} = req.params;
    if(isNaN(idEntrenador) || isNaN(idSesion)){
        res.send('Error ids inválidos'); // Verifica si los IDs son válidos
    } else {
        db.query(
            `DELETE FROM sesion WHERE id=?`, // Elimina la sesión asociada
            [idSesion],
            (error) => {
                if(error){
                    res.send('Error al eliminar la sesión'); // Error al eliminar la sesión
                } else {
                    res.redirect(`/entrenadores/${idEntrenador}/sesiones`); // Redirige a la página de sesiones del entrenador
                }
            }
        );
    }
}
