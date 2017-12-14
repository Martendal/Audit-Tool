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
-- Dumping routines for database 'audit'
--
/*!50003 DROP FUNCTION IF EXISTS `Delete_Domain_From_List_Sous_Domaine` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `Delete_Domain_From_List_Sous_Domaine`(DomaineID INT) RETURNS int(11)
BEGIN
/*
*	Supprime le domaine placé en paramètre de la liste des sous-domaines
*
* 	@Param DomaineID L'index du domaine à supprimer (ne peut être null)
*/
	DECLARE size int;			-- La taille totale de la table des sous-domaines
	DECLARE i int;				-- Un compteur
    DECLARE Parent int;			-- L'index du domaine parent
    DECLARE row_index int;		-- Index de la question dans la liste des sous-domaines
    
    IF (DomaineID = 0 or DomaineID IS NULL) then 
		return 0;
	end if;
    
    
	-- Supprime toutes les questions et sous-questions associées au domaine
	while ((Select idquestion from question where question.DomaineID = DomaineID limit 1) IS NOT NULL) do
		call Delete_Question ((Select idquestion from question where question.DomaineID = DomaineID limit 1));
	end while;
    --
    
	-- Initilise des variables --
	SET size = (SELECT COUNT(*) from list_sous_domaine);
	SET i = 0;										
	--
        
	-- Parcourt toute la table des sous-domaines pour supprimer le domaine des sous-domaines de tous les parents correspondant
	while (i < size) do
    
		if ((select idsous_domaine from list_sous_domaine limit i,1) = DomaineID) then 
        
			SET Parent = (select idmain_domaine from list_sous_domaine limit i,1);		    -- Récupère l'index du domaine parent
			SET row_index = (select idlist_sous_domaine from list_sous_domaine limit i,1);  -- Récupère l'index dans la liste
			delete from list_sous_domaine where idlist_sous_domaine = row_index limit 1;	-- Supprime le domaine de la liste des sous-domaines
			update domaine SET NumOfChild = NumOfChild-1 Where iddomaine = Parent limit 1;  -- Supprime un enfant du compteur du parent
			SET size = size-1;
			SET i = i-1;
            
		end if;
        
		SET i = i+1;
	end while;
	--
RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `Delete_Question_From_List_Sous_Question` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `Delete_Question_From_List_Sous_Question`(QuestionID INT) RETURNS int(11)
BEGIN
/*
*	Supprime la question placée en paramètre de la liste des sous-questions
*
* 	@Param QuestionID L'index de la question à supprimer (ne peut être null)
*/
	DECLARE size int;			-- La taille totale de la table des sous-questions
	DECLARE i int;				-- Un compteur
    DECLARE Parent int;			-- L'index de la question parente
    DECLARE row_index int;		-- Index de la question dans la liste des sous-questions
    
    IF (QuestionID = 0 or QuestionID IS NULL) then 
		return 0;
	end if;
    
	-- Initilise des variables --
	SET size = (SELECT COUNT(*) from list_sous_question);
	SET i = 0;										
	--
        
	-- Parcourt toute la table des sous-questions pour supprimer la question des sous-questions de tous les parents correspondant
	while (i < size) do
    
		if ((select idsous_question from list_sous_question limit i,1) = QuestionID) then 
        
			SET Parent = (select idmain_question from list_sous_question limit i,1);		  -- Récupère l'index de la question parente
			SET row_index = (select idlist_sous_question from list_sous_question limit i,1);  -- Récupère l'index dans la liste
			delete from list_sous_question where idlist_sous_question = row_index limit 1;	  -- Supprime la question de la liste des sous-questions
			update question SET NumOfChild = NumOfChild-1 Where idquestion = Parent limit 1;  -- Supprime un enfant du compteur du parent
			SET size = size-1;
			SET i = i-1;
            
		end if;
        
		SET i = i+1;
	end while;
	--
    
RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Add_Domain` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_Domain`(IN Nom VARCHAR(45), IN ParentID INT)
add_domain:BEGIN
/*
*	Ajoute un nouveau domaine et remplit la table des sous-domaines en fontion des données placées en paramètres
*
*	@Param Nom 		Le nom du domaine (ne peut être null)
* 	@Param ParentID L'index de domaine parent (si 0 ou null aucune entrée ne sera ajoutée à la table des sous-domaines)
*/
	DECLARE last_index int; 		-- L'index du dernier élément ajouté dans une table 
    DECLARE last_row_inserted int; 	-- L'index du dernier élément ajouté dans une table 
    DECLARE size int;				-- La taille totale de la table des sous-domaines
	DECLARE i int; 					-- Un compteur
    DECLARE otherParent int;		-- L'index d'un parent (différent de ParentID)

    if Nom IS NULL then
		Leave add_domain;
    end if;
    
    call Reset_Table_Auto_Increment('domaine');
    
	SET last_index = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table 
    
    if (ParentID = 0 or ParentID IS NULL) then
    -- Pas de parent Indiqué
    
		-- Tente d'ajouter un nouveau domaine, ne fait rien en cas de doublon
		insert into domaine (Nom)
		value (Nom)
        on duplicate key update domaine.Nom = Nom;
        --
        
        SET last_row_inserted = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table 
        
        if (last_row_inserted = last_index) then
        -- Aucun ajout n'a été effectué
            call Reset_Table_Auto_Increment('domaine');
			Leave add_domain;
        end if;
        
	else
		-- Tente d'ajouter un nouveau domaine, ne fait rien en cas de doublon
		insert into domaine (Nom, ParentID)
		value (Nom, ParentID)
        on duplicate key update domaine.Nom = Nom;
        --
        
        SET last_row_inserted = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table 
        
		if (last_row_inserted = last_index) then 
        -- Aucun ajout n'a été effectué
			call Reset_Table_Auto_Increment('domaine');
			Leave add_domain;
        end if;
        
        -- Initilise des variables --   
		SET last_index = last_row_inserted; 				  
        SET size = (SELECT COUNT(*) from list_sous_domaine); 
        SET i = 0;											  
        --
        
        call Reset_Table_Auto_Increment('list_sous_domaine');
        
        -- Tente d'ajouter un nouveau domaine comme sous-domaine du parent indiqué, ne fait rien en cas de doublon
        insert into list_sous_domaine (idmain_domaine, idsous_domaine)
		value (ParentID, last_index)
        on duplicate key update idmain_domaine = idmain_domaine;
        --
        
        SET last_row_inserted = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table 
        
        if (last_row_inserted = last_index) then
        -- Aucun ajout n'a été effectué
			call Reset_Table_Auto_Increment('list_sous_domaine');
		else
        -- Un ajout a été effectué
			update domaine SET NumOfChild = NumOfChild+1 Where iddomaine = ParentID; -- Ajoute un enfant supplémentaire au parent
		end if;
        -- 
        
        -- Parcourt toute la table des sous-domaine pour ajouter le nouveau domaine comme sous-domaine à tous les parents du parent indiqué
        while (i < size) do
			if ((select idsous_domaine from list_sous_domaine limit i,1) = ParentID) then 
				
                SET last_index = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table 
				SET otherParent = (select idmain_domaine from list_sous_domaine limit i,1);
				
                -- Tente d'ajouter un nouveau domaine comme sous-domaine du parent indiqué, ne fait rien en cas de doublon
                insert list_sous_domaine (idmain_domaine, idsous_domaine)
				value (otherParent, last_index)
                on duplicate key update idmain_domaine = idmain_domaine;
                --
                
				SET last_row_inserted = (SELECT LAST_INSERT_ID()); -- L'index du dernier élément ajouté dans une table
                
				if (last_row_inserted = last_index) then		
                -- Aucun ajout n'a été effectué
					call Reset_Table_Auto_Increment('list_sous_domaine');
	            else 
                -- Un ajout a été effectué
					update domaine SET NumOfChild = NumOfChild+1 Where iddomaine = otherParent; -- Ajoute un enfant supplémentaire au parent
				end if;
    		
            end if;
            SET i = i+1;
        end while;
        --
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Add_Question` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_Question`(IN Question mediumtext, IN Explication LONGTEXT, IN ImagePath VARCHAR(255), IN Numero INT, IN ParentID INT, IN DomaineID INT)
add_question:BEGIN
/*
*	Ajoute une nouvelle question et remplit la table des sous-questions en fontion des données placées en paramètres
*
*	@Param Question    L'intitulé de la question (ne peut être null)
*	@Param Explication L'explication plus poussée de la question (peut être null)
*   @Param ImagePath   Le chemin vers une image illustrant la question (peut être null)
*   @Param Numero	   Le numéro d'ordre de la question (doit être si possible différent d'un numéro d'une question du même domaine)
* 	@Param ParentID    L'index de la question parente (si 0 ou null aucune entrée ne sera ajoutée à la table des sous-questions)
*   @Param DomaineID   L'index du domaine auquel la question appartient (si ParentID n'est pas null et différent de 0 le domaineID sera égal à celui de la question parente)
*/
	DECLARE last_index int;  		-- L'index du dernier élément ajouté dans une table
    DECLARE last_row_inserted int; 	-- L'index du dernier élément ajouté dans une table 
    DECLARE size int;        		-- La taille totale de la table des sous-domaines
	DECLARE i int;			 		-- Un compteur
    DECLARE otherParent int; 		-- L'index d'un parent (différent de ParentID)

    if Question IS NULL then
		Leave add_question;
    end if;
    
    call Reset_Table_Auto_Increment('question');
    
    -- Traite les cas où certains champ n'ont pas été rempli volontairement
    if Explication = '' then SET Explication = NULL; end if;
    if ImagePath = '' then SET ImagePath = NULL; end if;
    if ParentID != 0 AND ParentID IS NOT NULL then SET DomaineID = (SELECT question.domaineID FROM question WHERE question.idquestion = ParentID); end if;
    --
    
    SET last_index = (SELECT LAST_INSERT_ID()); 
    
    -- Tente d'ajouter une nouvelle question, ne fait rien en cas de doublon
	insert into Question (Question, Explication, Image, Numero, ParentID, DomaineID)
	value (Question, Explication, ImagePath, Numero, ParentID, DomaineID)
    on duplicate key update Question = Question;
    --
    
    SET last_row_inserted = (SELECT LAST_INSERT_ID());
	
    if (last_row_inserted = last_index) then
	-- Aucun ajout n'a été effectué
		call Reset_Table_Auto_Increment('question');
		Leave add_question;
	end if;
     
	if ParentID != 0 AND ParentID IS NOT NULL then  
        -- Initilise des variables --
		SET last_index = (SELECT LAST_INSERT_ID());      
		SET size = (SELECT COUNT(*) from list_sous_question);
        SET i = 0;
        --
        
		call Reset_Table_Auto_Increment('list_sous_question');
        
		-- Tente d'ajouter une nouvelle question comme sous-question du parent indiqué, ne fait rien en cas de doublon
        insert into list_sous_question (idmain_question, idsous_question)
		value (ParentID, last_index)
        on duplicate key update idmain_question = idmain_question;
        --
        
		SET last_row_inserted = (SELECT LAST_INSERT_ID());
	
		if (last_row_inserted = last_index) then
		-- Aucun ajout n'a été effectué
			call Reset_Table_Auto_Increment('list_sous_question');
		else
        -- Un ajout a été effectué
			update question SET NumOfChild = NumOfChild+1 Where idquestion = ParentID; -- Ajoute un enfant supplémentaire au parent
		end if;
        
        -- Parcourt toute la table des sous-questions pour ajouter la nouvelle question comme sous-question à toutes les parentes de la parente indiquée
        while (i < size) do
        
			if ((select idsous_question from list_sous_question limit i,1) = ParentID) then 
            
				SET last_index = (SELECT LAST_INSERT_ID()); 
				SET otherParent = (select idmain_question from list_sous_question limit i,1);
                
                -- Tente d'ajouter une nouvelle question comme sous-question du parent indiqué, ne fait rien en cas de doublon
                insert into list_sous_question (idmain_question, idsous_question)
				value (otherParent, last_index)
                on duplicate key update idmain_question = idmain_question;
                --
                
                SET last_row_inserted = (SELECT LAST_INSERT_ID());
	
				if (last_row_inserted = last_index) then
				-- Aucun ajout n'a été effectué
					call Reset_Table_Auto_Increment('list_sous_question');
				else
				-- Un ajout a été effectué
					update question SET NumOfChild = NumOfChild+1 Where idquestion = otherParent; -- Ajoute un enfant supplémentaire au parent
				end if;
                
			end if;
            SET i = i+1;
        end while;
        --
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Delete_Domain` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Domain`(IN DomaineID INT)
delete_domaine:BEGIN
/*
*	Supprime le domaine placée en paramètre ainsi que tous ses sous-domaines et les questions qui leurs sont associées
*
* 	@Param DomaineID L'index du domaine à supprimer (ne peut être null)
*/

    DECLARE Parent int;			-- L'index du domaine parent
    DECLARE Result int;			-- Le résultat d'une fonction de suppression
    
    if DomaineID = 0 or DomaineID IS NULL then
		leave delete_domaine;
    end if;
    
    SET max_sp_recursion_depth = 30;    
	SET Parent = (select ParentID from domaine where iddomaine = DomaineID);
    
    if (select NumOfChild from domaine where iddomaine = DomaineID limit 1) > 0 then
        
        -- Recherche le sous-domaine le plus bas et effectue les bonnes suppressions (Récursif)
        while (select NumOfChild from domaine where iddomaine = DomaineID) > 0 do
			call Delete_Domain ((select idsous_domaine from list_sous_domaine where idmain_domaine = DomaineID limit 1));
		end while;
		--
                
        SET Result = Delete_Domain_From_List_Sous_Domaine(DomaineID); -- Supprime le domaine de la liste des sous-domaines et les questions qui lui sont associées
        
    elseif (Parent != 0 or Parent IS NOT NULL) then
		SET Result = Delete_Domain_From_List_Sous_Domaine(DomaineID); -- Supprime le domaine de la liste des sous-domaines et les questions qui lui sont associées
    end if;
    
    -- Supprime toutes les questions et sous-questions associées au domaine
	while ((Select idquestion from question where question.DomaineID = DomaineID limit 1) IS NOT NULL) do
		call Delete_Question ((Select idquestion from question where question.DomaineID = DomaineID limit 1));
	end while;
    
    delete from domaine where iddomaine = DomaineID; -- Supprime le domaine
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Delete_Question` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Question`(IN QuestionID INT)
delete_question:BEGIN
/*
*	Supprime la question placée en paramètre ainsi que toutes ses sous-questions
*
* 	@Param QuestionID L'index de la question à supprimer (ne peut être null)
*/

    DECLARE Parent int;			-- L'index de la question parente
    DECLARE Result int;			-- Le résultat d'une fonction de suppression
    
    if QuestionID = 0 or QuestionID IS NULL then
		leave delete_question;
    end if;
    
    SET max_sp_recursion_depth=30;    
	SET Parent = (select ParentID from question where idquestion = QuestionID);
    
    if (select NumOfChild from question where idquestion = QuestionID limit 1) > 0 then
        
        -- Recherche la sous-question la plus basse et effectue les bonnes suppressions (Récursif)
        while (select NumOfChild from question where idquestion = QuestionID) > 0 do
			call Delete_Question ((select idsous_question from list_sous_question where idmain_question = QuestionID limit 1));
		end while;
		--
        
        SET Result = Delete_Question_From_List_Sous_Question(QuestionID); -- Supprime la question de la liste des sous-questions
        
    elseif (Parent != 0 or Parent IS NOT NULL) then
         SET Result = Delete_Question_From_List_Sous_Question(QuestionID); -- Supprime la question de la liste des sous-questions
    end if;
    
    delete from question where idquestion = QuestionID; -- Supprime la question
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Reset_Table_Auto_Increment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Reset_Table_Auto_Increment`(IN TableName varchar(45))
rtai:BEGIN
/*
*	Met à jour la valeur de l'auto-incrémente de la table passée en paramètre
*
*	@Param TableName Le nom de la table dont l'auto-incrémente doit être mis à jour
*/
	if TableName IS NULL then
		leave rtai;
    end if;

	SET @t1 = CONCAT('ALTER TABLE `audit`.`', TableName, '` AUTO_INCREMENT = 1'); -- Set la valeur de l'auto-incrémente à celle du dernier index valide + 1
	PREPARE stmt3 FROM @t1;
	EXECUTE stmt3;
	DEALLOCATE PREPARE stmt3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Show_Domain_Question` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Show_Domain_Question`(IN DomaineID INT)
show_domain_question:BEGIN
/*
*	Affiche les questions du domaine placée en paramètre ainsi que celle de tous les sous-domaines associés
*
* 	@Param DomaineID L'index du domaine à afficher (ne peut être null)
*/

	if DomaineID = 0 or DomaineID IS NULL then
		leave show_domain_question;
    end if;

	-- Questions du domaine principale
	(SELECT distinct
		`domaine`.`iddomaine` AS `DomaineID`,
        `domaine`.`Nom` AS `Nom`,
        `question`.`Question` AS `Question`
    FROM
        (`domaine`
        JOIN `question`)
    WHERE
        ((`question`.`DomaineID` = DomaineID)
            AND (`domaine`.`iddomaine` = DomaineID)))
	UNION
	-- Questions de tous les sous-domaine appartenant au domaine principale
	/*
	(SELECT
		dom.`iddomaine` AS `Nom`,
        dom.`Nom` AS `Nom`,
        (SELECT Question from question where question.domaineID = lsd.idsous_domaine limit 1) as Question
    FROM
        (domaine dom)
        INNER JOIN list_sous_domaine as lsd ON lsd.idsous_domaine = dom.iddomaine
        
    WHERE
        (lsd.idmain_domaine = domainId));*/
	(SELECT
		quest.`domaineID` AS `DomaineID`,
        (SELECT dom.Nom from domaine dom where dom.iddomaine = quest.domaineID) AS `Nom de domaine`,
        quest.Question
    FROM
        (question quest)
        INNER JOIN list_sous_domaine as lsd ON lsd.idsous_domaine = quest.domaineID
        
    WHERE
		(lsd.idmain_domaine = DomaineID))
	ORDER BY `DomaineID` ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-14 17:38:50
