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
-- Table structure for table `package_question_list`
--

DROP TABLE IF EXISTS `package_question_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package_question_list` (
  `NomPackage` varchar(255) NOT NULL DEFAULT 'Package par défaut' COMMENT 'Le nom du package auquel la question appartient',
  `PackageID` varchar(45) NOT NULL DEFAULT '1' COMMENT 'L''ID du package',
  `QuestionID` int(11) NOT NULL COMMENT 'L''index de la question concernée',
  `DomaineID` int(11) DEFAULT NULL COMMENT 'L''index du domaine correspondant à la question',
  PRIMARY KEY (`PackageID`,`QuestionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table contenant la liste des questions contenues dans chaque package';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_question_list`
--

LOCK TABLES `package_question_list` WRITE;
/*!40000 ALTER TABLE `package_question_list` DISABLE KEYS */;
INSERT INTO `package_question_list` VALUES ('Package par défaut','1',1,1),('Package par défaut','1',2,1),('Package par défaut','1',3,1),('Package par défaut','1',4,1),('Package par défaut','1',5,1),('Package par défaut','1',6,1),('Package par défaut','1',7,1),('Package par défaut','1',8,1),('Package par défaut','1',9,1),('Package par défaut','1',10,1),('Package par défaut','1',11,1),('Package par défaut','1',12,1),('Package par défaut','1',13,1),('Package par défaut','1',14,1),('Package par défaut','1',15,1),('Package par défaut','1',16,1),('Package par défaut','1',17,1),('Package par défaut','1',18,1),('Package par défaut','1',19,1),('Package par défaut','1',20,1),('Package par défaut','1',21,1),('Package par défaut','1',22,1),('Package par défaut','1',23,1),('Package par défaut','1',24,2),('Package par défaut','1',25,2),('Package par défaut','1',26,2),('Package par défaut','1',27,2),('Package par défaut','1',28,2),('Package par défaut','1',29,2),('Package par défaut','1',30,3),('Package par défaut','1',31,3),('Package par défaut','1',32,3),('Package par défaut','1',33,3),('Package par défaut','1',34,3),('Package par défaut','1',35,3),('Package par défaut','1',36,3),('Package par défaut','1',37,4),('Package par défaut','1',38,4),('Package par défaut','1',39,4),('Package par défaut','1',40,4),('Package par défaut','1',41,4),('Package par défaut','1',42,4),('Package par défaut','1',43,4),('Package par défaut','1',44,4),('Package par défaut','1',45,4),('Package par défaut','1',46,4),('Package par défaut','1',47,4),('Package par défaut','1',48,4),('Package par défaut','1',49,4),('Package par défaut','1',50,4),('Package par défaut','1',51,4),('Package par défaut','1',52,4),('Package par défaut','1',53,4),('Package par défaut','1',54,5),('Package par défaut','1',55,5),('Package par défaut','1',56,5),('Package par défaut','1',57,5);
/*!40000 ALTER TABLE `package_question_list` ENABLE KEYS */;
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
