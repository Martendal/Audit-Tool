var dbManager = Object.create(Object);
var mysql = require('mysql');

module.exports = dbManager;




dbManager.prototype.addQuestion = function (pool, p_ParentID, p_DomainID, p_Question, p_Explication, p_CoeffID)
{
    console.log ("ParentID: ", p_ParentID);
    console.log ("DomainID: ", p_DomainID);
    console.log ("Question: ", p_Question);
    console.log ("Explication: ", p_Explication);
    console.log ("coefficientID: ", p_CoeffID);

    var last_index = 0;

    if (p_Question == "") return "Impossible d'ajouter la question: intitulé vide"; // Avoid to add an empty question
    if (p_Explication == "") p_Explication = null;  // If there is no explanation we set the variable to null;
    if (p_ParentID == null) p_ParentID = 0; // If there is no parent question we set the parentID to 0

    try{
        pool.getConnection(function(err, connection) {
            if(err) {
                throw err;
            }
            else {
                // Reset the auto-increment in order to avoid big hole between ids
                connection.query("ALTER TABLE question AUTO_INCREMENT = 1", function(err, res) {
                    if(err) throw err;
                    else console.log("OK INCREMENT");
                });

                // Insert the new question in the database
                connection.query("insert into question (Question, Explication, Image, Numero, ParentID, DomaineID, CoeffID) " +
                                  "value (" + mysql.escape(p_Question) + "," + mysql.escape(p_Explication) + "," + mysql.escape(null) + "," + mysql.escape(null) + "," + mysql.escape(p_ParentID) + "," + mysql.escape(p_DomainID) + "," + mysql.escape(p_CoeffID) + ")"
                                   , function(err, res) {
                    if(err) throw err;
                    else console.log("OK INSERT");
                    last_index = res.insertId;

                    // If the question has a parent we need to fill the list_sous_question we the new question
                    if (p_ParentID != 0) 
                    {
                        console.log("last_index: ", last_index);
                        connection.query("INSERT INTO list_sous_question (idmain_question, idsous_question) " +
                                         "VALUE (" + mysql.escape(p_ParentID) + "," + mysql.escape(last_index) + ") " +
                                         "ON DUPLICATE KEY UPDATE idmain_question = idmain_question"
                                       , function(err, res) {
                            if(err) throw err;
                            else console.log("OK INSERT");
                        });
                    }
                });

                // If the question has a parent we need to update the NumOFChild column of the parent
                if (p_ParentID != 0) 
                {
                    console.log("last_index: ", last_index);
                    connection.query("UPDATE question SET NumOfChild = NumOfChild + 1 WHERE idquestion = " + mysql.escape(p_ParentID)
                                   , function(err, res) {
                        if(err) throw err;
                        else console.log("OK UPDATE");
                    });
                }
                connection.release();
                return "OK";
            }
        });
    }
    catch(e) {
        console.log(e);
    }


        /*CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_Question`(IN Question mediumtext, IN Explication LONGTEXT, IN ImagePath VARCHAR(255), IN Numero INT, IN ParentID INT, IN DomaineID INT, IN CoeffID INT)
add_question:BEGIN
/*

    DECLARE last_index int;         -- L'index du dernier élément ajouté dans une table
    DECLARE last_row_inserted int;  -- L'index du dernier élément ajouté dans une table 
    DECLARE size int;               -- La taille totale de la table des sous-domaines
    DECLARE i int;                  -- Un compteur
    DECLARE otherParent int;        -- L'index d'un parent (différent de ParentID)

    
    SET last_index = (SELECT LAST_INSERT_ID()); 

    
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
END
*/
}