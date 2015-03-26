-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2015 alle 00:31
-- Versione del server: 5.6.15-log
-- PHP Version: 5.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `planning_generale`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `dati`
--

CREATE TABLE IF NOT EXISTS `dati` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CELLA` varchar(50) NOT NULL,
  `VALORE` int(11) NOT NULL,
  `PERIODO` int(11) NOT NULL,
  `PROGETTO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UID_ID_CELLA` (`ID_CELLA`),
  UNIQUE KEY `UID_ID` (`ID`),
  KEY `IDX_PERIODO` (`PERIODO`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
