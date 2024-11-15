const mysql = require('mysql2');
//const bcrypt = require('bcrypt');
require('dotenv').config({ path: 'gesal/.env' });

/**
 * Conexión a la base de datos
 */
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,  // Debería ser 'localhost'
    port: process.env.MYSQL_PORT,  // Debe ser '33308'
    user: process.env.MYSQL_USERNAME,  // 'root'
    password: process.env.MYSQL_ROOT_PASSWORD,  // 'jkb8kvhgcvhj7'
    database: process.env.MYSQL_DATABASE  // 'gym'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = db;
