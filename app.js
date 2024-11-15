const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const clienteRouter = require('./routes/clienteRoutes');
const entrenadorRouter = require('./routes/entrenadorRouter');
const clientePlanRouter= require('./routes/clientePlanRouter');
const planMembresiaRouter = require('./routes/planMenbresiaRoutes');
const sesionRouter = require('./routes/sesionRoutes');
const authRouter = require('./routes/authRouter');


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

/**
 * Middleware para llevar la gestión de sesiones.
 * Si no hay sesión iniciada, arrancamos...
 */
app.use(session({
    secret: 'misupersecretoquenadiesabe',
    resave: true,
    saveUninitialized: false
}));

// cargarmos y configuramos el middleware para gestión de sesiones
app.use((req,res,next)=>{
    res.locals.currentUser = req.session.user;
    if (!req.session.user){        
        if (req.path.startsWith('/auth/login') ||
            req.path.startsWith('/auth/register')){
            // para hacer el GET/POST al login
            next();            
        } else {
            // cuando es una ruta distinta a login
            // me redirecciona al login
            return res.redirect('/auth/login');
        }
    } else {
        // ya estamos logeados        
        next();
    }
});
const authorize = (roles) => {
    return (req, res, next) => {
        const { user } = req.session;
        if (!user || !roles.includes(user.rol)) {
            return res.render('mensaje', {mensajePagina:'No tienes permiso para acceder a esta página.'});
        }
        next();
    };
};


app.use('/clientes', clienteRouter);
app.use('/entrenadores', entrenadorRouter);
app.use('/clientes_planes', clientePlanRouter);
app.use('/sesiones', sesionRouter);
app.use('/planesMembresias', planMembresiaRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    if (req.session.user)
        res.render('index', {user: req.session.user, titulo: 'Inicio'})
    else 
        res.redirect('/login')
});

/**
 * Siempre lo último que hacemos
 */
app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });

