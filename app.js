const express = require('express');
// const session = require('express-session');
// const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const clienteRouter = require('./routes/clienteRoutes');
const entrenadorRouter = require('./routes/entrenadorRouter');
const clientePlanRouter= require('./routes/clientePlanRouter');
const planMembresiaRouter = require('./routes/planMenbresiaRoutes');
const sesionRouter = require('./routes/sesionRoutes');

require('dotenv').config({path: './gesal/.env'})

const app = express();
const port = process.env.SERVICE_PORT;
// la carpeta public tiene contenido estático
app.use(express.static('public'));
;
/**
 * Configuramos el motor de plantillas 
 * 
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// login

app.use('/clientes', clienteRouter);
app.use('/entrenadores', entrenadorRouter);
app.use('/clientes_planes', clientePlanRouter);
app.use('/sesiones', sesionRouter);
app.use('/planesMembresias', planMembresiaRouter);


/**
 * Siempre lo último que hacemos
 */
app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });

