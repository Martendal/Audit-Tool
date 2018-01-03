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
-- Table structure for table `package_question_list`
--

DROP TABLE IF EXISTS `package_question_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package_question_list` (
  `idpackage_question_list` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL DEFAULT 'Package par defaut' COMMENT 'Le nom du package auquel la question appartient',
  `QuestionID` int(11) DEFAULT NULL COMMENT 'L''index de la question concernée',
  `DomaineID` int(11) DEFAULT NULL COMMENT 'L''index du domaine correspondant à la question',
  PRIMARY KEY (`idpackage_question_list`),
  UNIQUE KEY `QuestionID_UNIQUE` (`QuestionID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='Table contenant la liste des questions contenues dans chaque package';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_question_list`
--

LOCK TABLES `package_question_list` WRITE;
/*!40000 ALTER TABLE `package_question_list` DISABLE KEYS */;
INSERT INTO `package_question_list` VALUES (1,'Test',24,2),(2,'Test',25,2),(3,'Test',26,2),(4,'Test',27,2),(5,'Test',28,2),(6,'Test',29,2),(7,'Test',58,6),(8,'Test',59,6),(9,'Test',1,1),(10,'Test',2,1),(11,'Test',3,1),(12,'Test',4,1),(13,'Test',5,1),(14,'Test',6,1),(15,'Test',7,1),(16,'Test',8,1),(17,'Test',9,1),(18,'Test',10,1),(19,'Test',11,1),(20,'Test',12,1),(21,'Test',13,1),(22,'Test',14,1),(23,'Test',15,1),(24,'Test',16,1),(25,'Test',17,1),(26,'Test',18,1),(27,'Test',19,1),(28,'Test',20,1),(29,'Test',21,1),(30,'Test',22,1),(31,'Test',23,1);
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

-- Dump completed on 2018-01-03 19:05:39
