
var MainTable = document.getElementById('tabs'); // The table containing all the inforamtion (domain, questions, buttons, ...)
    var actualActiveTab; // The actual active tab
    var actualAction;       // The actual in progress action (add, edit, ...)
    var coefficients;
   

    /*************************************************************************************************/
    /*                          Prints the elements to add a question to the database                            */
    /*                                                                                                                     */
    /*  @Param parentQuestion    : the id of the button that launch the function                             */
    /*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
    /*  @Param domainID             : the index where the parent question is located in retrieves data   */
    /*************************************************************************************************/
    function addQuestion (parentQuestion, parentQuestionID, domainID)
    {       
        questionName = document.getElementById("Intitulé").value;
        explication = document.getElementById("Explication").value;
        coefficient = document.getElementById("Coefficient").value;
        console.log ("Sous-question: ", questionName);
        console.log ("Explication: ", explication);
        console.log ("coefficientID: ", coefficient);
        $.get('/addQuestion/' + parentQuestionID + '/' + domainID + '/' + questionName + '/' + coefficient + '/' + explication);
    }

    /*************************************************************************************************/
    /*                          Prints the elements to add a question to the database                            */
    /*                                                                                                                     */
    /*  @Param parentQuestion    : the id of the button that launch the function                             */
    /*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
    /*  @Param domainID             : the index where the parent question is located in retrieves data   */
    /*************************************************************************************************/
    function printAddQuestionElements (parentQuestion, parentQuestionID, domainID)
    {       
        var tableDataContainer = document.getElementById(parentQuestion);
        
        if (actualAction != null) actualAction.container.removeChild(actualAction.div);

        var newElement = document.createElement("div");
        var title = document.createElement("h3");
        var form = document.createElement("form");
        var textArea = document.createElement("input");
        var selectArea = document.createElement ("select");
        var selectOption = document.createElement ("option");
        var fieldName = document.createElement ("div");
        var submit  = document.createElement("input");

        /* Variable to send that represent the actual ID in the database */
        var s_parentQuestionID = null;
        var s_domainID = domainsAndQuestions.domains[domainID].iddomaine;
        /*----------------------------------------*/

        /* Sets the title of the action */
        if (parentQuestionID != null)
        {
            title.appendChild(document.createTextNode("Ajout d'une sous-question"));
            s_parentQuestionID = domainsAndQuestions.questions[domainID][parentQuestionID].idquestion;
        }
        else title.appendChild(document.createTextNode("Ajout d'une question"));
        newElement.appendChild(title);
        /*------------------------------*/

        form.setAttribute("id", "Submit" + parentQuestion);
        form.setAttribute("action", "#!/managedatabase");
        form.setAttribute("onsubmit", "addQuestion(\"" + parentQuestion + "\"," + s_parentQuestionID + "," + s_domainID + ")");
        

        /* Set the area for the question formulation */
        fieldName.appendChild(document.createTextNode("Question"));
        fieldName.setAttribute ("style", "font-weight: bold;")
        form.appendChild(fieldName);
        textArea.setAttribute("id", "Intitulé");
        textArea.setAttribute("type", "text");
        textArea.setAttribute("class", "areaField");
        textArea.setAttribute("placeholder", "Intitulé de la question");
        textArea.setAttribute("required", true);
        form.appendChild(textArea);
        /*-------------------------------------------*/

        /* Set the area for the explication */
        fieldName = document.createElement ("div");
        fieldName.setAttribute ("style", "font-weight: bold;")
        fieldName.appendChild(document.createTextNode("Explication"));
        form.appendChild(fieldName);
        textArea = document.createElement("input");
        textArea.setAttribute("id", "Explication");
        textArea.setAttribute("type", "text");
        textArea.setAttribute("class", "areaField");
        textArea.setAttribute("placeholder", "Explication de la question");
        form.appendChild(textArea);
        /*----------------------------------*/
    
        /* Set the area for the coefficient */
        fieldName = document.createElement ("div");
        fieldName.appendChild(document.createTextNode("Coefficient"));
        fieldName.setAttribute ("style", "font-weight: bold;")
        form.appendChild(fieldName);
        selectArea.setAttribute("id", "Coefficient");
        for (var i = 0; i < coefficients.length; i++) 
        {
            selectOption = document.createElement("option");
            selectOption.setAttribute("value", coefficients[i].idcoefficient);
            selectOption.appendChild(document.createTextNode(coefficients[i].Valeur));
            selectArea.appendChild(selectOption);
        }

        form.appendChild(selectArea);
        /*----------------------------------*/

        submit.setAttribute("type", "submit");
        form.appendChild(submit);

        newElement.appendChild(form);
        tableDataContainer.appendChild(newElement);

        actualAction = { 
                container: tableDataContainer,
                div: newElement
        };

        console.log ("id: ", parentQuestion);
        console.log ("domainID: ", domainID);
        console.log ("Array: ", domainsAndQuestions);
        console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
        console.log ("Question: ", domainsAndQuestions.questions[domainID][parentQuestionID].Question);
    }


    /******************************************************************************************/
    /*                                  Print the question of the desired domain                        */
    /*                                                                                                              */
    /*  @Param domainID                  : the index where the domain is located in retrieves data  */
    /******************************************************************************************/
    function putQuestionInForm (domainID)
    {
        var questionID; // The question in the database
        var row;                // The row containing the question
        var cell;           // The cell containing the question
        var button;         // The different buttons (add, edit and delete)

        for (var i = 0; i < domainsAndQuestions.questions[domainID].length; i++) 
        {
            questionID = "Question " + domainsAndQuestions.questions[domainID][i].idquestion;

            row = MainTable.insertRow(i);
            cell = row.insertCell (0);

            /* Set row's attributes */
            row.setAttribute("id", "RowID " + i);
            if (i%2 == 0) row.setAttribute("class", "sombre");
            else row.setAttribute("class", "clair");
            /*-----------------------*/

            cell.setAttribute("id", questionID);
            cell.setAttribute("class", "borderL");
            cell.appendChild(document.createTextNode(domainsAndQuestions.questions[domainID][i].Question));

            /* Cell containing the add button */
            cell = row.insertCell (1);
            button = document.createElement("button");
            cell.setAttribute("class", "borderC");
            button.setAttribute("class", "buttonAdd");
            button.setAttribute("onClick", "printAddQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
            cell.appendChild (button);
            /*--------------------------------*/

            /* Cell containing the edit button */
            cell = row.insertCell (2);
            button = document.createElement("button");
            cell.setAttribute("class", "borderC");
            button.setAttribute("class", "buttonEdit");
            button.setAttribute("onClick", "printAddQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
            cell.appendChild (button);
            /*---------------------------------*/

            /* Cell containing the delete button */
            cell = row.insertCell (3);
            cell.setAttribute("class", "borderR");
            button = document.createElement("button");
            button.setAttribute("class", "buttonDelete");
            button.setAttribute("onClick", "printAddQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
            cell.appendChild (button);
            /*-----------------------------------*/

        }
    }


    /**********************************************************************************/
    /*                  Print the question associated to the tab (here a domain)                */
    /*                                                                                                      */
    /*  @Param triggerTabID : the ID of the tab that call this function                  */
    /*  @Param arrayID        : the index where the domain is located in retrieves data  */
    /**********************************************************************************/
    function printTabContent (triggerTabID, arrayID)
    {
        var activeTab = document.getElementById(triggerTabID);
        var classValue = activeTab.attributes.getNamedItem("class").value

          if (classValue.includes("active")) return;    // The tab is already active so we don't need to print the content again

          if (actualActiveTab != null)
          { // There is an active tab so we need to deletes its content from the view
                //console.log ("Num of Rows: ", MainTable.rows.length);
                while (MainTable.rows.length > 0) 
                {
                    MainTable.deleteRow(0);
                }
                actualActiveTab.setAttribute ("class", actualActiveTab.attributes.getNamedItem("class").value.replace (" active", ""));
          }

            actualActiveTab = activeTab;
            actualAction = null;
            classValue = classValue + " active";
            activeTab.setAttribute ("class", classValue);

            //var domainsAndQuestions = JSON.parse(result.responseText);

            putQuestionInForm (arrayID);
        }

    /**********************************************************************************/
    /*                  Retrieve the domains and questions from the database                 */
    /**********************************************************************************/
    var domainsAndQuestions; 
    $.get('/getDomains', array = function(c_domainsAndQuestions)
    {
        domainsAndQuestions = c_domainsAndQuestions;
        var newElement;
        var tabID;

        // Add the different domains as tab
        for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
        {
            tabID = "Domaine " + domainsAndQuestions.domains[i].iddomaine;

            newElement = document.createElement("th");

            newElement.setAttribute("id", tabID);           // The ID of the tab
            newElement.setAttribute("class", "tab");        // The style of the tab
            newElement.setAttribute("type", "button");  // Tell that the tab is clackable
            newElement.setAttribute("onClick", "printTabContent(\"" + tabID + "\", " + i + ")");    // Set the function to call in case of click
            newElement.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));    // Add the domain name to the view

            MainTable.appendChild(newElement);  // Add the tab to the table
        }
    });

    /**********************************************************************************/
    /*                          Retrieve the coefficients from the database                  */
    /**********************************************************************************/
    $.get('/getCoefficients', function (coeff)
    {
        coefficients = coeff;
    });
