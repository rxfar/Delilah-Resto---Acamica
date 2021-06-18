-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2021 a las 22:13:59
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(20) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `user`, `pass`, `name`, `lastname`, `email`, `phone`, `adress`, `is_admin`) VALUES
(1, 'rp123', 'pass', 'Robert', 'Plant', 'robertplant@gmail.com', 1166666667, 'Reino Unido 83', 0),
(3, 'rxxfar', 'pass', 'Rosario', 'Farias', 'rosario@gmail.com', 1166666666, '221 Baker St', 1),
(5, 'IndioSol', 'indio666', 'Carlos Alberto', 'Solari', 'isolari@gmail.com', 1166666667, 'Una direccion cualquiera', 0),
(7, 'Pepe', 'pass', 'Pepe', 'Blanco', 'pepe@gmail.com', 1166666657, 'Una direccion cualquiera', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` enum('New','Confirmed','InProgress','Sent','Delivered','Canceled') NOT NULL DEFAULT 'New',
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_id` enum('Cash','Creditcard','Debitcard') NOT NULL,
  `total` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `status`, `date`, `payment_id`, `total`, `customer_id`) VALUES
(1, 'New', '2021-06-18 20:06:07', 'Creditcard', 3600, 1),
(2, 'New', '2021-06-18 20:06:39', 'Creditcard', 3600, 1),
(3, 'New', '2021-06-18 20:06:50', 'Creditcard', 3600, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_detail`
--

CREATE TABLE `orders_detail` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quant` int(11) NOT NULL,
  `unity_price` int(11) NOT NULL,
  `total_prod_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `orders_detail`
--

INSERT INTO `orders_detail` (`detail_id`, `order_id`, `product_id`, `quant`, `unity_price`, `total_prod_price`) VALUES
(139, 1, 5, 2, 1000, 2000),
(140, 1, 4, 2, 800, 1600),
(141, 2, 5, 2, 1000, 2000),
(142, 2, 4, 2, 800, 1600),
(143, 3, 5, 2, 1000, 2000),
(144, 3, 4, 2, 800, 1600);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product` varchar(20) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `image_id` int(11) NOT NULL,
  `disponibility` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `product`, `description`, `price`, `image_id`, `disponibility`) VALUES
(4, 'Comida de prueba', 'Esta es otra comida de prueba', '800', 4, 1),
(5, 'Comida de prueba 2', 'Esta es otra comida de prueba', '1000', 4, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`user`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerid` (`customer_id`);

--
-- Indices de la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Filtros para la tabla `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD CONSTRAINT `productid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
