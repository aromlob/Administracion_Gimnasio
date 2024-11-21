// Importa el módulo bcrypt para la gestión de contraseñas y la conexión a la base de datos
const bcrypt = require('bcrypt');
const db = require('../db');

/**
 * Controlador para mostrar el formulario de registro
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.registerForm = (req, res) => {
    res.render('register'); // Renderiza el formulario de registro de usuario
};

/**
 * Controlador para registrar un nuevo usuario
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.register = (req, res) => {
    const datosUsuario = req.body;
    datosUsuario.rol = 'cliente'; // Asigna el rol 'cliente' al nuevo usuario
    datosUsuario.password = bcrypt.hashSync(datosUsuario.password, 10); // Cifra la contraseña del usuario usando bcrypt con un salt de 10 rondas

    try {
        // Realiza la inserción del nuevo usuario en la base de datos. El campo 'enabled' se establece en 0 (usuario no activado aún)
        db.query(
            'INSERT INTO users (username, password, enabled) VALUES (?,?,?)',
            [datosUsuario.username, datosUsuario.password, 0],
            (error, respuesta) => {
                if (error) {
                    res.send('ERROR INSERTANDO usuario: ' + req.body); // Si ocurre un error al insertar, se muestra un mensaje
                } else {
                    // Si la inserción es exitosa, se redirige a la página de mensaje con confirmación
                    res.render('mensaje', { tituloPagina: 'Registro usuarios', mensajePagina: 'Usuario registrado' });
                }
            }
        );
    } catch (error) {
        // Si ocurre un error en el bloque try, se muestra un mensaje de error
        res.render('mensaje', { tituloPagina: 'ERROR', mensajePagina: 'Error: ' + error });
    }
};

/**
 * Controlador para mostrar el formulario de inicio de sesión
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.loginForm = (req, res) => {
    res.render('login'); // Renderiza el formulario de login de usuario
};

/**
 * Controlador para autenticar un usuario y establecer la sesión
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.login = (req, res) => {
    const { username, password } = req.body; // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud

    // Consulta a la base de datos para obtener el usuario correspondiente
    db.query(
        'SELECT * FROM users WHERE username=?', // Consulta que busca al usuario por su nombre de usuario
        [username],
        (error, rsUsuario) => {
            if (error) {
                // Si ocurre un error en la consulta, se muestra un mensaje
                res.render('mensaje', { tituloPagina: 'LOGIN', mensajePagina: 'Usuario no encontrado' });
            } else {
                const usuario = rsUsuario[0]; // Recupera el primer usuario encontrado (si existe)
                if (usuario) {
                    // Verifica si el usuario está habilitado (enabled = 1) y si la contraseña proporcionada coincide
                    if (usuario.enabled == 1 && bcrypt.compareSync(password, usuario.password)) {
                        req.session.user = usuario.username; // Si las credenciales son correctas, se guarda el nombre de usuario en la sesión
                        res.redirect('/'); // Redirige al usuario a la página principal
                    } else {
                        // Si el usuario está desactivado o la contraseña no es correcta, muestra un mensaje
                        res.render('mensaje', { tituloPagina: 'LOGIN', mensajePagina: 'Usuario desactivado' });
                    }
                } else {
                    // Si el usuario no se encuentra o las credenciales son incorrectas, se muestra un mensaje de error
                    res.render('mensaje', { username: req.session.user, tituloPagina: 'LOGIN', mensajePagina: 'Usuario no encontrado o credenciales inválidas' });
                }
            }
        }
    );
};

/**
 * Controlador para cerrar la sesión del usuario
 * @param {*} req -> El objeto de solicitud de Express
 * @param {*} res -> El objeto de respuesta de Express
 */
exports.logout = (req, res) => {
    req.session.destroy(); // Destruye la sesión del usuario
    res.redirect('/auth/login'); // Redirige al usuario al formulario de inicio de sesión
};
