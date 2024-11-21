// Importa el módulo de base de datos para realizar consultas
const db = require("../db");

/**
 * Consulta todos los registros de la tabla `plan_membresia` y los envía a la vista `planesMembresias/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresia = (req, res) => {
    db.query("SELECT * FROM `plan_membresia`", (err, response) => {
        if (err) res.send("Error al buscar el plan de membresía");
        else res.render("planesMembresias/list", { planes: response });
    });
};

/**
 * Renderiza el formulario para agregar un nuevo plan de membresía.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaAddFormulario = (req, res) => {
    res.render("planesMembresias/add"); // Renderiza el formulario de adición de plan de membresía
};

/**
 * Añade un nuevo plan de membresía a la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaAdd = (req, res) => {
    const { nombre_plan, duracion_meses, precio } = req.body; // Obtiene los datos del formulario
    db.query(
        "INSERT INTO plan_membresia (nombre_plan, duracion_meses, precio) VALUES (?,?,?)", 
        [nombre_plan, duracion_meses, precio], // Inserta los datos en la base de datos
        (error) => {
            if (error) res.send("Error insertando plan de membresía: " + error.message);
            else res.redirect("/planesMembresias"); // Redirige a la lista de planes tras agregar uno
        }
    );
};

/**
 * Renderiza el formulario para confirmar la eliminación de un plan de membresía.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaDeleteFormulario = (req, res) => {
    const { id } = req.params; // Obtiene el ID del plan a eliminar
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            "SELECT * FROM plan_membresia WHERE id=?", 
            [id], // Busca el plan de membresía por su ID
            (error, respuesta) => {
                if (error) res.send("Error al intentar borrar el plan de membresía");
                else {
                    if (respuesta.length > 0) {
                        res.render("planesMembresias/delete", { plan_membresia: respuesta[0] }); // Muestra el formulario de confirmación de eliminación
                    } else {
                        res.send("Error al intentar borrar el plan de membresía, no existe");
                    }
                }
            }
        );
};

/**
 * Elimina un plan de membresía de la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaDel = (req, res) => {
    const { id } = req.params; // Obtiene el ID del plan a eliminar

    if (isNaN(id)) {
        res.send("Error borrando");
    } else {
        db.query(
            "DELETE FROM plan_membresia WHERE id=?", 
            [id], // Elimina el plan de membresía por su ID
            (error) => {
                if (error) res.send("Error borrando el plan de membresía: " + error.message);
                else res.redirect("/planesMembresias"); // Redirige a la lista de planes tras la eliminación
            }
        );
    }
};

/**
 * Renderiza el formulario para editar un plan de membresía.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaEditFormulario = (req, res) => {
    const { id } = req.params; // Obtiene el ID del plan a editar
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            "SELECT * FROM plan_membresia WHERE id=?", 
            [id], // Busca el plan de membresía por su ID
            (error, respuesta) => {
                if (error) res.send("Error al intentar actualizar el plan de membresía");
                else {
                    if (respuesta.length > 0) {
                        res.render("planesMembresias/edit", { plan_membresia: respuesta[0] }); // Muestra el formulario con los datos del plan para editar
                    } else {
                        res.send("Error al intentar actualizar el plan de membresía, no existe");
                    }
                }
            }
        );
};

/**
 * Actualiza un plan de membresía en la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaEdit = (req, res) => {
    const { nombre_plan, duracion_meses, precio } = req.body; // Obtiene los nuevos datos del formulario
    const { id } = req.params; // Obtiene el ID del plan a actualizar

    if (isNaN(id)) {
        res.send("Error actualizando");
    } else {
        db.query(
            "UPDATE plan_membresia SET nombre_plan = ?, duracion_meses = ?, precio = ? WHERE id = ?", 
            [nombre_plan, duracion_meses, precio, id], // Actualiza el plan de membresía con el nuevo nombre, duración y precio
            (error) => {
                if (error) {
                    res.send("Error actualizando el plan de membresía: " + error.message);
                    console.log(error); // Registra el error en la consola para el desarrollador
                } else res.redirect("/planesMembresias"); // Redirige a la lista de planes tras la actualización
            }
        );
    }
};
