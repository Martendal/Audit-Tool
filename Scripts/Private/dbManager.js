var dbManager = Object.create(Object);
var mysql = require('mysql');

module.exports = dbManager;



/******************************************************************************/
/*                      Add a question to the database                        */
/*                                                                            */
/*  @Param pool          : the database                                       */
/*  @Param p_ParentID    : the id of the possible parent question             */
/*  @Param p_DomainID    : the id of the domain the question belongs to       */
/*  @Param p_Question    : the question text                                  */
/*  @Param p_Explication : the question explanation                           */
/*  @Param p_CoeffID     : the id of the coeeficient applied to the question  */
/******************************************************************************/
dbManager.prototype.addQuestion = function (pool, p_ParentID, p_DomainID, p_Question, p_Explication, p_CoeffID)
{
    console.log ("BEGIN ADD QUESTION");

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

                    // Don't forget to add the question to all the package that contains its domain
                    connection.query("SELECT DISTINCT NomPackage, PackageID FROM package_question_list WHERE DomaineID = " + mysql.escape(p_DomainID)
                                   , function(err, res) {
                        if(err) throw err;
                        else console.log("OK INSERT PAKAGE");
                        console.log("res: ", res)
                        for (var i = 0; i < res.length; i++) {
                            connection.query("INSERT INTO package_question_list (NomPackage, PackageID, QuestionID, DomaineID) " +
                                             "VALUE (" + mysql.escape(res[i].NomPackage) + "," + mysql.escape(res[i].PackageID) + "," + mysql.escape(last_index) + "," + mysql.escape(p_DomainID) + ") " +
                                             "ON DUPLICATE KEY UPDATE NomPackage = NomPackage"
                                   , function(err, res) {
                                if(err) throw err;
                                else console.log("OK INSERT PAKAGE");
                            });
                        }
                    });

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
                console.log("END ADD QUESTION");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}


/*****************************************************************************************/
/*  Delete recursively all sub-question of the given parent (it also delete the parent)  */
/*                                                                                       */
/*  @Param pool         : the database                                                   */
/*  @Param p_QuestionID : the id of the question                                         */
/*  @Param p_ParentID   : the id of the parent question                                  */
/*  @Param p_NumOfChild : the number of sub-question                                     */
/*****************************************************************************************/
function deleteParentQuestionAndAllSubQuestion (pool, p_ParentID)
{
    try{
        pool.getConnection(function(err, connection) {
            if(err) {
                throw err;
            }
            else 
            {
                console.log("BEGIN DELETE SUB-QUESTION");

                // Select all the child of the parent question
                connection.query("SELECT idquestion, NumOfChild FROM question WHERE ParentID = " + mysql.escape(p_ParentID)
                               , function(err, res) {
                    if(err) throw err;
                    for (var i = 0; i < res.length; i++)
                    {
                        // Check if the child has some sub-question
                        if (res[i].NumOfChild > 0)
                        {
                            deleteParentQuestionAndAllSubQuestion(pool, res[i].idquestion);
                        }

                        // Delete the sub-question from the question table
                        connection.query("DELETE FROM question WHERE idquestion = " + mysql.escape(res[i].idquestion)
                               , function(err, res) {
                                if(err) throw err;
                                else console.log("OK DELETE SUB-QUESTION TABLE");
                        });

                        // Delete the sub-question from all the package
                        connection.query("DELETE FROM package_question_list WHERE QuestionID = " + mysql.escape(res[i].idquestion)
                               , function(err, res) {
                                if(err) throw err;
                                else console.log("OK DELETE SUB-QUESTION PACKAGE");
                        });

                        // Delete the sub-question from list_sous_question table
                        connection.query("DELETE FROM list_sous_question WHERE idmain_question = " + mysql.escape(res[i].idquestion) + " OR idsous_question = " + mysql.escape(res[i].idquestion)
                               , function(err, res) {
                                if(err) throw err;
                                else console.log("OK DELETE SUB-QUESTION LIST SOUS QUESTION");
                        });
                    }
                });

                // Delete the question from the question table
                connection.query("DELETE FROM question WHERE idquestion = " + mysql.escape(p_ParentID)
                       , function(err, res) {
                        if(err) throw err;
                        else console.log("OK DELETE QUESTION TABLE");
                });

                // Delete the question from all the package
                connection.query("DELETE FROM package_question_list WHERE QuestionID = " + mysql.escape(p_ParentID)
                       , function(err, res) {
                        if(err) throw err;
                        else console.log("OK DELETE QUESTION PACKAGE");
                });

                // Delete the question from list_sous_question table
                connection.query("DELETE FROM list_sous_question WHERE idmain_question = " + mysql.escape(p_ParentID) + " OR idsous_question = " + mysql.escape(p_ParentID)
                       , function(err, res) {
                        if(err) throw err;
                        else console.log("OK DELETE QUESTION LIST SOUS QUESTION");
                });

            }
            connection.release();
            console.log("END DELETE SUB-QUESTION");
        });
    }
    catch(e) {
        console.log(e);
    }
}



/*********************************************************/
/*          Delete a question of the database            */
/*                                                       */
/*  @Param pool         : the database                   */
/*  @Param p_QuestionID : the id of the question         */
/*  @Param p_ParentID   : the id of the parent question  */
/*  @Param p_NumOfChild : the number of sub-question     */
/*********************************************************/
dbManager.prototype.deleteQuestion = function (pool, p_QuestionID, p_ParentID, p_NumOfChild)
{
    console.log("BEGIN DELETE QUESTION");
 
    console.log ("QuestionID: ", p_QuestionID);
    console.log ("ParentID: ", p_ParentID);
    console.log ("NumOfChild: ", p_NumOfChild);

    if (p_QuestionID == 0 || p_QuestionID == null) return "Impossible de supprimer une question ayant un ID null ou égal à 0";

    try{
        pool.getConnection(function(err, connection) {
            if(err) {
                throw err;
            }
            else 
            {
                // If the question has some sub-questions we need to delete it too
                if (p_NumOfChild > 0)
                {
                    deleteParentQuestionAndAllSubQuestion (pool, p_QuestionID)
                }
                else
                { // As the above funtion delete the actual question we need to do it here if the question has no sub-question
                    connection.query("DELETE FROM question WHERE idquestion = " + mysql.escape(p_QuestionID)
                                           , function(err, res) {
                                if(err) throw err;
                                else console.log("OK DELETE QUESTION TABLE");
                    });

                    // Delete the question from all the package
                    connection.query("DELETE FROM package_question_list WHERE QuestionID = " + mysql.escape(p_QuestionID)
                           , function(err, res) {
                            if(err) throw err;
                            else console.log("OK DELETE QUESTION PACKAGE");
                    });
                }

                // If the question has a parent we need to update the NumOFChild column of the parent
                if (p_ParentID != 0) 
                {
                    // Update the number of child that the parent question has
                    connection.query("UPDATE question SET NumOfChild = NumOfChild - 1 WHERE idquestion = " + mysql.escape(p_ParentID)
                           , function(err, res) {
                            if(err) throw err;
                            else console.log("OK UPDATE DELETE");
                    });

                    if (p_NumOfChild == 0)
                    {
                        // Delete the question from list_sous_question table
                        connection.query("DELETE FROM list_sous_question WHERE idsous_question = " + mysql.escape(p_QuestionID)
                               , function(err, res) {
                                if(err) throw err;
                                else console.log("OK DELETE QUESTION LIST SOUS QUESTION");
                        });
                    }
                }
                
                connection.release();
                console.log("END DELETE QUESTION");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}