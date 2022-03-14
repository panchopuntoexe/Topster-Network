-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2022 a las 00:50:38
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbtopstersnewtwork`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `ID_COMENTARIO` int(11) NOT NULL,
  `ID_POST` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `DESCRIPCION_COMENTARIO` varchar(100) DEFAULT NULL,
  `FECHA_COMENTARIO` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`ID_COMENTARIO`, `ID_POST`, `ID_USUARIO`, `DESCRIPCION_COMENTARIO`, `FECHA_COMENTARIO`) VALUES
(2, 1, 2, 'Holi bb muy buen topster', '2022-02-26 17:23:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `ID_POST` int(11) NOT NULL,
  `FOTO_POST` varchar(2083) DEFAULT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `DESCRIPCION_POST` varchar(256) DEFAULT NULL,
  `FECHA_POST` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`ID_POST`, `FOTO_POST`, `ID_USUARIO`, `DESCRIPCION_POST`, `FECHA_POST`) VALUES
(1, 'https://preview.redd.it/4coglk0q4j961.jpg?auto=webp&s=549c77f3ea59823b6637cde0576ffc7a48b39e9d', 1, 'Mejores Álbums 2021', '2022-02-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reacciones`
--

CREATE TABLE `reacciones` (
  `ID_REACCION` int(11) NOT NULL,
  `ID_TIPO_REACCION` int(11) NOT NULL,
  `ID_POST` int(11) DEFAULT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reacciones`
--

INSERT INTO `reacciones` (`ID_REACCION`, `ID_TIPO_REACCION`, `ID_POST`, `ID_USUARIO`) VALUES
(2, 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento`
--

CREATE TABLE `seguimiento` (
  `ID_RELACION` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `USU_ID_USUARIO` int(11) NOT NULL,
  `FECHA_RELACION` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `seguimiento`
--

INSERT INTO `seguimiento` (`ID_RELACION`, `ID_USUARIO`, `USU_ID_USUARIO`, `FECHA_RELACION`) VALUES
(7, 1, 2, '2022-02-21 15:49:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_reaccion`
--

CREATE TABLE `tipo_de_reaccion` (
  `ID_TIPO_REACCION` int(11) NOT NULL,
  `NOMBRE_REACCION` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_de_reaccion`
--

INSERT INTO `tipo_de_reaccion` (`ID_TIPO_REACCION`, `NOMBRE_REACCION`) VALUES
(1, 'Like'),
(2, 'Corazon'),
(3, 'Feliz'),
(4, 'Triste'),
(5, 'Enojado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_USUARIO` int(11) NOT NULL,
  `FOTO_PERFIL` varchar(2083) DEFAULT NULL,
  `NICKNAME` varchar(25) DEFAULT NULL,
  `BIOGRAFIA` varchar(100) DEFAULT NULL,
  `APELLIDOS_USUARIO` varchar(50) DEFAULT NULL,
  `NOMBRES_USUARIO` varchar(50) DEFAULT NULL,
  `CORREO` varchar(50) DEFAULT NULL,
  `CLAVE` varchar(50) DEFAULT NULL,
  `FECHA_NACIMIENTO` date DEFAULT NULL,
  `GENERO` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USUARIO`, `FOTO_PERFIL`, `NICKNAME`, `BIOGRAFIA`, `APELLIDOS_USUARIO`, `NOMBRES_USUARIO`, `CORREO`, `CLAVE`, `FECHA_NACIMIENTO`, `GENERO`) VALUES
(1, 'https://video-images.vice.com/articles/5900d39c23564a25d4ad7c73/lede/1493226482798-damn-k-dot.jpeg', 'panchpuntoexe', 'Comic Fan\r\nCOMIC DAN', 'García Mosquera', 'Francisco Javier', 'francisco.garcia01@epn.edu.ec', '123456789', '1999-07-06', 'Masculino'),
(2, 'https://i.ytimg.com/vi/12NbVFrX-Vo/mqdefault.jpg', 'paulmantra', 'la T y la z', 'Mantra', 'Paul', 'david.morales@epn.edu.ec', '123456789', '2000-07-06', 'Non Binary');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`ID_COMENTARIO`),
  ADD KEY `FK_RELACION_5` (`ID_USUARIO`),
  ADD KEY `FK_RELACION_POST_COMENTARIO` (`ID_POST`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID_POST`),
  ADD KEY `FK_RELACION_USUARIO_POST` (`ID_USUARIO`);

--
-- Indices de la tabla `reacciones`
--
ALTER TABLE `reacciones`
  ADD PRIMARY KEY (`ID_REACCION`),
  ADD KEY `FK_RELACION_POST_REACCION` (`ID_POST`),
  ADD KEY `FK_RELACION_TIPODEREACCION` (`ID_TIPO_REACCION`),
  ADD KEY `FK_RELACION_USUARIO_REACCION` (`ID_USUARIO`);

--
-- Indices de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`ID_RELACION`),
  ADD KEY `FK_RELACION_SEGUIDOR_USUARIO` (`ID_USUARIO`),
  ADD KEY `FK_RELACION_USUARIO_SEGUIDOR` (`USU_ID_USUARIO`);

--
-- Indices de la tabla `tipo_de_reaccion`
--
ALTER TABLE `tipo_de_reaccion`
  ADD PRIMARY KEY (`ID_TIPO_REACCION`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `ID_COMENTARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `ID_POST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reacciones`
--
ALTER TABLE `reacciones`
  MODIFY `ID_REACCION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  MODIFY `ID_RELACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_de_reaccion`
--
ALTER TABLE `tipo_de_reaccion`
  MODIFY `ID_TIPO_REACCION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `FK_RELACION_5` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  ADD CONSTRAINT `FK_RELACION_POST_COMENTARIO` FOREIGN KEY (`ID_POST`) REFERENCES `post` (`ID_POST`);

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_RELACION_USUARIO_POST` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`);

--
-- Filtros para la tabla `reacciones`
--
ALTER TABLE `reacciones`
  ADD CONSTRAINT `FK_RELACION_POST_REACCION` FOREIGN KEY (`ID_POST`) REFERENCES `post` (`ID_POST`),
  ADD CONSTRAINT `FK_RELACION_TIPODEREACCION` FOREIGN KEY (`ID_TIPO_REACCION`) REFERENCES `tipo_de_reaccion` (`ID_TIPO_REACCION`),
  ADD CONSTRAINT `FK_RELACION_USUARIO_REACCION` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`);

--
-- Filtros para la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `FK_RELACION_SEGUIDOR_USUARIO` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  ADD CONSTRAINT `FK_RELACION_USUARIO_SEGUIDOR` FOREIGN KEY (`USU_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
