
var MainTable = document.getElementById('tabs'); // The table containing all the inforamtion (domain, questions, buttons, ...)
var actualActiveTab; // The actual active tab
var actualAction;    // The actual in progress action (add, edit, ...)
   

/*************************************************************************************************/
/*                                  Add a question to the database                               */
/*                                                                                               */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function addQuestion (parentQuestionID, domainID)
{       
	questionName = document.getElementById("Intitulé").value;
	explication = document.getElementById("Explication").value;
	coefficient = document.getElementById("Coefficient").value;
	console.log ("Sous-question: ", questionName);
	console.log ("Explication: ", explication);
	console.log ("coefficientID: ", coefficient);
	console.log("", $.get('/addQuestion/' + parentQuestionID + '/' + domainID + '/' + questionName + '/' + coefficient + '/' + explication));
}

/*************************************************************************************************/
/*                       Prints the elements to add a question to the database                   */
/*                                                                                               */
/*  @Param questionLauncher  : the id of the button that launch the function                     */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function printAddQuestionElements (questionLauncher, parentQuestionID, domainID)
{       
	if (actualAction != null) actualAction.container.removeChild(actualAction.div);
	
	var tableDataContainer;									// The row that launched the function
	var newElement = document.createElement("div");			// The new div element that will contain all the form elements
	var title = document.createElement("h3");				// The title of the action
	var form = document.createElement("form");				// The form to fulfill
	var textArea = document.createElement("input");			// The text area to fulfill
	var selectArea = document.createElement ("select");		// The selection area	
	var selectOption = document.createElement ("option");	// The options of the selection area
	var fieldName = document.createElement ("div");			// The name of each field
	var submit  = document.createElement("input");			// The submit button to confirm the modification

	/* Variable to send that represent the actual ID in the database */
	var s_parentQuestionID;
	var s_domainID = domainsAndQuestions.domains[domainID].iddomaine;
	/*----------------------------------------*/

	/* Sets the title of the action */
	if (parentQuestionID != null)
	{
		tableDataContainer = document.getElementById(questionLauncher);
		title.appendChild(document.createTextNode("Ajout d'une sous-question"));
		s_parentQuestionID = domainsAndQuestions.questions[domainID][parentQuestionID].idquestion;
	}
	else
	{
		title.appendChild(document.createTextNode("Ajout d'une question"));
		s_parentQuestionID = 0;
	}
	newElement.appendChild(title);
	/*------------------------------*/

	form.setAttribute("id", "Submit" + questionLauncher);
	form.setAttribute("action", "#!/managedatabase");
	form.setAttribute("onsubmit", "addQuestion(" + s_parentQuestionID + "," + s_domainID + ")");


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

	/* Sets the actual action element regarding if there is a parent question or not */
	if (tableDataContainer != null) 
	{
		tableDataContainer.appendChild(newElement);

		actualAction = { 
			container: tableDataContainer,
			div: newElement
		};
	}
	else
	{
		MainTable.appendChild(newElement);

		actualAction = { 
			container: MainTable,
			div: newElement
		};
	}
	/*-------------------------------------------------------------------------------*/

	console.log ("id: ", questionLauncher);
	console.log ("domainID: ", domainID);
	console.log ("Array: ", domainsAndQuestions);
	console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
	if (parentQuestionID != null) console.log ("Question: ", domainsAndQuestions.questions[domainID][parentQuestionID].Question);
}



/******************************************************************************************/
/*                          Edit the question of the database                             */
/*                                                                                        */
/*  @Param questionID : the index where the parent question is located in retrieves data  */
/*  @Param numOfChild : the number of sub-questions the question has                      */
/******************************************************************************************/
function editQuestion (questionID, numOfChild)
{

    $.get('/editQuestion/' + questionID + '/' + document.getElementById("Intitulé").value + '/' + document.getElementById("Numéro").value + '/' + domainsAndQuestions.domains[document.getElementById("DomainID").value].iddomaine + '/' + document.getElementById("ParentID").value + '/'
                           + numOfChild + '/'  + document.getElementById("Coefficient").value + '/' + document.getElementById("Explication").value);
}


/******************************************************************************************/
/*  Update the select parentID question in order to propose those of the selected domain  */
/*                                                                                        */
/*  @Param questionID : the index where the parent question is located in retrieves data  */
/*  @Param domainID   : the index where the parent question is located in retrieves data  */
/******************************************************************************************/
function updateSelectQuestion (questionID, domainID)
{
    var selectParentID = document.getElementById ("ParentID");
    var selectedDomainID = document.getElementById ("DomainID").selectedIndex;

    console.log("selectedDomainID: ", selectedDomainID);

    while (selectParentID.hasChildNodes())
    {
        selectParentID.removeChild(selectParentID.lastChild);
    }

    // None option
    var selectOption = document.createElement("option");
    selectOption.setAttribute("value", "0");
    selectOption.appendChild(document.createTextNode("Aucune"));
    selectParentID.appendChild(selectOption);
    // Graphical option
    selectOption = document.createElement("option");
    selectOption.setAttribute("disabled", "disabled");
    selectOption.appendChild(document.createTextNode("──────────"));
    selectParentID.appendChild(selectOption);
    // All the others available questions (except the sub-question owned by the question)
    for (var i = 0; i < domainsAndQuestions.questions[selectedDomainID].length; i++)
    {
        if (domainsAndQuestions.questions[domainID][i].idquestion != domainsAndQuestions.questions[domainID][questionID].idquestion && domainsAndQuestions.questions[domainID][i].ParentID != domainsAndQuestions.questions[domainID][questionID].idquestion)
        {
            selectOption = document.createElement("option");
            selectOption.setAttribute("value", domainsAndQuestions.questions[domainID][i].idquestion);
            if (domainsAndQuestions.questions[domainID][questionID].ParentID == domainsAndQuestions.questions[domainID][i].idquestion) selectOption.setAttribute("selected", "selected");
            selectOption.appendChild(document.createTextNode(domainsAndQuestions.questions[domainID][i].idquestion + ". " + domainsAndQuestions.questions[domainID][i].Question));
            selectArea.appendChild(selectOption);
        }
    }
}


/*************************************************************************************************/
/*                      Prints the elements to edit a question of the database                   */
/*                                                                                               */
/*  @Param questionLauncher  : the id of the button that launch the function                     */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function printEditQuestionElements (questionLauncher, questionID, domainID)
{       
	if (actualAction != null) actualAction.container.removeChild(actualAction.div);
	
	var tableDataContainer = document.getElementById(questionLauncher);	 // The row that launched the function
	var newElement = document.createElement("div");						 // The new div element that will contain all the form elements
	var title = document.createElement("h3");							 // The title of the action
	var form = document.createElement("form");							 // The form to fulfill
	var textArea = document.createElement("input");						 // The text area to fulfill
	var selectArea = document.createElement ("select");					 // The selection area	
	var selectOption = document.createElement ("option");				 // The options of the selection area
	var fieldName = document.createElement ("div");						 // The name of each field
	var submit  = document.createElement("input");						 // The submit button to confirm the modification

	/* Sets the title of the action */
	title.appendChild(document.createTextNode("Modification d'une question"));
	newElement.appendChild(title);
	/*------------------------------*/

	form.setAttribute("id", "Submit" + questionLauncher);
	form.setAttribute("action", "#!/managedatabase");
	form.setAttribute("onsubmit", "editQuestion(" + domainsAndQuestions.questions[domainID][questionID].idquestion + ", " + domainsAndQuestions.questions[domainID][questionID].NumOfChild + ")");

    /* Set the area for the domain */
    fieldName = document.createElement ("div");
    fieldName.appendChild(document.createTextNode("Domaine"));
    fieldName.setAttribute ("style", "font-weight: bold;")
    form.appendChild(fieldName);
    // None option
    selectArea.setAttribute("id", "DomainID");
    selectArea.setAttribute("onchange", "updateSelectQuestion(" + questionID + ", " + domainID + ")");
    // All the others available questions
    for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
    {
        selectOption = document.createElement("option");
        selectOption.setAttribute("value", i);
        if (domainsAndQuestions.domains[i].iddomaine == domainsAndQuestions.domains[domainID].iddomaine) selectOption.setAttribute("selected", "selected");
        selectOption.appendChild(document.createTextNode(domainsAndQuestions.domains[i].iddomaine + ". " + domainsAndQuestions.domains[i].Nom));
        selectArea.appendChild(selectOption);
    }

    form.appendChild(selectArea);
    /*----------------------------------*/

	/* Set the area for the parent question */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Question parente"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	// None option
    selectArea = document.createElement ("select");
	selectArea.setAttribute("id", "ParentID");
	selectOption = document.createElement("option");
	selectOption.setAttribute("value", "0");
	selectOption.appendChild(document.createTextNode("Aucune"));
	selectArea.appendChild(selectOption);
	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectArea.appendChild(selectOption);
	// All the others available questions (except the sub-question owned by the question)
	for (var i = 0; i < domainsAndQuestions.questions[domainID].length; i++) 
	{
        if (domainsAndQuestions.questions[domainID][i].idquestion != domainsAndQuestions.questions[domainID][questionID].idquestion && domainsAndQuestions.questions[domainID][i].ParentID != domainsAndQuestions.questions[domainID][questionID].idquestion)
        {
		    selectOption = document.createElement("option");
		    selectOption.setAttribute("value", domainsAndQuestions.questions[domainID][i].idquestion);
		    if (domainsAndQuestions.questions[domainID][questionID].ParentID == domainsAndQuestions.questions[domainID][i].idquestion) selectOption.setAttribute("selected", "selected");
		    selectOption.appendChild(document.createTextNode(domainsAndQuestions.questions[domainID][i].idquestion + ". " + domainsAndQuestions.questions[domainID][i].Question));
		    selectArea.appendChild(selectOption);
        }
	}

	form.appendChild(selectArea);
	/*----------------------------------*/

	/* Set the area for the question formulation */
    fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Question"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	textArea.setAttribute("id", "Intitulé");
	textArea.setAttribute("type", "text");
	textArea.setAttribute("class", "areaField");
	textArea.setAttribute("placeholder", "Intitulé de la question");
	textArea.setAttribute("value", document.getElementById(questionLauncher).innerHTML);

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
	textArea.setAttribute("value", domainsAndQuestions.questions[domainID][questionID].Explication == null ? "" : domainsAndQuestions.questions[domainID][questionID].Explication);
	form.appendChild(textArea);
	/*----------------------------------*/

    /* Set the area for the apparition number */
    fieldName = document.createElement ("div");
    fieldName.setAttribute ("style", "font-weight: bold;")
    fieldName.appendChild(document.createTextNode("Numéro d'ordre"));
    form.appendChild(fieldName);
    textArea = document.createElement("input");
    textArea.setAttribute("id", "Numéro");
    textArea.setAttribute("type", "text");
    textArea.setAttribute("onkeypress", "return event.charCode >= 48 && event.charCode <= 57"); // Allows only numerics characters
    textArea.setAttribute("class", "areaField");
    textArea.setAttribute("placeholder", "Numéro d'ordre d'apparition de la question");
    textArea.setAttribute("value", domainsAndQuestions.questions[domainID][questionID].Numero == null ? "" : domainsAndQuestions.questions[domainID][questionID].Numero);
    form.appendChild(textArea);
    /*----------------------------------*/
	
	/* Set the area for the coefficient */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Coefficient"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	selectArea = document.createElement ("select");
	selectArea.setAttribute("id", "Coefficient");
	for (var i = 0; i < coefficients.length; i++) 
	{
		selectOption = document.createElement("option");
		selectOption.setAttribute("value", coefficients[i].idcoefficient);
		if (domainsAndQuestions.questions[domainID][questionID].CoeffID == coefficients[i].idcoefficient) selectOption.setAttribute("selected", "selected");
		selectOption.appendChild(document.createTextNode(coefficients[i].Valeur));
		selectArea.appendChild(selectOption);
	}

	form.appendChild(selectArea);
	/*----------------------------------*/

	submit.setAttribute("type", "submit");
	form.appendChild(submit);

	newElement.appendChild(form);

	/* Sets the actual action element regarding if there is a parent question or not */
	if (tableDataContainer != null) 
	{
		tableDataContainer.appendChild(newElement);

		actualAction = { 
			container: tableDataContainer,
			div: newElement
		};
	}
	else
	{
		MainTable.appendChild(newElement);

		actualAction = { 
			container: MainTable,
			div: newElement
		};
	}
	/*-------------------------------------------------------------------------------*/

	console.log ("id: ", questionLauncher);
	console.log ("domainID: ", domainID);
	console.log ("Array: ", domainsAndQuestions);
	console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
	if (questionID != null) console.log ("Question: ", domainsAndQuestions.questions[domainID][questionID].Question);
}




/***********************************************************************************/
/*     Create a modal alert to be sure the user wanted to delete the question      */
/*                                                                                 */
/*  @Param questionID : the index where the question is located in retrieves data  */
/*  @Param parentID   : the id of the parent question                              */
/*  @Param numOfChild : the number of sub-question                                 */
/***********************************************************************************/
function askDeleteQuestion (questionID, parentID, numOfChild)
{
	// Get the delete modal
	var modal = document.getElementById('deleteModal');

	// Create the modal content
	var modalContent = document.createElement('div');
	modalContent.setAttribute("id", "deleteModalContent");
	modalContent.setAttribute("class", "modal-content");

	modal.appendChild(modalContent);

	// Create the modal header
	var modalHeader = document.createElement('div');
	modalHeader.setAttribute("id", "deleteModalHeader");
	modalHeader.setAttribute("class", "modal-header");

	var title = document.createElement("h2");
	title.appendChild(document.createTextNode("Suppression d'une question"));
	modalHeader.appendChild(title);

	// Create the <span> element that closes the modal
	var span = document.createElement("span");
	span.setAttribute("class", "close");
	span.appendChild(document.createTextNode("x"));
	modalHeader.appendChild(span)

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.removeChild(modalContent);
    	modal.style.display = "none";
	}

	modalContent.appendChild(modalHeader);

	// Create the modal body
	var modalBody = document.createElement('div');
	modalBody.setAttribute("id", "deleteModalBody");
	modalBody.setAttribute("class", "modal-body");
	
	var body = document.createElement("p");
	body.appendChild(document.createTextNode("Vous êtes sur le point de supprimer une question de la base de donnée. Toutes les sous-questions associées seront également supprimées ! Êtes-vous sûr de vouloir continuer ?"));
	modalBody.appendChild(body);

	modalContent.appendChild(modalBody);

	// Create the modal footer
	var modalFooter = document.createElement('div');
	modalFooter.setAttribute("id", "deleteModalFooter");
	modalFooter.setAttribute("class", "modal-footer");
	
	// Create the yes button to proceed deletion
	var yesButton = document.createElement("button");
	yesButton.setAttribute("id", "Oui Modal");
	yesButton.appendChild(document.createTextNode("Oui"));

	// Proceed to deletion
	yesButton.onclick = function() {
	    $.get('/deleteQuestion/' + questionID + '/' + parentID + '/' + numOfChild);
	    modal.removeChild(modalContent);
    	modal.style.display = "none";
	}
	modalFooter.appendChild(yesButton);

	modalContent.appendChild(modalFooter);

	// Create the no button to cancel deletion
	var noButton = document.createElement("button");
	noButton.setAttribute("id", "Non Modal");
	noButton.appendChild(document.createTextNode("Non"));

	// Cancel deletion
	noButton.onclick = function() {
	    modal.removeChild(modalContent);
    	modal.style.display = "none";
	}
	modalFooter.appendChild(noButton);


	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.removeChild(modalContent);
    		modal.style.display = "none";
	    }
	}

    modal.style.display = "block";
}


/*******************************************************************************/
/*                  Print the question of the desired domain                   */
/*                                                                             */
/*  @Param domainID : the index where the domain is located in retrieves data  */
/*******************************************************************************/
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
		button.setAttribute("onClick", "printEditQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
		cell.appendChild (button);
		/*---------------------------------*/

		/* Cell containing the delete button */
		cell = row.insertCell (3);
		cell.setAttribute("class", "borderR");
		button = document.createElement("button");
		button.setAttribute("class", "buttonDelete");
		button.setAttribute("onClick", "askDeleteQuestion(" + domainsAndQuestions.questions[domainID][i].idquestion + "," + domainsAndQuestions.questions[domainID][i].ParentID + "," + domainsAndQuestions.questions[domainID][i].NumOfChild + ")");
		cell.appendChild (button);
		/*-----------------------------------*/
	}

	/* Button to add a new question */
	button = document.createElement("button");
	button.setAttribute("class", "buttonAdd");
	button.setAttribute("onClick", "printAddQuestionElements(" + null + "," + null + "," + domainID + ")");
	MainTable.appendChild (button);
	/*--------------------------------*/
}


/***********************************************************************************/
/*             Print the question associated to the tab (here a domain)            */
/*                                                                                 */
/*  @Param triggerTabID : the ID of the tab that call this function                */
/*  @Param arrayID      : the index where the domain is located in retrieves data  */
/***********************************************************************************/
function printTabContent (triggerTabID, arrayID)
{
	var activeTab = document.getElementById(triggerTabID);
	var classValue = activeTab.attributes.getNamedItem("class").value

	if (classValue.includes("active")) return;    // The tab is already active so we don't need to print the content again

	if (actualActiveTab != null)
	{ // There is an active tab so we need to deletes its content from the view
		
		// Delete all the present rows
		while (MainTable.rows.length > 0) 
		{
			MainTable.deleteRow(0);
		}

		// Delete all other elements that are not a part of the table header
		while (MainTable.hasChildNodes() && MainTable.lastChild.tagName != "TH")
		{	
			console.log("lastChild:", MainTable.lastChild.tagName);
			MainTable.removeChild(MainTable.lastChild);
		}
		actualActiveTab.setAttribute ("class", actualActiveTab.attributes.getNamedItem("class").value.replace (" active", ""));
	}

	actualActiveTab = activeTab;
	actualAction = null;
	classValue = classValue + " active";
	activeTab.setAttribute ("class", classValue);

	putQuestionInForm (arrayID);
}

/**********************************************************************************/
/*                  Retrieve the domains and questions from the database          */
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
/*                          Retrieve the coefficients from the database           */
/**********************************************************************************/
var coefficients;
$.get('/getCoefficients', function (coeff)
{
	coefficients = coeff;
});