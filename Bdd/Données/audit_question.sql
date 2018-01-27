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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COMMENT='La table composant une question';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'La topographie du site assure-t-elle une sécurité satisfaisante?','La topographie actuelle réduit-t-elle les moyens d\'attaque ou d\'accès?',NULL,1,0,1,0,1),(2,'Combien y a-t-il de points d\'entrée?','Comptez le nombre de points d\'entrée physique au site.',NULL,2,0,1,1,1),(3,'Sont-ils bien surveillés?','L\'accès à ces points sont-ils surveillés (ex: badge nécessaire, vigile à l\'entrée, caméra de sécurité, ...)',NULL,3,2,1,0,1),(4,'Toutes les personnes entrantes et sortantes passent-elles par un point de contrôle?','Présentation obligatoire d\'un badge / papier d\'identité. Une distinguestion est-elle faite selon le grade de la personne?',NULL,4,0,1,0,1),(5,'Les portes, fenêtres, portails, tourniquets sont-ils surveillés?','Ce point porte plus particulièrement sur des zones donnant un accès à une zone sensible de l\'entreprise',NULL,5,0,1,0,1),(6,'Les moyens d\'entrée peuvent-ils être consultés pour identifier qui a accédé à ces zones?','Logs de passages, registres des entrées sorties sur papier, ...',NULL,6,0,1,0,1),(7,'Le site est-il entouré dune clôture quelconque?','Murs, grillage, ...',NULL,7,0,1,2,1),(8,'Ces clôtures sont-elles suffisamment hautes pour réduire l\'accès non autorisé à la propriété?','Plus elles sont hautes mieux c\'est (§on pourrait indiquer un nombre de mètre à partir duquel ça devient bien§)',NULL,8,7,1,0,1),(9,'La clôture est-elle vérifiée régulièrement?','Afin de déceler des trous, des dommages ou des points d\'accès.',NULL,9,7,1,0,1),(10,'Les portes d\'entrée sont-elles sécurisées et fonctionnent-elles correctement?','Moyen de les verrouiller, se ferme bien, ...',NULL,10,0,1,0,1),(11,'Les véhicules sont-ils autorisés à accéder librement à la propriété?','Présence de barrières de parking, d\'un vigile qui vérifie que le véhicule est bien autorisé à pénétrer dans l\'enceinte',NULL,11,0,1,0,1),(12,'Les fenêtres pouvant être ouvertes ont-elles un moyen d\'être verrouillées?','Un verrou, fermeture automatique, ...',NULL,12,0,1,0,1),(13,'Si de grandes vitres sont installées dans le bâtiment, sont-elles laminées avec un film de sécurité pour empêcher l\'entrée forcée?',NULL,NULL,13,0,1,0,1),(14,'L\'organisation possède-t-elle du personnel de sécurité?',NULL,NULL,14,0,1,1,1),(15,'Les ascenseurs et les escaliers sont-ils contrôlés par le personnel de sécurité?','Si oui, la fréquence de contrôlé permet de déterminer la note',NULL,15,14,1,0,1),(16,'L\'organistation utilise-t-elle des moyens de vidéo surveillance?',NULL,NULL,16,0,1,4,1),(17,'Le périmètre du bâtiment et le périmètre de la propriété sont-ils adéquatement couverts par des caméras?','',NULL,17,16,1,0,1),(18,'Les entrées et sorties du bâtiment sont-elles surveillées par des caméras?','',NULL,18,16,1,0,1),(19,'Les cages d\'escalier et autres points d\'accès sont-ils surveillés par des caméras?','',NULL,19,16,1,0,1),(20,'Les caméras sont-elles visionnées 24 heures sur 24 ou seulement après un incident?','La fréquence de contrôle peut aider à déterminer la note',NULL,20,16,1,0,1),(21,'Les serrures et l\'équipement de verrouillage sont-ils en bon état et fonctionnent-ils correctement?','',NULL,21,0,1,0,1),(22,'Les anciens employés ont-ils encore des clés ou des cartes d\'accès au bâtiment?',NULL,NULL,22,0,1,0,1),(23,'Les anciens employés / employés licenciés ont-ils été retirés de l\'accès à la propriété?',NULL,NULL,23,0,1,0,1),(24,'Les employés ont-ils été formés à identifier du phishing?','',NULL,1,0,2,0,1),(25,'Les employés laissent leur session ouverte lorsqu\'ils quittent leur bureau?','',NULL,2,0,2,0,1),(26,'Est-ce que certaines informations importantes sont laisser sur des post-it?','Mot de passe réseau / session, code / information sensible',NULL,3,0,2,0,1),(27,'Les employés sont-ils autorisés à aller sur tous les sites Web qu\'ils désirent?',NULL,NULL,4,0,2,0,1),(28,'Les employés sont-ils autorisés à apporter et à utiliser leur propre matériel pour travailler?','Ordinateur personnel, téléphone, clé USB, ...',NULL,5,0,2,0,1),(29,'Les employés sont-ils autorisés à rapporter des informations à leur domicile?','Du code, documents papiers, ...',NULL,6,0,2,0,1),(30,'Y a-t-il un endroit où toutes les données sont stockées?','Datacenter, ...',NULL,1,0,3,0,1),(31,'Est-ce que les équipes utilisent des sites Web / méthodes tiers pour partager leur travail entre elles?','Github, Bitbucket, service could, ...',NULL,2,0,3,0,1),(32,'Les logs sont-ils conservés?',NULL,NULL,3,0,3,0,1),(33,'Existe-t-il un département spécial dédié à la gestion de l\'intégrité des données?',NULL,NULL,4,0,3,0,1),(34,'Y a-t-il un département spécial dédié à l\'étude des logs?',NULL,NULL,5,0,3,0,1),(35,'Est-ce que les données sensibles sont cryptées',NULL,NULL,6,0,3,0,1),(36,'Des sauvegardes sont-elles effectuées?','Si oui, la fréquence aide à déterminer la note',NULL,7,0,3,0,1),(37,'Quels appareils de liaisons sont utilisés?','(HUB, SWITCH, ROUTER, …)',NULL,1,0,4,0,1),(38,'Un pare-feu est-il en place?',NULL,NULL,2,0,4,0,1),(39,'Un serveur proxy est-il en place?',NULL,NULL,3,0,4,0,1),(40,'Un serveur AAA est-il en place?',NULL,NULL,4,0,4,0,1),(41,'Les employés peuvent-ils se connecter au réseau interne depuis l\'extérieur?',NULL,NULL,5,0,4,0,1),(42,'Y a-t-il des points d\'accès Wi-Fi?',NULL,NULL,6,0,4,1,1),(43,'Le mot de passe est-il assez fort?','Longueur, diversité des caractères, aucun patern, ...',NULL,7,42,4,0,1),(44,'Des VLAN sont-ils en place?',NULL,NULL,8,0,4,0,1),(45,'Les switchs filtrent-ils les machines via leurs adresses MAC?',NULL,NULL,9,0,4,0,1),(46,'Quels sont les algorithmes de chiffrements utilisés?','SHA-1, SHA-256, AES, ...',NULL,10,0,4,0,1),(47,'OSPF est-il utilisé?',NULL,NULL,11,0,4,0,1),(48,'RIP est-il utilisé?',NULL,NULL,12,0,4,0,1),(49,'Le system lève-t-il une alerte en cas d\'intrusion?','IPS, IDS',NULL,13,0,4,0,1),(50,'Y a-t-il des ports ethernet libre?',NULL,NULL,14,0,4,1,1),(51,'Sont-ils activés?',NULL,NULL,15,50,4,0,1),(52,'Certaines machines utilisent-elles le promocious mode (ou équivalent comme le monitor mode)?',NULL,NULL,16,0,4,0,1),(53,'Y a-t-il un département de sécurité réseau?',NULL,NULL,17,0,4,0,1),(54,'L\'organisation protège-t-elle ses logiciels?',NULL,NULL,1,0,5,0,1),(55,'L\'organisation utilise-t-elle des logiciels piraté?',NULL,NULL,2,0,5,0,1),(56,'L\'organisation utilise-t-elle un antivirus?',NULL,NULL,3,0,5,0,1),(57,'Après la découverte d\'une faille, une mise à jour est-elle effectuée rapidement?',NULL,NULL,4,0,5,0,1);
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

-- Dump completed on 2018-01-27  2:57:28
