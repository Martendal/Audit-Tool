CREATE DATABASE  IF NOT EXISTS `audit` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `audit`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: audit
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coefficient`
--

DROP TABLE IF EXISTS `coefficient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coefficient` (
  `idcoefficient` int(11) NOT NULL AUTO_INCREMENT,
  `Valeur` int(11) NOT NULL DEFAULT '0' COMMENT 'La valeur du coefficient',
  `Couleur` varchar(45) DEFAULT NULL COMMENT 'Couleur associée',
  PRIMARY KEY (`idcoefficient`),
  UNIQUE KEY `idcoefficient_UNIQUE` (`idcoefficient`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='La table des poids';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coefficient`
--

LOCK TABLES `coefficient` WRITE;
/*!40000 ALTER TABLE `coefficient` DISABLE KEYS */;
INSERT INTO `coefficient` VALUES (1,0,NULL),(2,1,NULL),(3,2,NULL),(4,3,NULL),(5,4,NULL),(6,5,NULL);
/*!40000 ALTER TABLE `coefficient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-27  2:57:28
