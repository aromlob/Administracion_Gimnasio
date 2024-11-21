const db = require("../db");

/**
 * Consulta todos los registros de la tabla `plan_membresia` y los envía a la vista `planesMembresias/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresia = (req, res) => {
    db.query("SELECT * FROM `plan_membresia`", (err, response) => {
        if (err) res.send("Error al buscar el plan de membresia");
        else res.render("planesMembresias/list", { planes: response});
    });
};

/**
 * Renderiza el formulario para agregar un nuevo plan de membresía.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaAddFormulario = (req, res) => {
    res.render("planesMembresias/add");
};

/**
 * Añade un nuevo plan de membresía a la base de datos.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaAdd = (req, res) => {
    const { nombre_plan, duracion_meses, precio } = req.body;
    db.query(
        "INSERT INTO plan_membresia (nombre_plan, duracion_meses, precio) VALUES (?,?,?)",
        [nombre_plan, duracion_meses, precio],
        (error) => {
            if (error) res.send("Error insertando plan de membresia: " + error.message);
            else res.redirect("/planesMembresias");
        }
    );
};

/**
 * Renderiza el formulario para confirmar la eliminación de un plan de membresía.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.plan_membresiaDeleteFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            "SELECT * FROM plan_membresia WHERE id=?",
            [id],
            (error, respuesta) => {
                if (error) res.send("Error al intentar borrar el plan de membresia");
                else {
                    if (respuesta.length > 0) {
                        res.render("planesMembresias/delete", { plan_membresia: respuesta[0] });
                    } else {
                        res.send("Error al intentar borrar el plan de membresia, no existe");
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
    const { id } = req.params;

    if (isNaN(id)) {
        res.send("Error borrando");
    } else {
        db.query(
            "DELETE FROM plan_membresia WHERE id=?",
            [id],
            (error) => {
                if (error) res.send("Error borrando el plan de membresia: " + error.message);
                else res.redirect("/planesMembresias");
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
    const { id } = req.params;
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            "SELECT * FROM plan_membresia WHERE id=?",
            [id],
            (error, respuesta) => {
                if (error) res.send("Error al intentar actualizar el plan de membresia");
                else {
                    if (respuesta.length > 0) {
                        res.render("planesMembresias/edit", { plan_membresia: respuesta[0] });
                    } else {
                        res.send("Error al intentar actualizar el plan de membresia, no existe");
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
    const { nombre_plan, duracion_meses, precio } = req.body;
    const { id } = req.params;

    if (isNaN(id)) {
        res.send("Error actualizando");
    } else {
        db.query(
            "UPDATE plan_membresia SET nombre_plan = ?, duracion_meses = ?, precio = ? WHERE id = ?",
            [nombre_plan, duracion_meses, precio, id],
            (error) => {
                if (error) {
                    res.send("Error actualizando el plan de membresia: " + error.message);
                    console.log(error);
                } else res.redirect("/planesMembresias");
            }
        );
    }
};
