asdad
CREATE TABLE `cliente` (
    `Id` int(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `fecha_registro` date NOT NULL,
    `numero_telefono` int(10) NOT NULL
);