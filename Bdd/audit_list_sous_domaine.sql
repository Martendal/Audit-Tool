CREATE DATABASE  IF NOT EXISTS `audit` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `audit`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: audit
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
-- Table structure for table `list_sous_domaine`
--

DROP TABLE IF EXISTS `list_sous_domaine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_sous_domaine` (
  `idlist_sous_domaine` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''index dans la table',
  `idmain_domaine` int(11) NOT NULL COMMENT 'L''index du domaine contenant le sous-domaine',
  `idsous_domaine` int(11) NOT NULL COMMENT 'L''index du sous-domaine',
  PRIMARY KEY (`idlist_sous_domaine`),
  UNIQUE KEY `idlist_sous_domaine_UNIQUE` (`idlist_sous_domaine`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='Table contenant les sous-domaines de chaque domaine';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_sous_domaine`
--

LOCK TABLES `list_sous_domaine` WRITE;
/*!40000 ALTER TABLE `list_sous_domaine` DISABLE KEYS */;
INSERT INTO `list_sous_domaine` VALUES (1,1,2),(2,1,3),(3,2,3),(4,1,4),(5,2,9),(6,1,9),(7,1,9),(8,2,10),(9,1,10),(10,2,11),(11,1,11),(12,3,12),(13,1,12),(14,2,12),(15,3,13),(16,1,13),(17,2,13);
/*!40000 ALTER TABLE `list_sous_domaine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-08 12:50:14
