var packageManager = Object.create(Object);
var mysql = require('mysql');

module.exports = packageManager;

/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/****************************************************************************************************** PACKAGE MANAGER ************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/


/***********************************************************************/
/*               Modify the given package question list                */
/*                                                                     */
/*  @Param pool           : the database                               */
/*  @Param p_Package      : the id of package                          */
/*  @Param p_Modification : the array containing all the modification  */
/***********************************************************************/
packageManager.prototype.modifyPackage = function (pool, p_PackageID, p_PackageName, p_Modification)
{
    console.log ("BEGIN MODIFY PACKAGE");

    console.log ("PackageID: ", p_PackageID);
    console.log ("Modification: ", p_Modification);

    var length;

    if (p_PackageID == null || p_PackageID == "" || p_PackageID == 0) return console.log("Impossible de modifier un package avec un id null ou égal à 0"); // Avoid to modify an empty package
    if (p_PackageName == null || p_PackageName == "") return console.log("Impossible de modifier un package avec un nom null"); 
    if (p_Modification == null) length = 0;  // No modification
    else length = p_Modification.length;
    
    try
    {
        pool.getConnection(function(err, connection)
        {
            if(err) {
                throw err;
            }
            else 
            {
                for (var i = 0; i < length; i++)
                {
                    if (p_Modification[i].status == 'true')
                    {
                        connection.query("INSERT INTO package_question_list (NomPackage, PackageID, QuestionID, DomaineID)" +
                                         "value (" + mysql.escape(p_PackageName) + "," + mysql.escape(p_PackageID) + "," + mysql.escape(p_Modification[i].idquestion) + "," + mysql.escape(p_Modification[i].domainID) + ")" +
                                         "ON DUPLICATE KEY UPDATE PackageID = PackageID"
                        , function(err, res)
                        {
                            if(err) throw err;
                            else console.log("OK INSERT PACKAGE");
                        });
                    }
                    else
                    {
                        connection.query("DELETE FROM package_question_list WHERE PackageID = " + mysql.escape(p_PackageID) + " AND QuestionID = " + mysql.escape(p_Modification[i].idquestion)
                        , function(err, res)
                        {
                            if(err) throw err;
                            else console.log("OK DELETE FROM PACKAGE");
                        });
                    }
                }

                connection.query("UPDATE package_question_list SET NomPackage = " + mysql.escape(p_PackageName) + " WHERE PackageID = " + mysql.escape(p_PackageID)
                , function(err, res)
                {
                    if(err) throw err;
                    else console.log("OK UPDATE FROM PACKAGE");
                });

                connection.query("UPDATE package SET Nom = " + mysql.escape(p_PackageName) + " WHERE idpackage = " + mysql.escape(p_PackageID)
                , function(err, res)
                {
                    if(err) throw err;
                    else console.log("OK UPDATE FROM PACKAGE");
                });

                connection.release();
                console.log("END MODIFY PACKAGE");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}



/*******************************************************/
/*     Delete the given package from the database      */
/*                                                     */
/*  @Param pool         : the database                 */
/*  @Param p_PackageID : the id of the package         */
/*******************************************************/
packageManager.prototype.deletePackage = function (pool, p_PackageID)
{
    console.log("BEGIN DELETE PACKAGE");
 
    console.log ("PackageID: ", p_PackageID);

    if (p_PackageID == 0 || p_PackageID == null) return console.log("Impossible de supprimer un package ayant un ID null ou égal à 0");

    try
    {
        pool.getConnection(function(err, connection)
        {
            if(err)
            {
                throw err;
            }
            else 
            {
                connection.query("SELECT PackageID FROM package_question_list WHERE PackageID = " + mysql.escape(p_PackageID)
                    , function(err, res)
                {
                    for (var i = 0; i < res.length; i++)
                    {
                        // Delete the question from package_question_list table
                        connection.query("DELETE FROM package_question_list WHERE PackageID = " + mysql.escape(p_PackageID)
                        , function(err, res)
                        {
                            if(err) throw err;
                            else console.log("OK DELETE PACKAGE LIST QUESTION");
                        });
                    }
                });
                
                // Delete the package from the package table
                connection.query("DELETE FROM package WHERE idpackage = " + mysql.escape(p_PackageID)
                , function(err, res)
                {
                    if(err) throw err;
                    else console.log("OK DELETE PACKAGE");
                });
                
                connection.release();
                console.log("END DELETE PACKAGE");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}


/*************************************/
/*   Add a package to the database   */
/*                                   */
/*  @Param pool  : the database      */
/*  @Param p_Nom : the package name  */
/*************************************/
packageManager.prototype.addPackage = function (pool, p_Nom)
{
    console.log ("BEGIN ADD Package");

    console.log ("Nom: ", p_Nom);

    if (p_Nom == null || p_Nom == "") return console.log("Impossible d'ajouter le package: nom vide"); // Avoid to add an empty question
    
    try{
        pool.getConnection(function(err, connection)
        {
            if(err) {
                throw err;
            }
            else {
                // Reset the auto-increment in order to avoid big hole between ids
                connection.query("ALTER TABLE package AUTO_INCREMENT = 1"
                , function(err, res)
                {
                    if(err) throw err;
                    else console.log("OK INCREMENT");
                });

                // Insert the new package in the database
                connection.query("INSERT INTO package (Nom) " +
                                  "value (" + mysql.escape(p_Nom) + ")"                   
                , function(err, res)
                {
                    if(err) throw err;
                    else console.log("OK INSERT");
                    last_index = res.insertId;
                });

                connection.release();
                console.log("END ADD PACKAGE");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}