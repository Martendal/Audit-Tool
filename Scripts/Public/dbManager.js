
var MainTable = document.getElementById('tabs'); // The table containing all the inforamtion (domain, questions, buttons, ...)
var actualActiveTab; // The actual active tab
var actualAction;    // The actual in progress action (add, edit, ...)
   

/*************************************************************************************************/
/*                                  Add a question to the database                               */
/*                                                                                               */
/*  @Param parentQuestion    : the id of the button that launch the function                     */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function addQuestion (parentQuestion, parentQuestionID, domainID)
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
/*  @Param parentQuestion    : the id of the button that launch the function                     */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function printAddQuestionElements (parentQuestion, parentQuestionID, domainID)
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
		tableDataContainer = document.getElementById(parentQuestion);
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

	console.log ("id: ", parentQuestion);
	console.log ("domainID: ", domainID);
	console.log ("Array: ", domainsAndQuestions);
	console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
	if (parentQuestionID != null) console.log ("Question: ", domainsAndQuestions.questions[domainID][parentQuestionID].Question);
}



/************************************************************************************/
/*      Create a modal alert to be sure the user wanted to delete the question    	*/
/*                                                                                  */
/*  @Param questionID  : the index where the question is located in retrieves data  */
/************************************************************************************/
function askDeleteQuestion (questionID)
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
	    console.log("DELETE");
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
		button.setAttribute("onClick", "printAddQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
		cell.appendChild (button);
		/*---------------------------------*/

		/* Cell containing the delete button */
		cell = row.insertCell (3);
		cell.setAttribute("class", "borderR");
		button = document.createElement("button");
		button.setAttribute("class", "buttonDelete");
		button.setAttribute("onClick", "askDeleteQuestion(\"" + questionID + "\")");
		cell.appendChild (button);
		/*-----------------------------------*/
	}

	button = document.createElement("button");
	button.setAttribute("class", "buttonAdd");
	button.setAttribute("onClick", "printAddQuestionElements(\"" + null + "\"," + null + "," + domainID + ")");
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