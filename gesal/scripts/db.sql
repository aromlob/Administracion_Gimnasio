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
    `numero_telefono` int NOT NULL
);

CREATE TABLE `entrenador` (
    `Id_entrenador` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(150) NOT NULL,
    `especialidad` ENUM('pesas', 'cardio', 'yoga', 'spinning') NOT NULL,
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
    `cliente` INT NOT NULL,
    `plan` INT NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    PRIMARY KEY (`cliente`, `plan`), 
    FOREIGN KEY (`cliente`) REFERENCES `cliente`(`Id_cliente`),
    FOREIGN KEY (`plan`) REFERENCES `plan_membresia`(`Id_plan`)
);
