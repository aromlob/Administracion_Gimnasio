const db = require("../db");
/**
 * Esta función realiza una consulta a la base de datos para obtener 
 * todos los registros de la tabla `cliente`. Los resultados se envían 
 * al cliente a través de la plantilla `clientes/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente = (req, res) => {
    db.query("SELECT * FROM `cliente`", (err, response) => {
        if (err) res.send("Error al buscar el cliente");
        else res.render("clientes/list", { cliente: response });
    });
};
/**
 * Muestra el formulario para agregar un cliente.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express. 
 */
exports.clienteAddFormulario = (req, res) => {
    res.render("clientes/add");
};

/**
 * Añadimos a la base de datos un cliente 
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express. 
 */
exports.clienteAdd = (req, res) => {
    const { nombre, email, fecha_registro, numero_telefono } = req.body;
    db.query(
        "INSERT INTO cliente (nombre, email, fecha_registro, numero_telefono) VALUES (?,?,?,?)",
        [nombre, email, fecha_registro, numero_telefono],
        (error) => {
        if (error) res.send("Error insertando cliente: " + error.message);
        else res.redirect("/clientes");
        }
    );
};

/**
 * Muestra el formulario para borrar un cliente.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express. 
 */
exports.clienteDeleteFormulario = (req, res) => {
    const { Id_cliente } = req.params;
    if (isNaN(Id_cliente)) res.send("Parámetros incorrectos");
    else
        db.query(
        "SELECT * FROM cliente WHERE Id_cliente=?",
        [Id_cliente],
        (error, respuesta) => {
            if (error) res.send("Error al intentar borrar el cliente");
            else {
            if (respuesta.length > 0) {
                res.render("clientes/delete", { cliente: respuesta[0] });
            } else {
                res.send("Error al intentar borrar el cliente, no existe");
            }
            }
        }
        );
};

/**
 * Borramos a un cliente 
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.clienteDel = (req, res) => {
    const { Id_cliente } = req.params;

    if (isNaN(Id_cliente)) {
        res.send("Error borrando");
    } else {
        db.query(
        "DELETE FROM cliente WHERE Id_cliente=?",
        [Id_cliente],
        (error) => {
            if (error) res.send("Error borrando cliente: " + error.message);
            else res.redirect("/clientes");
        }
        );
    }
};

/**
 * Muestra el formulario para editar un cliente.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express. 
 */
exports.clienteEditFormulario = (req, res) => {
    const { Id_cliente } = req.params;
    if (isNaN(Id_cliente)) res.send("Parámetros incorrectos");
    else
        db.query(
        "SELECT * FROM cliente WHERE Id_cliente=?",
        [Id_cliente],
        (error, respuesta) => {
            if (error) res.send("Error al intentar actualizar el cliente");
            else {
            if (respuesta.length > 0) {
                res.render("clientes/edit", { cliente: respuesta[0] });
            } else {
                res.send("Error al intentar actualizar el cliente, no existe");
            }
            }
        }
    );
};

/**
 * Editamos a un cliente 
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.clienteEdit = (req, res) => {
    const { nombre, email, fecha_registro, numero_telefono } = req.body;
    const { Id_cliente } = req.params;

    if (isNaN(Id_cliente)) {
        res.send("Error actualizando");
    } else {
        db.query(
        "UPDATE cliente SET nombre = ?, email = ?, fecha_registro = ?, numero_telefono = ? WHERE Id_cliente = ?",
        [nombre, email, fecha_registro, numero_telefono, Id_cliente],
        (error) => {
            if (error) {
            res.send("Error actualizando cliente: " + error.message);
            console.log(error);
            } else res.redirect("/clientes");
        }
        );
    }
};
