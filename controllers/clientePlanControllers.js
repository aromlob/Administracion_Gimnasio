const { response } = require("express");
const db = require("../db");
/**
 * Esta función realiza una consulta a la base de datos para obtener
 * todos los registros de la tabla `cliente_plan`. Los resultados se envían
 * al cliente_plan a través de la plantilla `clientes_planes/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_plan = (req, res) => {
  db.query("SELECT * FROM `cliente_plan`", (err, response) => {
    if (err) res.send("Error al buscar el cliente_plan");
    else res.render("clientes_planes/list", { cliente_planes: response });
  });
};
/**
 * Muestra el formulario para agregar un cliente_plan.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planAddFormulario = (req, res) => {
  res.render("clientes_planes/add");
};

/**
 * Añadimos a la base de datos un cliente_plan
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planAdd = (req, res) => {
  const { id_cliente, id_plan, fecha_inicio } = req.body;
  db.query(
    `INSERT INTO cliente_plan (id_cliente, id_plan, fecha_inicio) VALUES (?,?,'?')`,
    [id_cliente, id_plan, fecha_inicio],
    (error) => {
      if (error) res.send("Error insertando cliente_plan: " + error.message);
      else res.redirect("/clientes_planes");
    }
  );
};

/**
 * Muestra el formulario para borrar un cliente_plan.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planDeleteFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send("Parámetros incorrectos");
  else
    db.query(
      "SELECT * FROM cliente_plan WHERE id=?",
      [id],
      (error, respuesta) => {
        if (error) res.send("Error al intentar borrar el cliente_plan");
        else {
          if (respuesta.length > 0) {
            res.render("clientes_planes/delete", {
              cliente_plan: respuesta[0],
            });
          } else {
            res.send("Error al intentar borrar el cliente_plan, no existe");
          }
        }
      }
    );
};

/**
 * Borramos a un cliente_plan
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planDel = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.send("Error borrando");
  } else {
    db.query(
      "DELETE FROM cliente_plan WHERE id=?",
      [id],
      (error) => {
        if (error) res.send("Error borrando cliente_plan: " + error.message);
        else res.redirect("/clientes_planes");
      }
    );
  }
};

/**
 * Muestra el formulario para editar un cliente_plan.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planEditFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send("Parámetros incorrectos");
  else
    db.query(
      "SELECT * FROM cliente_plan WHERE id=?",
      [id],
      (error, respuesta) => {
        if (error) res.send("Error al intentar actualizar el cliente_plan");
        else {
          if (respuesta.length > 0) {
            res.render("clientes_planes/edit", { cliente_plan: respuesta[0] });
          } else {
            res.send("Error al intentar actualizar el cliente_plan, no existe");
          }
        }
      }
    );
};

/**
 * Editamos a un cliente_plan
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente_planEdit = (req, res) => {
  const { id_cliente, id_plan, fecha_inicio } = req.body;
  id_cliente, (id_plan = req.params);

  if (isNaN(id_cliente, id_plan)) {
    res.send("Error actualizando");
  } else {
    db.query(
      "UPDATE cliente_plan SET id_cliente = ?, id_plan = ?, fecha_inicio = ? WHERE id=?",
      [id_cliente, id_plan, fecha_inicio],
      (error) => {
        if (error) {
          res.send("Error actualizando cliente_plan: " + error.message);
          console.log(error);
        } else res.redirect("/clientes_planes");
      }
    );
  }
};


