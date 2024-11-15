CREATE DATABASE IF NOT EXISTS `gym`;

USE `gym`;

DROP TABLE IF EXISTS `cliente`;
DROP TABLE IF EXISTS `entrenador`;
DROP TABLE IF EXISTS `plan_membresia`;
DROP TABLE IF EXISTS `sesion`;
DROP TABLE IF EXISTS `cliente_plan`;

CREATE TABLE `cliente` (
    `Id_cliente` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(150) NOT NULL,
    `email` varchar(150) NOT NULL,
    `fecha_registro` date NOT NULL,
    `numero_telefono` varchar(15) NOT NULL
);

CREATE TABLE `entrenador` (
    `Id_entrenador` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(150) NOT NULL,
    `especialidad` ENUM('pesas', 'cardio', 'yoga', 'spinning', 'crossfit') NOT NULL,
    `nivel_experiencia` ENUM('experto', 'avanzado', 'intermedio', 'principiante') NOT NULL
);

CREATE TABLE `plan_membresia` (
    `Id_plan` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre_plan` varchar(150) NOT NULL,
    `duracion_meses` int NOT NULL,
    `precio` float NOT NULL
);

CREATE TABLE `sesion` (
    `Id_sesion` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha_inicio` date NOT NULL,
    `hora_inicio` time NOT NULL,
    `duracion_min` int NOT NULL,
    `id_cliente_sesion` INT NOT NULL,
    `id_entrenador_sesion` INT NOT NULL,
    FOREIGN KEY (`id_cliente_sesion`) REFERENCES `cliente`(`Id_cliente`),
    FOREIGN KEY (`id_entrenador_sesion`) REFERENCES `entrenador`(`Id_entrenador`)
);

CREATE TABLE `cliente_plan` (
    `Id_cliente_plan` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cliente` INT NOT NULL,
    `plan` INT NOT NULL,
    `fecha_inicio` DATE NOT NULL, 
    FOREIGN KEY (`cliente`) REFERENCES `cliente`(`Id_cliente`),
    FOREIGN KEY (`plan`) REFERENCES `plan_membresia`(`Id_plan`)
);

-- para los logins 
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL, 
    `enabled` BOOL,
    tipo ENUM('ENTRENADOR', 'CLIENTE', 'ADMIN'),  
    cliente INT REFERENCES cliente(Id_cliente),
    entrenador INT REFERENCES entrenador(Id_entrenador)
);


INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Luis', 'cliente1@gymcorreo.com', '2022-02-20 00:00:00', '555-6983');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Sofia', 'cliente2@gymcorreo.com', '2016-03-23 00:00:00', '555-6896');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Ana', 'cliente3@gymcorreo.com', '2016-02-02 00:00:00', '555-6864');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Ana', 'cliente4@gymcorreo.com', '2008-02-15 00:00:00', '555-4611');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Sofia', 'cliente5@gymcorreo.com', '2010-01-07 00:00:00', '555-1593');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Luis', 'cliente6@gymcorreo.com', '2013-05-28 00:00:00', '555-1116');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Sofia', 'cliente7@gymcorreo.com', '2008-05-04 00:00:00', '555-2996');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('José', 'cliente8@gymcorreo.com', '1992-06-26 00:00:00', '555-9572');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('Lucía', 'cliente9@gymcorreo.com', '2019-09-06 00:00:00', '555-3335');
INSERT INTO cliente (`nombre`, `email`, `fecha_registro`, `numero_telefono`) VALUES ('María', 'cliente10@gymcorreo.com', '1990-09-22 00:00:00', '555-7920');


INSERT INTO entrenador (`nombre`, `especialidad`, `nivel_experiencia`) VALUES('Lucía', 'Crossfit', 'Intermedio');
INSERT INTO entrenador (`nombre`, `especialidad`, `nivel_experiencia`) VALUES('José', 'Pesas', 'Avanzado');
INSERT INTO entrenador (`nombre`, `especialidad`, `nivel_experiencia`) VALUES('María', 'Crossfit', 'Avanzado');
INSERT INTO entrenador (`nombre`, `especialidad`, `nivel_experiencia`) VALUES('Lucía', 'Crossfit', 'Intermedio');
INSERT INTO entrenador (`nombre`, `especialidad`, `nivel_experiencia`) VALUES('Carlos', 'Pesas', 'Principiante');

INSERT INTO plan_membresia (`nombre_plan`, `duracion_meses`, `precio`) VALUES ('Básico Anual', 12, 214.63);
INSERT INTO plan_membresia (`nombre_plan`, `duracion_meses`, `precio`) VALUES ('Premium Mensual', 6, 181.74);
INSERT INTO plan_membresia (`nombre_plan`, `duracion_meses`, `precio`) VALUES ('Elite Mensual', 3, 76.22);

INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2000-12-01','17:00:00', 45, 8, 2);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('1991-12-14','09:00:00', 45, 4, 3);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2021-05-26','10:00:00', 45, 6, 5);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2011-05-05','11:00:00', 60, 9, 4);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2007-09-23','09:00:00', 30, 8, 1);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2005-09-29','21:00:00', 90, 6, 1);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2008-08-30','15:00:00', 45, 8, 3);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2005-10-02','07:00:00', 90, 9, 4);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2011-04-12','11:00:00', 60, 5, 3);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2001-01-09','12:00:00', 60, 5, 3);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('1999-03-04','20:00:00', 30, 8, 2);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2001-08-05','07:00:00', 30, 8, 5);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('1991-12-28','15:00:00', 90, 6, 1);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('1996-11-06','20:00:00', 90, 9, 3);
INSERT INTO sesion (`fecha_inicio`, `hora_inicio`, `duracion_min`, `id_cliente_sesion`, `id_entrenador_sesion`) VALUES ('2000-03-23','16:00:00', 45, 1, 1);

INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(3, 1, '2005-11-08 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(9, 3, '1998-07-03 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(2, 1, '2021-01-26 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(2, 1, '1995-10-28 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(3, 3, '2003-09-21 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(9, 1, '2016-09-21 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(9, 1, '2020-12-23 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(3, 1, '2006-08-14 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(6, 1, '2016-04-13 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(10, 1,' 2018-04-18 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(4, 1, '2021-08-28 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(10, 3,' 2005-05-31 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(2, 2, '2005-07-14 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(10, 1,' 2011-01-26 00:00:00');
INSERT INTO cliente_plan (`cliente`,`plan`,`fecha_inicio`) VALUES(6, 1, '2017-07-26 00:00:00');

INSERT INTO `users` (`username`, `password`, `enabled`, `tipo`)
	VALUES ('admin', '1234', 1, 'ADMIN');
