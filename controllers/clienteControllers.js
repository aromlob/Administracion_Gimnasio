const db = require("../db");
/**
 * Esta función realiza una consulta a la base de datos para obtener 
 * todos los registros de la tabla `cliente`. Los resultados se envían 
 * al cliente a través de la plantilla `clientes/list`.
 * @param {*} req -> El objeto de solicitud de Express.
 * @param {*} res -> El objeto de respuesta de Express.
 */
exports.cliente = (req, res) => {
    db.query(`SELECT * FROM cliente`, (err, response) => {
        if (err) res.send("Error al buscar el cliente");
        else res.render("clientes/list", { clientes: response });
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
        `INSERT INTO cliente (nombre, email, fecha_registro, numero_telefono) VALUES (?,?,?,?)`,
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
    const { id} = req.params;
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            `SELECT * FROM cliente WHERE id=?`,
            [id],
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
    const {id} = req.params;

    if (isNaN(id)) {
        res.send("Error borrando");
    } else {
        db.query(
            `DELETE FROM cliente WHERE id=?`,
            [id],
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
    const { id } = req.params;
    if (isNaN(id)) res.send("Parámetros incorrectos");
    else
        db.query(
            `SELECT * FROM cliente WHERE id=?`,
            [id],
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
    const { id } = req.params;

    if (isNaN(id)) {
        res.send("Error actualizando");
    } else {
        db.query(
            `UPDATE cliente SET nombre = ?, email = ?, numero_telefono = ? WHERE id = ?`,
            [nombre, email, numero_telefono, id],
            (error) => {
                if (error) {
                    res.send("Error actualizando cliente: " + error.message);
                    console.log(error);
                } else res.redirect("/clientes");
            }
        );
    }
};


exports.planesPorCliente = (req, res) => {

    const { id } = req.params;
    if (isNaN(id)) {
        res.send("Error id");
    } else {
        db.query(
            `SELECT * FROM cliente WHERE cliente.id = ?`,
            [id],
            (errorCliente, clienteData)=>{
                if(!errorCliente)
                    db.query(
                        `SELECT 
                                c.id, 
                                c.nombre, 
                                pm.nombre_plan, 
                                pm.precio, 
                                cp.fecha_inicio
                            FROM cliente c
                            JOIN 
                                cliente_plan cp ON c.id = cp.id_cliente
                            JOIN 
                                plan_membresia pm ON cp.id_plan = pm.id
                            WHERE 
                                c.id = ?;`,
                        [id],
                        (error, response) => {
                            if (error)
                                res.send("Error selecionando el plan cliente" + error.message);
                            else{
                                console.log(response);
                                res.render("clientes/planes", { clientes: response, clienteData:clienteData[0] });
                            }
                        }
                    );
            }
        )
    }
};

exports.asociarClientePlanAddFormulario = (req, res) =>{
    const {id} = req.params;
    
    if(isNaN(id)){
        res.send('Error id cliente inválido');
    }else{
        db.query(
            `SELECT pm.id, pm.nombre_plan FROM plan_membresia pm
                WHERE pm.id NOT IN(
                    SELECT id_plan FROM cliente_plan
                    WHERE id_cliente=?)`,
            [id],
            (error, planes) =>{
                if(error){
                    res.send('Error al obtener los planes');
                }else{
                    res.render('clientes/planesAdd', {planes, clienteId: id});
                }
            }
        );
    }
}

exports.asociarClientePlanAdd = (req, res) =>{
    const {id} = req.params;
    const {planId} = req.body;
    const fecha_inicio = new Date().toISOString()
    const fecha = fecha_inicio.split("T");
    const fechaPlan = fecha[0];
    if(isNaN(id) || isNaN(planId)){
        res.send('Error ids inválidos');
    }else{
        db.query(
            `INSERT INTO cliente_plan (id_cliente, id_plan, fecha_inicio) VALUES (?,?,?)`,
            [id, planId, fechaPlan],
            (error) =>{
                if(error){
                    res.send('Error al asociar el plan con el cliente');
                }else{
                    res.redirect(`/clientes/${id}/planes`);
                }
            }
        );
    }
}

exports.desasociarClientePlanDeleteFormulario = (req, res) =>{
    const {id} = req.params;
    
    if(isNaN(id)){
        res.send('Error id cliente inválido');
    }else{
        db.query(
            `SELECT plan_membresia.* 
            FROM cliente_plan
            JOIN plan_membresia ON cliente_plan.id_plan = plan_membresia.id
            WHERE cliente_plan.id_cliente = ?`,
            [id],
            (error, planes) =>{
                if(error){
                    res.send('Error al obtener los planes');
                }else{
                    res.render('clientes/planesDelete', {planes, clienteId: id});
                }
            }
        );
    }
}

exports.desasociarClientePlanDelete = (req, res) =>{

    const {id} = req.params;
    const {planId} = req.body;
    if(isNaN(id) || isNaN(planId)){
        res.send('Error ids inválidos');
    }else{
        db.query(
            `DELETE FROM cliente_plan WHERE id_cliente = ? AND id_plan = ?`,
            [id, planId],
            (error) =>{
                if(error){
                    res.send('Error al asociar el plan con el cliente');
                }else{
                    res.redirect(`/clientes/${id}/planes`);
                }
            }
        );
    }
}