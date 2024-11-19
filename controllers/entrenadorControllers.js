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
                res.render('entrenadores/list', { entrenadores: response});
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
            'SELECT * FROM entrenador WHERE id=?',
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
            'DELETE FROM entrenador WHERE id=?',
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
            'SELECT * FROM entrenador WHERE id=?',
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
            'UPDATE `entrenador` SET `nombre` = ?, `especialidad` = ?, `nivel_experiencia` = ? WHERE `id` = ?',
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

exports.sesionesPorEntrenadores = (req, res) => {

    const { id } = req.params;
    if (isNaN(id)) {
        res.send("Error id");
    } else {
        db.query(
            `SELECT * FROM entrenador WHERE entrenador.id = ?`,
            [id],
            (errorEntrenador, entrenadorData)=>{
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
                                res.send("Error selecionando la sesion del entrenador" + error.message);
                            else{
                                db.query('SELECT * FROM entrenador', (errorEntrenador, entrenadoresResponse) => {
                                    console.log(response);
                                    res.render("entrenadores/sesiones", { sesiones: response, entrenadorData:entrenadorData[0], listaEntrenadores: entrenadoresResponse });
                                });
                            }
                        }
                    );
            }
        )
    }
};

exports.asociarEntrenadorSesionAddFormulario = (req, res) =>{
    const {id} = req.params;
    
    if(isNaN(id)){
        res.send('Error id entrenador inválido');
    }else{
        db.query(
            `SELECT e.id, e.nombre FROM entrenador e
                WHERE e.id NOT IN(
                    SELECT id_entrenador FROM sesion
                    WHERE id_entrenador=?)`,
            [id],
            (error, sesiones) =>{
                if(error){
                    res.send('Error al obtener las sesiones');
                }else{
                    res.render('entrenadores/sesionesAdd', {sesiones, entrenadorId: id});
                }
            }
        );
    }
}

exports.asociarEntrenadorSesionAdd = (req, res) => {
    const { id } = req.params; // ID del entrenador que viene en la URL
    const { sesionId, id_cliente, hora_inicio, duracion_min } = req.body;

    const fecha_inicio = new Date().toISOString().split("T")[0];

    if (isNaN(id) || isNaN(sesionId) || isNaN(id_cliente)) {
        res.send('Error: IDs inválidos');
    } else {
        const query = `
            INSERT INTO sesion (fecha_inicio, hora_inicio, duracion_min, id_cliente, id_entrenador)
            VALUES (?, ?, ?, ?, ?)`;
        const values = [fecha_inicio, hora_inicio, duracion_min, id_cliente, id];

        db.query(query, values, (error) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.send('Error al asociar la sesión con el entrenador');
            } else {
                res.redirect(`/entrenadores/${id}/sesiones`);
            }
        });
    }
};


exports.desasociarEntrenadorSesionDeleteFormulario = (req, res) =>{
    const {idEntrenador, idSesion} = req.params;
    if(isNaN(idEntrenador)|| isNaN(idSesion)){
        res.send('Error id entrenador inválido');
    }else{
        db.query(
            `SELECT sesion.* 
            FROM sesion
            JOIN entrenador ON sesion.id_entrenador = entrenador.id
            WHERE sesion.id_entrenador = ?`,
            [idEntrenador],
            (error, sesiones) =>{
                if(error){
                    res.send('Error al obtener las sesiones');
                }else{
                    res.render('entrenadores/sesionesDelete', {sesiones, idEntrenador, idSesion});
                }
            }
        );
    }
}

exports.desasociarEntrenadorSesionDelete = (req, res) =>{

    const {idEntrenador, idSesion} = req.params;
    if(isNaN(idEntrenador) || isNaN(idSesion)){
        res.send('Error ids inválidos');
    }else{
        db.query(
            `DELETE FROM sesion WHERE id=?`,
            [idSesion],
            (error) =>{
                if(error){
                    res.send('Error al asociar el plan con el cliente');
                }else{
                    res.redirect(`/entrenadores/${idEntrenador}/sesiones`);
                }
            }
        );
    }
}
