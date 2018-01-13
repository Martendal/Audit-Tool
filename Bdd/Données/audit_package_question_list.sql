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
  `NomPackage` varchar(255) NOT NULL DEFAULT 'Package par defaut' COMMENT 'Le nom du package auquel la question appartient',
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
INSERT INTO `package_question_list` VALUES ('Test','1',1,1),('Test','1',2,1),('Test','1',3,1),('Test','1',4,1),('Test','1',5,1),('Test','1',6,1),('Test','1',7,1),('Test','1',8,1),('Test','1',9,1),('Test','1',10,1),('Test','1',11,1),('Test','1',12,1),('Test','1',13,1),('Test','1',14,1),('Test','1',15,1),('Test','1',16,1),('Test','1',17,1),('Test','1',18,1),('Test','1',19,1),('Test','1',20,1),('Test','1',21,1),('Test','1',22,1),('Test','1',23,1),('Test','1',24,2),('Test','1',25,2),('Test','1',26,2),('Test','1',27,2),('Test','1',28,2),('Test','1',29,2),('Test','1',58,6),('Test','1',59,6);
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

-- Dump completed on 2018-01-13  0:30:34
