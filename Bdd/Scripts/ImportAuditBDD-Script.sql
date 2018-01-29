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

-- Dump completed on 2018-01-29 20:47:42

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
-- Table structure for table `couleur`
--

DROP TABLE IF EXISTS `couleur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `couleur` (
  `idcouleur` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''index de la couleur',
  `Nom` varchar(45) NOT NULL DEFAULT 'Nom par defaut' COMMENT 'Le nom de la couleur',
  `Valeur` varchar(6) NOT NULL DEFAULT '000000' COMMENT 'Sa valeur en hexadecimal',
  PRIMARY KEY (`idcouleur`),
  UNIQUE KEY `idcouleur_UNIQUE` (`idcouleur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='la table des couleurs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couleur`
--

LOCK TABLES `couleur` WRITE;
/*!40000 ALTER TABLE `couleur` DISABLE KEYS */;
INSERT INTO `couleur` VALUES (1,'Rouge','FE0000');
/*!40000 ALTER TABLE `couleur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:42

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
-- Table structure for table `domaine`
--

DROP TABLE IF EXISTS `domaine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domaine` (
  `iddomaine` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''index du domaine',
  `Nom` varchar(45) NOT NULL DEFAULT 'Nom par defaut' COMMENT 'Le nom du domaine',
  `ParentID` int(11) NOT NULL DEFAULT '0' COMMENT 'L''index du domaine parent',
  `NumOfChild` int(11) NOT NULL DEFAULT '0' COMMENT 'Le nombre de sous-domaine que possède le domaine',
  `NumOfQuestions` int(11) NOT NULL DEFAULT '0' COMMENT 'Le nombre de questions présentent dans le domaine',
  PRIMARY KEY (`iddomaine`),
  UNIQUE KEY `iddomaine_UNIQUE` (`iddomaine`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='Le domaine regroupant des questions en rapport avec ce dernier';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domaine`
--

LOCK TABLES `domaine` WRITE;
/*!40000 ALTER TABLE `domaine` DISABLE KEYS */;
INSERT INTO `domaine` VALUES (1,'Sécurité physique',0,0,24),(2,'Formation des employés',0,0,6),(3,'Sécurité des données',0,0,7),(4,'Sécurité du réseau',0,0,17),(5,'Sécurité logicielle',0,0,4),(6,'Physical security',0,9,0),(7,'Building and perimeter',6,0,4),(8,'Lighting',6,0,2),(9,'Alarms',6,0,4),(10,'Physical barriers',6,0,5),(11,'Access points',6,0,6),(12,'Guards',6,0,5),(13,'Security Cameras',6,0,5),(14,'Access methods',6,0,4),(15,'Network security',0,8,0),(16,'Network topology',15,0,8),(17,'Firewall and server configuration',15,0,14),(18,'Security policy',15,0,5),(19,'Access control',15,0,11),(20,'Backups',15,0,6),(21,'Antivirus',15,0,9),(22,'Logging and monitoring',15,0,7),(23,'Business continuity',15,0,3),(24,'Threat analysis',0,0,10),(25,'Security management',0,0,9),(26,'Personnel security',0,0,5);
/*!40000 ALTER TABLE `domaine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:43
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
  `idmain_domaine` int(11) NOT NULL COMMENT 'L''index du domaine contenant le sous-domaine',
  `idsous_domaine` int(11) NOT NULL COMMENT 'L''index du sous-domaine',
  PRIMARY KEY (`idmain_domaine`,`idsous_domaine`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table contenant les sous-domaines de chaque domaine';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_sous_domaine`
--

LOCK TABLES `list_sous_domaine` WRITE;
/*!40000 ALTER TABLE `list_sous_domaine` DISABLE KEYS */;
INSERT INTO `list_sous_domaine` VALUES (6,7),(6,8),(6,9),(6,10),(6,11),(6,12),(6,13),(6,14),(15,16),(15,17),(15,18),(15,19),(15,20),(15,21),(15,22),(15,23);
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

-- Dump completed on 2018-01-29 20:47:43
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
-- Table structure for table `list_sous_question`
--

DROP TABLE IF EXISTS `list_sous_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_sous_question` (
  `idmain_question` int(11) NOT NULL COMMENT 'L''index de la question principale',
  `idsous_question` int(11) NOT NULL COMMENT 'L''index de la sous-question',
  PRIMARY KEY (`idmain_question`,`idsous_question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table contenant les sous-questions de chaque question';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_sous_question`
--

LOCK TABLES `list_sous_question` WRITE;
/*!40000 ALTER TABLE `list_sous_question` DISABLE KEYS */;
INSERT INTO `list_sous_question` VALUES (2,3),(7,8),(7,9),(14,15),(16,17),(16,18),(16,19),(16,20),(42,43),(50,51),(94,95),(94,96),(103,104);
/*!40000 ALTER TABLE `list_sous_question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:43
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
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `idpackage` int(10) NOT NULL AUTO_INCREMENT COMMENT 'L''index du package',
  `Nom` varchar(255) NOT NULL DEFAULT 'Package sans nom' COMMENT 'Le nom du package',
  `Category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpackage`),
  UNIQUE KEY `id_UNIQUE` (`idpackage`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='Table contenant les différents packages';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Package par défaut',NULL),(2,'Starter Audit (EN)',NULL);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:42
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
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note` (
  `idnote` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''index de la note',
  `Valeur` int(11) NOT NULL DEFAULT '0' COMMENT 'La valeur de la note',
  `Couleur` varchar(45) DEFAULT NULL COMMENT 'Couleur associée',
  `Image` varchar(255) DEFAULT NULL COMMENT 'Nom de l''image',
  PRIMARY KEY (`idnote`),
  UNIQUE KEY `idnote_UNIQUE` (`idnote`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='La liste des notes attribuable';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,0,NULL,NULL),(2,1,NULL,NULL),(3,2,NULL,NULL),(4,3,NULL,NULL),(5,4,NULL,NULL),(6,5,NULL,NULL),(7,6,NULL,NULL),(8,7,NULL,NULL),(9,8,NULL,NULL),(10,9,NULL,NULL),(11,10,NULL,NULL);
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:43
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
INSERT INTO `package_question_list` VALUES ('Package par défaut','1',1,1),('Package par défaut','1',2,1),('Package par défaut','1',3,1),('Package par défaut','1',4,1),('Package par défaut','1',5,1),('Package par défaut','1',6,1),('Package par défaut','1',7,1),('Package par défaut','1',8,1),('Package par défaut','1',9,1),('Package par défaut','1',10,1),('Package par défaut','1',11,1),('Package par défaut','1',12,1),('Package par défaut','1',13,1),('Package par défaut','1',14,1),('Package par défaut','1',15,1),('Package par défaut','1',16,1),('Package par défaut','1',17,1),('Package par défaut','1',18,1),('Package par défaut','1',19,1),('Package par défaut','1',20,1),('Package par défaut','1',21,1),('Package par défaut','1',22,1),('Package par défaut','1',23,1),('Package par défaut','1',24,2),('Package par défaut','1',25,2),('Package par défaut','1',26,2),('Package par défaut','1',27,2),('Package par défaut','1',28,2),('Package par défaut','1',29,2),('Package par défaut','1',30,3),('Package par défaut','1',31,3),('Package par défaut','1',32,3),('Package par défaut','1',33,3),('Package par défaut','1',34,3),('Package par défaut','1',35,3),('Package par défaut','1',36,3),('Package par défaut','1',37,4),('Package par défaut','1',38,4),('Package par défaut','1',39,4),('Package par défaut','1',40,4),('Package par défaut','1',41,4),('Package par défaut','1',42,4),('Package par défaut','1',43,4),('Package par défaut','1',44,4),('Package par défaut','1',45,4),('Package par défaut','1',46,4),('Package par défaut','1',47,4),('Package par défaut','1',48,4),('Package par défaut','1',49,4),('Package par défaut','1',50,4),('Package par défaut','1',51,4),('Package par défaut','1',52,4),('Package par défaut','1',53,4),('Package par défaut','1',54,5),('Package par défaut','1',55,5),('Package par défaut','1',56,5),('Package par défaut','1',57,5),('Package par défaut','1',58,7),('Package par défaut','1',59,7),('Package par défaut','1',60,7),('Package par défaut','1',61,7),('Package par défaut','1',62,8),('Package par défaut','1',63,8),('Package par défaut','1',64,9),('Package par défaut','1',65,9),('Package par défaut','1',66,9),('Package par défaut','1',67,9),('Package par défaut','1',68,10),('Package par défaut','1',69,10),('Package par défaut','1',70,10),('Package par défaut','1',71,10),('Package par défaut','1',72,10),('Package par défaut','1',73,11),('Package par défaut','1',74,11),('Package par défaut','1',75,11),('Package par défaut','1',76,11),('Package par défaut','1',77,11),('Package par défaut','1',78,11),('Package par défaut','1',79,12),('Package par défaut','1',80,12),('Package par défaut','1',81,12),('Package par défaut','1',82,12),('Package par défaut','1',83,12),('Package par défaut','1',84,13),('Package par défaut','1',85,13),('Package par défaut','1',86,13),('Package par défaut','1',87,13),('Package par défaut','1',88,13),('Package par défaut','1',89,14),('Package par défaut','1',90,14),('Package par défaut','1',91,14),('Package par défaut','1',92,14),('Package par défaut','1',93,16),('Package par défaut','1',94,16),('Package par défaut','1',95,16),('Package par défaut','1',96,16),('Package par défaut','1',97,16),('Package par défaut','1',98,16),('Package par défaut','1',99,16),('Package par défaut','1',100,16),('Package par défaut','1',101,17),('Package par défaut','1',102,17),('Package par défaut','1',103,17),('Package par défaut','1',104,17),('Package par défaut','1',105,17),('Package par défaut','1',106,17),('Package par défaut','1',107,17),('Package par défaut','1',108,17),('Package par défaut','1',109,17),('Package par défaut','1',110,17),('Package par défaut','1',111,17),('Package par défaut','1',112,17),('Package par défaut','1',113,17),('Package par défaut','1',114,17),('Package par défaut','1',115,18),('Package par défaut','1',116,18),('Package par défaut','1',117,18),('Package par défaut','1',118,18),('Package par défaut','1',119,18),('Package par défaut','1',120,19),('Package par défaut','1',121,19),('Package par défaut','1',122,19),('Package par défaut','1',123,19),('Package par défaut','1',124,19),('Package par défaut','1',125,19),('Package par défaut','1',126,19),('Package par défaut','1',127,19),('Package par défaut','1',128,19),('Package par défaut','1',129,19),('Package par défaut','1',130,19),('Package par défaut','1',131,20),('Package par défaut','1',132,20),('Package par défaut','1',133,20),('Package par défaut','1',134,20),('Package par défaut','1',135,20),('Package par défaut','1',136,20),('Package par défaut','1',137,21),('Package par défaut','1',138,21),('Package par défaut','1',139,21),('Package par défaut','1',140,21),('Package par défaut','1',141,21),('Package par défaut','1',142,21),('Package par défaut','1',143,21),('Package par défaut','1',144,21),('Package par défaut','1',145,21),('Package par défaut','1',146,22),('Package par défaut','1',147,22),('Package par défaut','1',148,22),('Package par défaut','1',149,22),('Package par défaut','1',150,22),('Package par défaut','1',151,22),('Package par défaut','1',152,22),('Package par défaut','1',153,1),('Package par défaut','1',154,23),('Package par défaut','1',155,23),('Package par défaut','1',156,23),('Package par défaut','1',157,24),('Package par défaut','1',158,24),('Package par défaut','1',159,24),('Package par défaut','1',160,24),('Package par défaut','1',161,24),('Package par défaut','1',162,24),('Package par défaut','1',163,24),('Package par défaut','1',164,24),('Package par défaut','1',165,24),('Package par défaut','1',166,24),('Package par défaut','1',167,25),('Package par défaut','1',168,25),('Package par défaut','1',169,25),('Package par défaut','1',170,25),('Package par défaut','1',171,25),('Package par défaut','1',172,25),('Package par défaut','1',173,25),('Package par défaut','1',174,25),('Package par défaut','1',175,25),('Package par défaut','1',176,26),('Package par défaut','1',177,26),('Package par défaut','1',178,26),('Package par défaut','1',179,26),('Package par défaut','1',180,26),('Starter Audit (EN)','2',58,7),('Starter Audit (EN)','2',59,7),('Starter Audit (EN)','2',60,7),('Starter Audit (EN)','2',61,7),('Starter Audit (EN)','2',62,8),('Starter Audit (EN)','2',63,8),('Starter Audit (EN)','2',64,9),('Starter Audit (EN)','2',65,9),('Starter Audit (EN)','2',66,9),('Starter Audit (EN)','2',67,9),('Starter Audit (EN)','2',68,10),('Starter Audit (EN)','2',69,10),('Starter Audit (EN)','2',70,10),('Starter Audit (EN)','2',71,10),('Starter Audit (EN)','2',72,10),('Starter Audit (EN)','2',73,11),('Starter Audit (EN)','2',74,11),('Starter Audit (EN)','2',75,11),('Starter Audit (EN)','2',76,11),('Starter Audit (EN)','2',77,11),('Starter Audit (EN)','2',78,11),('Starter Audit (EN)','2',79,12),('Starter Audit (EN)','2',80,12),('Starter Audit (EN)','2',81,12),('Starter Audit (EN)','2',82,12),('Starter Audit (EN)','2',83,12),('Starter Audit (EN)','2',84,13),('Starter Audit (EN)','2',85,13),('Starter Audit (EN)','2',86,13),('Starter Audit (EN)','2',87,13),('Starter Audit (EN)','2',88,13),('Starter Audit (EN)','2',89,14),('Starter Audit (EN)','2',90,14),('Starter Audit (EN)','2',91,14),('Starter Audit (EN)','2',92,14),('Starter Audit (EN)','2',93,16),('Starter Audit (EN)','2',94,16),('Starter Audit (EN)','2',95,16),('Starter Audit (EN)','2',96,16),('Starter Audit (EN)','2',97,16),('Starter Audit (EN)','2',98,16),('Starter Audit (EN)','2',99,16),('Starter Audit (EN)','2',100,16),('Starter Audit (EN)','2',101,17),('Starter Audit (EN)','2',102,17),('Starter Audit (EN)','2',103,17),('Starter Audit (EN)','2',104,17),('Starter Audit (EN)','2',105,17),('Starter Audit (EN)','2',106,17),('Starter Audit (EN)','2',107,17),('Starter Audit (EN)','2',108,17),('Starter Audit (EN)','2',109,17),('Starter Audit (EN)','2',110,17),('Starter Audit (EN)','2',111,17),('Starter Audit (EN)','2',112,17),('Starter Audit (EN)','2',113,17),('Starter Audit (EN)','2',114,17),('Starter Audit (EN)','2',115,18),('Starter Audit (EN)','2',116,18),('Starter Audit (EN)','2',117,18),('Starter Audit (EN)','2',118,18),('Starter Audit (EN)','2',119,18),('Starter Audit (EN)','2',120,19),('Starter Audit (EN)','2',121,19),('Starter Audit (EN)','2',122,19),('Starter Audit (EN)','2',123,19),('Starter Audit (EN)','2',124,19),('Starter Audit (EN)','2',125,19),('Starter Audit (EN)','2',126,19),('Starter Audit (EN)','2',127,19),('Starter Audit (EN)','2',128,19),('Starter Audit (EN)','2',129,19),('Starter Audit (EN)','2',130,19),('Starter Audit (EN)','2',131,20),('Starter Audit (EN)','2',132,20),('Starter Audit (EN)','2',133,20),('Starter Audit (EN)','2',134,20),('Starter Audit (EN)','2',135,20),('Starter Audit (EN)','2',136,20),('Starter Audit (EN)','2',137,21),('Starter Audit (EN)','2',138,21),('Starter Audit (EN)','2',139,21),('Starter Audit (EN)','2',140,21),('Starter Audit (EN)','2',141,21),('Starter Audit (EN)','2',142,21),('Starter Audit (EN)','2',143,21),('Starter Audit (EN)','2',144,21),('Starter Audit (EN)','2',145,21),('Starter Audit (EN)','2',146,22),('Starter Audit (EN)','2',147,22),('Starter Audit (EN)','2',148,22),('Starter Audit (EN)','2',149,22),('Starter Audit (EN)','2',150,22),('Starter Audit (EN)','2',151,22),('Starter Audit (EN)','2',152,22),('Starter Audit (EN)','2',154,23),('Starter Audit (EN)','2',155,23),('Starter Audit (EN)','2',156,23),('Starter Audit (EN)','2',157,24),('Starter Audit (EN)','2',158,24),('Starter Audit (EN)','2',159,24),('Starter Audit (EN)','2',160,24),('Starter Audit (EN)','2',161,24),('Starter Audit (EN)','2',162,24),('Starter Audit (EN)','2',163,24),('Starter Audit (EN)','2',164,24),('Starter Audit (EN)','2',165,24),('Starter Audit (EN)','2',166,24),('Starter Audit (EN)','2',167,25),('Starter Audit (EN)','2',168,25),('Starter Audit (EN)','2',169,25),('Starter Audit (EN)','2',170,25),('Starter Audit (EN)','2',171,25),('Starter Audit (EN)','2',172,25),('Starter Audit (EN)','2',173,25),('Starter Audit (EN)','2',174,25),('Starter Audit (EN)','2',175,25),('Starter Audit (EN)','2',176,26),('Starter Audit (EN)','2',177,26),('Starter Audit (EN)','2',178,26),('Starter Audit (EN)','2',179,26),('Starter Audit (EN)','2',180,26);
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

-- Dump completed on 2018-01-29 20:47:42
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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `idquestion` int(10) NOT NULL AUTO_INCREMENT COMMENT 'L''index de la question',
  `Question` mediumtext COMMENT 'Le nom de la question',
  `Explication` longtext COMMENT 'Le texte d''aide sur la question',
  `Image` varchar(255) DEFAULT NULL COMMENT 'Le chemin où se trouve éventuellement une image illustrant la question',
  `Numero` int(11) NOT NULL COMMENT 'Le numéro d''ordre de la question dans son domaine',
  `ParentID` int(11) DEFAULT NULL COMMENT 'L''index de la question parente',
  `DomaineID` int(11) NOT NULL COMMENT 'L''index du domaine auquel la question appartient',
  `NumOfChild` int(11) NOT NULL DEFAULT '0' COMMENT 'Le nombre de sous-questions que possède la question',
  `CoeffID` int(11) NOT NULL DEFAULT '1' COMMENT 'L''index du coefficient associé à la question',
  PRIMARY KEY (`idquestion`),
  UNIQUE KEY `idquestion_UNIQUE` (`idquestion`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8 COMMENT='La table composant une question';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'La topographie du site assure-t-elle une sécurité satisfaisante?','La topographie actuelle réduit-t-elle les moyens d\'attaque ou d\'accès?',NULL,1,0,1,0,1),(2,'Combien y a-t-il de points d\'entrée?','Comptez le nombre de points d\'entrée physique au site.',NULL,2,0,1,1,1),(3,'Sont-ils bien surveillés?','L\'accès à ces points sont-ils surveillés (ex: badge nécessaire, vigile à l\'entrée, caméra de sécurité, ...)',NULL,3,2,1,0,1),(4,'Toutes les personnes entrantes et sortantes passent-elles par un point de contrôle?','Présentation obligatoire d\'un badge / papier d\'identité. Une distinguestion est-elle faite selon le grade de la personne?',NULL,4,0,1,0,1),(5,'Les portes, fenêtres, portails, tourniquets sont-ils surveillés?','Ce point porte plus particulièrement sur des zones donnant un accès à une zone sensible de l\'entreprise',NULL,5,0,1,0,1),(6,'Les moyens d\'entrée peuvent-ils être consultés pour identifier qui a accédé à ces zones?','Logs de passages, registres des entrées sorties sur papier, ...',NULL,6,0,1,0,1),(7,'Le site est-il entouré dune clôture quelconque?','Murs, grillage, ...',NULL,7,0,1,2,1),(8,'Ces clôtures sont-elles suffisamment hautes pour réduire l\'accès non autorisé à la propriété?','Plus elles sont hautes mieux c\'est (§on pourrait indiquer un nombre de mètre à partir duquel ça devient bien§)',NULL,8,7,1,0,1),(9,'La clôture est-elle vérifiée régulièrement?','Afin de déceler des trous, des dommages ou des points d\'accès.',NULL,9,7,1,0,1),(10,'Les portes d\'entrée sont-elles sécurisées et fonctionnent-elles correctement?','Moyen de les verrouiller, se ferme bien, ...',NULL,10,0,1,0,1),(11,'Les véhicules sont-ils autorisés à accéder librement à la propriété?','Présence de barrières de parking, d\'un vigile qui vérifie que le véhicule est bien autorisé à pénétrer dans l\'enceinte',NULL,11,0,1,0,1),(12,'Les fenêtres pouvant être ouvertes ont-elles un moyen d\'être verrouillées?','Un verrou, fermeture automatique, ...',NULL,12,0,1,0,1),(13,'Si de grandes vitres sont installées dans le bâtiment, sont-elles laminées avec un film de sécurité pour empêcher l\'entrée forcée?',NULL,NULL,13,0,1,0,1),(14,'L\'organisation possède-t-elle du personnel de sécurité?',NULL,NULL,14,0,1,1,1),(15,'Les ascenseurs et les escaliers sont-ils contrôlés par le personnel de sécurité?','Si oui, la fréquence de contrôlé permet de déterminer la note',NULL,15,14,1,0,1),(16,'L\'organistation utilise-t-elle des moyens de vidéo surveillance?',NULL,NULL,16,0,1,4,1),(17,'Le périmètre du bâtiment et le périmètre de la propriété sont-ils adéquatement couverts par des caméras?','',NULL,17,16,1,0,1),(18,'Les entrées et sorties du bâtiment sont-elles surveillées par des caméras?','',NULL,18,16,1,0,1),(19,'Les cages d\'escalier et autres points d\'accès sont-ils surveillés par des caméras?','',NULL,19,16,1,0,1),(20,'Les caméras sont-elles visionnées 24 heures sur 24 ou seulement après un incident?','La fréquence de contrôle peut aider à déterminer la note',NULL,20,16,1,0,1),(21,'Les serrures et l\'équipement de verrouillage sont-ils en bon état et fonctionnent-ils correctement?','',NULL,21,0,1,0,1),(22,'Les anciens employés ont-ils encore des clés ou des cartes d\'accès au bâtiment?',NULL,NULL,22,0,1,0,1),(23,'Les anciens employés / employés licenciés ont-ils été retirés de l\'accès à la propriété?',NULL,NULL,23,0,1,0,1),(24,'Les employés ont-ils été formés à identifier du phishing?','',NULL,1,0,2,0,1),(25,'Les employés laissent leur session ouverte lorsqu\'ils quittent leur bureau?','',NULL,2,0,2,0,1),(26,'Est-ce que certaines informations importantes sont laisser sur des post-it?','Mot de passe réseau / session, code / information sensible',NULL,3,0,2,0,1),(27,'Les employés sont-ils autorisés à aller sur tous les sites Web qu\'ils désirent?',NULL,NULL,4,0,2,0,1),(28,'Les employés sont-ils autorisés à apporter et à utiliser leur propre matériel pour travailler?','Ordinateur personnel, téléphone, clé USB, ...',NULL,5,0,2,0,1),(29,'Les employés sont-ils autorisés à rapporter des informations à leur domicile?','Du code, documents papiers, ...',NULL,6,0,2,0,1),(30,'Y a-t-il un endroit où toutes les données sont stockées?','Datacenter, ...',NULL,1,0,3,0,1),(31,'Est-ce que les équipes utilisent des sites Web / méthodes tiers pour partager leur travail entre elles?','Github, Bitbucket, service could, ...',NULL,2,0,3,0,1),(32,'Les logs sont-ils conservés?',NULL,NULL,3,0,3,0,1),(33,'Existe-t-il un département spécial dédié à la gestion de l\'intégrité des données?',NULL,NULL,4,0,3,0,1),(34,'Y a-t-il un département spécial dédié à l\'étude des logs?',NULL,NULL,5,0,3,0,1),(35,'Est-ce que les données sensibles sont cryptées',NULL,NULL,6,0,3,0,1),(36,'Des sauvegardes sont-elles effectuées?','Si oui, la fréquence aide à déterminer la note',NULL,7,0,3,0,1),(37,'Quels appareils de liaisons sont utilisés?','(HUB, SWITCH, ROUTER, …)',NULL,1,0,4,0,1),(38,'Un pare-feu est-il en place?',NULL,NULL,2,0,4,0,1),(39,'Un serveur proxy est-il en place?',NULL,NULL,3,0,4,0,1),(40,'Un serveur AAA est-il en place?',NULL,NULL,4,0,4,0,1),(41,'Les employés peuvent-ils se connecter au réseau interne depuis l\'extérieur?',NULL,NULL,5,0,4,0,1),(42,'Y a-t-il des points d\'accès Wi-Fi?',NULL,NULL,6,0,4,1,1),(43,'Le mot de passe est-il assez fort?','Longueur, diversité des caractères, aucun patern, ...',NULL,7,42,4,0,1),(44,'Des VLAN sont-ils en place?',NULL,NULL,8,0,4,0,1),(45,'Les switchs filtrent-ils les machines via leurs adresses MAC?',NULL,NULL,9,0,4,0,1),(46,'Quels sont les algorithmes de chiffrements utilisés?','SHA-1, SHA-256, AES, ...',NULL,10,0,4,0,1),(47,'OSPF est-il utilisé?',NULL,NULL,11,0,4,0,1),(48,'RIP est-il utilisé?',NULL,NULL,12,0,4,0,1),(49,'Le system lève-t-il une alerte en cas d\'intrusion?','IPS, IDS',NULL,13,0,4,0,1),(50,'Y a-t-il des ports ethernet libre?',NULL,NULL,14,0,4,1,1),(51,'Sont-ils activés?',NULL,NULL,15,50,4,0,1),(52,'Certaines machines utilisent-elles le promocious mode (ou équivalent comme le monitor mode)?',NULL,NULL,16,0,4,0,1),(53,'Y a-t-il un département de sécurité réseau?',NULL,NULL,17,0,4,0,1),(54,'L\'organisation protège-t-elle ses logiciels?',NULL,NULL,1,0,5,0,1),(55,'L\'organisation utilise-t-elle des logiciels piraté?',NULL,NULL,2,0,5,0,1),(56,'L\'organisation utilise-t-elle un antivirus?',NULL,NULL,3,0,5,0,1),(57,'Après la découverte d\'une faille, une mise à jour est-elle effectuée rapidement?',NULL,NULL,4,0,5,0,1),(58,'Does the property topography provide security or reduce the means of attack or access?',NULL,NULL,1,0,7,0,3),(59,'Does the landscaping offer locations to hide or means of access to roof tops or other access points?','Does the landscaping offer locations to hide or means of access to roof tops or other access points?',NULL,2,0,7,0,2),(60,'How many points of entry are there to the building?  Are those entrances monitored?','How many points of entry are there to the building?  Are those entrances monitored?',NULL,3,0,7,0,6),(61,'Do all persons entering and exiting the building go through a security check point?','Do all persons entering and exiting the building go through a security check point?',NULL,4,0,7,0,4),(62,'Is there sufficient lighting to allow guards, employees, or others to see places of possible concealment or access?','Is there sufficient lighting to allow guards, employees, or others to see places of possible concealment or access?',NULL,1,0,8,0,2),(63,'Are access points obscured by low light?','Are access points obscured by low light?',NULL,2,0,8,0,4),(64,'Are doors, windows, gates, turnstiles monitored for egress and ingress?','Are doors, windows, gates, turnstiles monitored for egress and ingress?',NULL,1,0,9,0,5),(65,'Are means of ingress able to be audited to identify who accessed those areas?','Are means of ingress able to be audited to identify who accessed those areas?',NULL,2,0,9,0,3),(66,'Is the premises monitored for fire or smoke?  Does the system alert the local fire department?','Is the premises monitored for fire or smoke?  Does the system alert the local fire department?',NULL,3,0,9,0,5),(67,'In the event of a forced entry who does the alarms system notify?  Is it monitored by a third party or staff?','In the event of a forced entry who does the alarms system notify?  Is it monitored by a third party or staff?',NULL,4,0,9,0,6),(68,'Are fences tall enough to reduce unauthorized access to the property?  Is the fence checked regularly by staff for holes, damage or access points.','Are fences tall enough to reduce unauthorized access to the property?  Is the fence checked regularly by staff for holes, damage or access points.',NULL,1,0,10,0,4),(69,'Are bollards in place to prevent damage to buildings or access points by vehicles?','Are bollards in place to prevent damage to buildings or access points by vehicles?',NULL,2,0,10,0,2),(70,'Are tire strips installed and able to be used to prevent unauthorized entry to sensitive areas around the property?  ','Are tire strips installed and able to be used to prevent unauthorized entry to sensitive areas around the property?  ',NULL,3,0,10,0,4),(71,'Are gates secure and operating properly?','Are gates secure and operating properly?',NULL,4,0,10,0,6),(72,'Is entry to the premises protected by gates or is vehicular traffic allowed to move freely on and off the property?','Is entry to the premises protected by gates or is vehicular traffic allowed to move freely on and off the property?',NULL,5,0,10,0,6),(73,'Are doors and gates in good working order?  Do they operate properly and close on their own?','Are doors and gates in good working order?  Do they operate properly and close on their own?',NULL,1,0,11,0,6),(74,'Do turnstiles operate properly and are credentials required to go through?','Do turnstiles operate properly and are credentials required to go through?',NULL,2,0,11,0,3),(75,'Are windows locked if they are able to be opened?','Are windows locked if they are able to be opened?',NULL,3,0,11,0,5),(76,'If large panes of glass are installed in the building, are they laminated with a security film to prevent forced entry?','If large panes of glass are installed in the building, are they laminated with a security film to prevent forced entry?',NULL,4,0,11,0,4),(77,'Do docks and dock doors operate properly, and are they locked when not in use?','Do docks and dock doors operate properly, and are they locked when not in use?',NULL,5,0,11,0,4),(78,'Are elevators and stairwells checked for daily or hourly by security staff?','Are elevators and stairwells checked for daily or hourly by security staff?',NULL,6,0,11,0,5),(79,'Does the organization’s property utilize a guard staff?','Does the organization’s property utilize a guard staff?',NULL,1,0,12,0,3),(80,'Do guards verify persons coming on the property are allowed access?  How do they verify?  ID, Verify with staff members, inspect vehicles, record names and license information?','Do guards verify persons coming on the property are allowed access?  How do they verify?  ID, Verify with staff members, inspect vehicles, record names and license information?',NULL,2,0,12,0,6),(81,'Do the guards make rounds on the property to check places of access?  Doors, windows, elevators, stairwells, dock or bay doors, secured areas?','Do the guards make rounds on the property to check places of access?  Doors, windows, elevators, stairwells, dock or bay doors, secured areas?',NULL,3,0,12,0,5),(82,'Do guards complete check sheets while on duty to verify they checked as directed?','Do guards complete check sheets while on duty to verify they checked as directed?',NULL,4,0,12,0,3),(83,'Do guards vary their patrol patterns to reduce the chance of their routines being exploited?','Do guards vary their patrol patterns to reduce the chance of their routines being exploited?',NULL,5,0,12,0,4),(84,'Are the perimeter of the building and the perimeter of the property adequately covered by cameras?','Are the perimeter of the building and the perimeter of the property adequately covered by cameras?',NULL,1,0,13,0,6),(85,'Are cameras able to switch automatically from daytime to night/low light?','Are cameras able to switch automatically from daytime to night/low light?',NULL,2,0,13,0,3),(86,'Are the building entrances and exits monitored by cameras?','Are the building entrances and exits monitored by cameras?',NULL,3,0,13,0,6),(87,'Are stairwells and other access points monitored by cameras?','Are stairwells and other access points monitored by cameras?',NULL,4,0,13,0,4),(88,'Are the cameras monitored 24 hours a day or only reviewed after an incident has taken place?','Are the cameras monitored 24 hours a day or only reviewed after an incident has taken place?',NULL,5,0,13,0,4),(89,'Are locks and locking equipment in good repair and operating properly?','Are locks and locking equipment in good repair and operating properly?',NULL,1,0,14,0,5),(90,'Do past employees still have keys/access cards to the building?','Do past employees still have keys/access cards to the building?',NULL,2,0,14,0,4),(91,'Have past employees/ terminated employees been removed from having access to the property?','Have past employees/ terminated employees been removed from having access to the property?',NULL,3,0,14,0,5),(92,'How often are codes changed on code or cipher locks?','How often are codes changed on code or cipher locks?',NULL,4,0,14,0,4),(93,'Is the company using modern network devices?','Is the company using modern network devices?',NULL,1,0,16,0,4),(94,'Is the company using Wifi to connect some devices? ','Is the company using Wifi to connect some devices? ',NULL,2,0,16,2,3),(95,'Is the IEEE 802.1X standard used for authentication?','Is the IEEE 802.1X standard used for authentication?',NULL,1,94,16,0,6),(96,'Is there an Internet Access Management system or procedure and is it efficient?','Is there an Internet Access Management system or procedure and is it efficient?',NULL,2,94,16,0,5),(97,'Are the different Operating Systems up to date on the network?','Are the different Operating Systems up to date on the network?',NULL,3,0,16,0,6),(98,'Is there redundancy in the different parts of the network? ','Is there redundancy in the different parts of the network? ',NULL,4,0,16,0,4),(99,'Is the network still able to work normally if one of its element in not functioning?','Is the network still able to work normally if one of its element in not functioning?',NULL,5,0,16,0,3),(100,'Is there any non-protectable device on the network and is it placed in an isolated VLAN?','Is there any non-protectable device on the network and is it placed in an isolated VLAN?',NULL,6,0,16,0,5),(101,'Are the firewalls correctly configured regarding the network use and topology?','Are the firewalls correctly configured regarding the network use and topology?',NULL,1,0,17,0,6),(102,'Are all the firewall rules documented?','Are all the firewall rules documented?',NULL,2,0,17,0,4),(103,'Is there a firewall administrator?','Is there a firewall administrator?',NULL,3,0,17,1,5),(104,'Is he correctly trained and aware of the firewall best practices and keeps himself updated regarding current threats?','Is he correctly trained and aware of the firewall best practices and keeps himself updated regarding current threats?',NULL,1,103,17,0,4),(105,'Are the server placed in a protected area of the network?','Are the server placed in a protected area of the network?',NULL,4,0,17,0,6),(106,'How is the server access security?','How is the server access security?',NULL,5,0,17,0,6),(107,'Is the database server secured?','Is the database server secured?',NULL,6,0,17,0,6),(108,'Are the credentials of the database strong enough?','Are the credentials of the database strong enough?',NULL,7,0,17,0,6),(109,'Is a VPN used for internal part of the network?','Is a VPN used for internal part of the network?',NULL,8,0,17,0,4),(110,'Is a Public Key Infrastructure (PKI) used for identifying and encrypting communications?','Is a Public Key Infrastructure (PKI) used for identifying and encrypting communications?',NULL,9,0,17,0,5),(111,'Are the servers opened ports regulated?','Are the servers opened ports regulated?',NULL,10,0,17,0,4),(112,'Are the servers active services often checked and are those services only the necessary ones?','Are the servers active services often checked and are those services only the necessary ones?',NULL,11,0,17,0,3),(113,'Are the servers services up to date?','Are the servers services up to date?',NULL,12,0,17,0,6),(114,'Are updates regularly done on servers?','Are updates regularly done on servers?',NULL,13,0,17,0,6),(115,'Is there a security policy formalized in the company and accessible for all employees?','Is there a security policy formalized in the company and accessible for all employees?',NULL,1,0,18,0,5),(116,'Are all employees aware of the security policy of the company?','Are all employees aware of the security policy of the company?',NULL,2,0,18,0,4),(117,'Is the defined security policy sufficient regarding the protection of sensitive data?','Is the defined security policy sufficient regarding the protection of sensitive data?',NULL,3,0,18,0,3),(118,'Is the security policy of the company covering all the important aspects of the security regarding the company situation?','Is the security policy of the company covering all the important aspects of the security regarding the company situation?',NULL,4,0,18,0,4),(119,'Are procedures detailed in the security policy?','Are procedures detailed in the security policy?',NULL,5,0,18,0,2),(120,'If there is a password policy, is it strong enough?','If there is a password policy, is it strong enough?',NULL,1,0,19,0,5),(121,'Is there a duration validity for the password and is it acceptable regarding the company’s situation?','Is there a duration validity for the password and is it acceptable regarding the company’s situation?',NULL,2,0,19,0,4),(122,'Are the employees connected to the network in a way that assure the security and privacy of their data?','Are the employees connected to the network in a way that assure the security and privacy of their data?',NULL,3,0,19,0,4),(123,'Are the different accesses monitored and is this monitoring centralized?','Are the different accesses monitored and is this monitoring centralized?',NULL,4,0,19,0,6),(124,'Are the employees following a formalized procedure for logon and logoff processes?','Are the employees following a formalized procedure for logon and logoff processes?',NULL,5,0,19,0,3),(125,'Are shared devices efficiently protected?','Are shared devices efficiently protected?',NULL,6,0,19,0,4),(126,'Are System Privileges correctly distributed regarding the needs of the employees?','Are System Privileges correctly distributed regarding the needs of the employees?',NULL,7,0,19,0,5),(127,'Are sensitive devices protected in restrictive area with identity control?','Are sensitive devices protected in restrictive area with identity control?',NULL,8,0,19,0,5),(128,'Are printers free of access and are they watched (especially if sensitive documents are printed on them)?','Are printers free of access and are they watched (especially if sensitive documents are printed on them)?',NULL,9,0,19,0,4),(129,'Is the local network accessible for visitors and how is their access granted?','Is the local network accessible for visitors and how is their access granted?',NULL,10,0,19,0,5),(130,'Are there restrictions on any websites and how those restrictions are applied?','Are there restrictions on any websites and how those restrictions are applied?',NULL,11,0,19,0,3),(131,'Are backups of the servers and devices regularly done?','Are backups of the servers and devices regularly done?',NULL,1,0,20,0,6),(132,'Is the backup administrator qualified to proceed with this job?','Is the backup administrator qualified to proceed with this job?',NULL,2,0,20,0,2),(133,'Is the backup procedure documented?','Is the backup procedure documented?',NULL,3,0,20,0,2),(134,'Are the backups protected from the network?','Are the backups protected from the network?',NULL,4,0,20,0,5),(135,'Is the number of backups versions enough to assure a fast response time to a possible accident?','Is the number of backups versions enough to assure a fast response time to a possible accident?',NULL,5,0,20,0,4),(136,'Are the backups systems tested in accident scenarios?','Are the backups systems tested in accident scenarios?',NULL,6,0,20,0,3),(137,'Are all employees devices equipped with antivirus systems?','Are all employees devices equipped with antivirus systems?',NULL,1,0,21,0,6),(138,'Are the antivirus softwares used efficient against major malware threats?','Are the antivirus softwares used efficient against major malware threats?',NULL,2,0,21,0,6),(139,'Are the antivirus softwares regularly updated?','Are the antivirus softwares regularly updated?',NULL,3,0,21,0,5),(140,'Are full system scans run regularly?','Are full system scans run regularly?',NULL,4,0,21,0,4),(141,'Are the antivirus softwares using real-time scanning methods on every device?','Are the antivirus softwares using real-time scanning methods on every device?',NULL,5,0,21,0,4),(142,'Are the scanning method based on signature recognition as well as behaviour analysis?','Are the scanning method based on signature recognition as well as behaviour analysis?',NULL,6,0,21,0,5),(143,'Is the alert system transmitting information to the right persons?','Is the alert system transmitting information to the right persons?',NULL,7,0,21,0,5),(144,'What is the procedure when an antivirus is shut down ?','What is the procedure when an antivirus is shut down ?',NULL,8,0,21,0,4),(145,'Are the antivirus logs centralized and stored?','Are the antivirus logs centralized and stored?',NULL,9,0,21,0,2),(146,'Is there an Intrusion Detection System on the network and is it configured properly regarding the needs, the topology and the threats of the network?','Is there an Intrusion Detection System on the network and is it configured properly regarding the needs, the topology and the threats of the network?',NULL,1,0,22,0,5),(147,'Are the logs archived?','Are the logs archived?',NULL,2,0,22,0,6),(148,'Is there a monitoring system in the network and is it efficient?','Is there a monitoring system in the network and is it efficient?',NULL,3,0,22,0,4),(149,'Are the logs centralized and monitored?','Are the logs centralized and monitored?',NULL,4,0,22,0,5),(150,'Are the different user activities monitored and watched?','Are the different user activities monitored and watched?',NULL,5,0,22,0,4),(151,'If something suspicious/illegal is observed, what is the procedure?','If something suspicious/illegal is observed, what is the procedure?',NULL,6,0,22,0,2),(152,'Are the persons in charge of the logs trained and aware of the different tasks and obligations?','Are the persons in charge of the logs trained and aware of the different tasks and obligations?',NULL,7,0,22,0,3),(153,'Is there attacks/accidents simulation inside the company to check the business continuity plans?','Is there attacks/accidents simulation inside the company to check the business continuity plans?',NULL,1,0,1,0,3),(154,'What is the plan in case of network, server or database failure and is it exhaustive?','What is the plan in case of network, server or database failure and is it exhaustive?',NULL,2,0,23,0,4),(155,'Is there attacks/accidents simulation inside the company to check the business continuity plans?','Is there attacks/accidents simulation inside the company to check the business continuity plans?',NULL,1,0,23,0,3),(156,'Are all the possible events leading in a slowed down or stopped business known and documented?','Are all the possible events leading in a slowed down or stopped business known and documented?',NULL,3,0,23,0,5),(157,'Are employees sensibilized to best practices and risks?','Are employees sensibilized to best practices and risks?',NULL,1,0,24,0,5),(158,'Are employees trained to detect suspicious activities?','Are employees trained to detect suspicious activities?',NULL,2,0,24,0,5),(159,'What is the policy of the company toward personal devices?','What is the policy of the company toward personal devices?',NULL,0,0,24,0,6),(160,'How is the password policy of the company and is it followed by employees?','How is the password policy of the company and is it followed by employees?',NULL,4,0,24,0,4),(161,'Is the activity of the company sensible toward social activism?','Is the activity of the company sensible toward social activism?',NULL,5,0,24,0,4),(162,'Are there social activists inside the company and are they able to access sensitive data?','Are there social activists inside the company and are they able to access sensitive data?',NULL,6,0,24,0,5),(163,'Is the company service protected against DDoS attacks?','Is the company service protected against DDoS attacks?',NULL,7,0,24,0,6),(164,'Is there a physical threat due to the physical location of the company and what is the degree of protection?','Is there a physical threat due to the physical location of the company and what is the degree of protection?',NULL,8,0,24,0,3),(165,'How do you assess the ratio of the probability by the impact of the main threats that could occur to the company?','How do you assess the ratio of the probability by the impact of the main threats that could occur to the company?',NULL,9,0,24,0,6),(166,'Is the company aware of the main threats and what is the plan in such events?','Is the company aware of the main threats and what is the plan in such events?',NULL,10,0,24,0,5),(167,'Is there a Chief Information Security Officer inside the company and does he have enough budget and manpower to fulfil his missions?','Is there a Chief Information Security Officer inside the company and does he have enough budget and manpower to fulfil his missions?',NULL,1,0,25,0,5),(168,'Is there a constant procedure of planning, doing, checking and acting (Deming Wheel) in order to maintain and develop security inside the company?','Is there a constant procedure of planning, doing, checking and acting (Deming Wheel) in order to maintain and develop security inside the company?',NULL,2,0,25,0,5),(169,'Is teaching and training the employees an important part of the security management of the company?','Is teaching and training the employees an important part of the security management of the company?',NULL,3,0,25,0,4),(170,'How are treated the issues regarding security?','How are treated the issues regarding security?',NULL,4,0,25,0,4),(171,'Is there clear indicators regarding accidents or attacks in order to react quickly?','Is there clear indicators regarding accidents or attacks in order to react quickly?',NULL,5,0,25,0,4),(172,'Are there formalized and documented procedures for possibles events that could affect the company in a negative way?','Are there formalized and documented procedures for possibles events that could affect the company in a negative way?',NULL,6,0,25,0,6),(173,'Is the risk analysis methodology of the company a center element of every decision and how are they done?','Is the risk analysis methodology of the company a center element of every decision and how are they done?',NULL,7,0,25,0,5),(174,'Is the company investing enough money to its security regarding its size, activity and development?','Is the company investing enough money to its security regarding its size, activity and development?',NULL,8,0,25,0,6),(175,'Are security audits done frequently and how?','Are security audits done frequently and how?',NULL,9,0,25,0,4),(176,'Are the employees trained regularly in order to be aware of all possible threats?','Are the employees trained regularly in order to be aware of all possible threats?',NULL,1,0,26,0,5),(177,'If external workers come in the company regularly (cleaning service for instance), how are they controlled?','If external workers come in the company regularly (cleaning service for instance), how are they controlled?',NULL,2,0,26,0,4),(178,'Are the employees applying the right level of security that is expected from them?','Are the employees applying the right level of security that is expected from them?',NULL,3,0,26,0,4),(179,'What are the measures taken if an employee doesn’t apply the security procedures of the company?','What are the measures taken if an employee doesn’t apply the security procedures of the company?',NULL,4,0,26,0,2),(180,'What is the procedure when an employee quits the company? Are all his access revoked properly? Are his activities checked in order to assure that no information has been compromised or leaked?','What is the procedure when an employee quits the company? Are all his access revoked properly? Are his activities checked in order to assure that no information has been compromised or leaked?',NULL,5,0,26,0,6);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29 20:47:42
