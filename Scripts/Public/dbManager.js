/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/****************************************************************************************************** GLOBAL FUNCTION ************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



var MainTable = document.getElementById('MainTable'); // The table containing all the inforamtion (domain, questions, buttons, ...)
var actualAction;    // The actual in progress action (add, edit, ...)


/**********************************************************************************/
/*                  Retrieve the domains and questions from the database          */
/**********************************************************************************/
var domainsAndQuestions; 
$.get('/getDomains', array = function(c_domainsAndQuestions)
{
	domainsAndQuestions = c_domainsAndQuestions;
	var divDomain = document.getElementById("DomainSelector");
	var selectDomain = document.createElement("select");
	var selectOption;

	selectDomain.setAttribute("id", "Main Domain Selector");
	selectDomain.setAttribute("class", "sel");
	selectDomain.setAttribute("onchange", "printSubDomain()");

	divDomain.appendChild(selectDomain);

	/*console.log("Domains: ", domainsAndQuestions.domains);
	console.log("Questions: ", domainsAndQuestions.questions);*/
	var alreadySet = false;

	// Add the different domains as tab
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID == 0)
		{	
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", i);
			selectOption.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));
			selectDomain.appendChild(selectOption);
			if (alreadySet == false)
			{
				selectOption.setAttribute("selected", "selected");
				printSubDomain ();
				alreadySet = true;
			}
		}
	}
	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectDomain.appendChild(selectOption);
	// None option
	selectOption = document.createElement("option");
	selectOption.setAttribute("value", i);
	selectOption.appendChild(document.createTextNode("Nouveau domaine"));
	selectDomain.appendChild(selectOption);
});


/**********************************************************************************/
/*                          Retrieve the coefficients from the database           */
/**********************************************************************************/
var coefficients;
$.get('/getCoefficients', function (coeff)
{
	coefficients = coeff;
});


/***********************************************************************************/
/*             	 Print the sub domains associated to the main domain               */
/***********************************************************************************/
function printSubDomain ()
{
	/* Get the selected domain and the container that suppose to hold the elements */
	var activeTab = document.getElementById("Main Domain Selector");
	var selectedDomainID = activeTab.value;
	/*-----------------------------------------------------------------------------*/

	// Delete all the present rows
	while (MainTable.hasChildNodes()) 
	{
		MainTable.removeChild(MainTable.lastChild);
	}

	actualAction = null;

	if (selectedDomainID >= domainsAndQuestions.domains.length) // We are adding a new main domain
	{
		printAddDomainElements (null);
		return;
	}

	/* Create the main domain body */
	var divDomain;
	divDomain = document.createElement("div");
	divDomain.className = "custom-select-trigger opened";
	divDomain.appendChild(document.createTextNode(domainsAndQuestions.domains[selectedDomainID].Nom));
	divDomain.setAttribute("id", "div Domain Name " + domainsAndQuestions.domains[selectedDomainID].iddomaine);
	divDomain.setAttribute("onClick", "toggleOpenedDomain (" + domainsAndQuestions.domains[selectedDomainID].iddomaine + ")");

	/* Add button */
	var button = document.createElement("button");
	var span = document.createElement("span");
	span.setAttribute("class", "spanDomainButton");
	button.setAttribute("class", "buttonAdd");
	button.setAttribute("onclick", "printAddDomainElements(" + selectedDomainID + ")");
	span.appendChild(button)
	/*------------*/

	/* Edit button */
	button = document.createElement("button");
	button.setAttribute("class", "buttonEdit");
	button.setAttribute("onClick", "printEditDomainElements(" + selectedDomainID + ")");
	span.appendChild(button)
	/*-------------*/

	/* Delete button */
	button = document.createElement("button");
	button.setAttribute("class", "buttonDelete");
	button.setAttribute("onClick", "askDeleteDomain(" + domainsAndQuestions.domains[selectedDomainID].iddomaine + ")");
	span.appendChild(button)
	divDomain.appendChild (span);
	/*---------------*/


	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "Domain " + domainsAndQuestions.domains[selectedDomainID].iddomaine);	
	tbody.setAttribute("class", "custom-tbody opened");
	MainTable.appendChild(divDomain);
	MainTable.appendChild(tbody);
	/*-----------------------------*/

	var parentDomain;	// The parent domain
	var domainIDs = [];	// The IDs of all involved domains (Main domain and all its sub-domains)
	var row;			// A row
	var cell;			// A cell

	domainIDs.push(selectedDomainID); // Put the Main domain ID into the involved IDs array

	// Add all the sub-domains (and their children) to the main domain body 
	for (var i = selectedDomainID; i < domainsAndQuestions.domains.length; i++)
	{
		parentDomain = document.getElementById("Domain " + domainsAndQuestions.domains[i].ParentID);
		if (parentDomain != null)
		{
			/*console.log("added domainID: ", domainsAndQuestions.domains[i].iddomaine);
			console.log("added at index: ", -1);*/
			row = parentDomain.insertRow(-1);													// Insert a row at the last position
			row.setAttribute("id", "Row Domain " + domainsAndQuestions.domains[i].iddomaine);	// Set the ID of the row
			cell = row.insertCell(0)															// Insert a cell into the previous create row
			cell.setAttribute("colspan", "4");
			divDomain = document.createElement("div");											// Create a div element
			divDomain.className = "custom-select-trigger opened";								// Set the classes of the div element
			divDomain.setAttribute("id", "div Domain Name " + domainsAndQuestions.domains[i].iddomaine);
			divDomain.setAttribute("onClick", "toggleOpenedDomain (" + domainsAndQuestions.domains[i].iddomaine + ")");
			divDomain.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));	// Add a text to the div element
			tbody = document.createElement("tbody");											// Create the body of the new domain
			tbody.setAttribute("id", "Domain " + domainsAndQuestions.domains[i].iddomaine);		// Set the id of the new body
			tbody.setAttribute("class", "custom-tbody opened");
			tbody.setAttribute("style", "background-color: hsla(" + (209+(20*i))%360 + ", 30%, 60%, 0.7)");
			cell.appendChild(divDomain);														// Add the div element to the cell
			cell.appendChild(tbody);															// Add the span element to the cell
			domainIDs.push(i);																	// Put the domain ID into the involved IDs array


			/* Add button */
			button = document.createElement("button");
			span = document.createElement("span");
			span.setAttribute("class", "spanDomainButton");
			button.setAttribute("class", "buttonAdd");
			button.setAttribute("onclick", "printAddDomainElements(" + i + ")");
			span.appendChild(button)
			/*------------*/

			/* Edit button */
			button = document.createElement("button");
			button.setAttribute("class", "buttonEdit");
			button.setAttribute("onClick", "printEditDomainElements(" + i + ")");
			span.appendChild(button)
			/*-------------*/
	
			/* Delete button */
			button = document.createElement("button");
			button.setAttribute("class", "buttonDelete");
			button.setAttribute("onClick", "askDeleteDomain(" + domainsAndQuestions.domains[i].iddomaine + ")");
			span.appendChild(button)
			divDomain.appendChild (span);
			/*---------------*/
		}
	}

	putQuestionInForm(domainIDs);	// Print the questions associated to all the involved domains
}


/***********************************************************************************/
/*         Get the total number of child of the given question / domain            */
/*                                                                                 */
/*  @Param questionID : the index where the question is located in retrieves data  */
/*  @Param domainID   : the index where the domain is located in retrieves data    */
/***********************************************************************************/
function getTotalNumOfChild (questionID, domainID)
{
	numOfTotalChild = 0;
	if (questionID != null) // We want to know the number of children of a question
	{
		numOfTotalChild = domainsAndQuestions.questions[domainID][questionID].NumOfChild;
		for (var i = questionID + 1; i < domainsAndQuestions.questions[domainID].length; i++)
		{
			if (domainsAndQuestions.questions[domainID][i].NumOfChild > 0 && domainsAndQuestions.questions[domainID][i].ParentID == domainsAndQuestions.questions[domainID][questionID].idquestion) 
				numOfTotalChild += getTotalNumOfChild (i, domainID);
		}
	}
	else  // We want to know the number of children of a domain
	{
		numOfTotalChild = domainsAndQuestions.domains[domainID].NumOfChild;
		for (var i = domainID + 1; i < domainsAndQuestions.domains.length; i++)
		{
			if (domainsAndQuestions.domains[i].NumOfChild > 0 && domainsAndQuestions.domains[i].ParentID == domainsAndQuestions.domains[domainID].iddomaine)
				numOfTotalChild += getTotalNumOfChild (null, i);
		}
	}
	return numOfTotalChild;
}


/*****************************************************************************/
/*           Prints the elements to edit a domain of the database            */
/*                                                                           */
/*  @Param elementTriggerID : the id of the button that launch the function  */
/*****************************************************************************/
function toggleOpenedDomain (elementTriggerID)
{
	console.log("toggled");
	var elementTrigger = document.getElementById("div Domain Name " + elementTriggerID);
	elementTrigger.classList.toggle("opened");
	elementTrigger = document.getElementById("Domain " + elementTriggerID);
	elementTrigger.classList.toggle("opened");

	if (elementTrigger.classList.contains("opened")) $('html, body').animate({scrollTop: $(elementTrigger).offset().top - 120}, 1000); // Bring the view to the container
}


/***********************************************************************************************/
/*  		   Return the needed indentation according to the question position      		   */
/*                                                      									   */
/*  @Param parentQuestionID : the parent question ID of the question that need to be indented  */
/*  @Param domainID : the domain id  														   */
/*  @Param domainID : the index just before the question that need to be indented			   */
/***********************************************************************************************/
function getIndentation (parentQuestionID, domainID, startIndex)
{
	var depth = 1;
	for (var i = startIndex; i >= 0; i--) 
	{
		if (domainsAndQuestions.questions[domainID][i].ParentID == 0) break;
		if (domainsAndQuestions.questions[domainID][i].idquestion == parentQuestionID)
		{
			depth++;
			parentQuestionID = domainsAndQuestions.questions[domainID][i].ParentID;
		}
	}
	return "\xa0\xa0\xa0\xa0".repeat(depth) + "● ";
}


/*********************************************************/
/*         Print the question of the desired domain      */
/*                                                       */
/*  @Param domainIDs : the list of all involved domains  */
/*********************************************************/
function putQuestionInForm (domainIDs)
{
	var questionID;          // The id of the question in the database
	var question;			 // The actual written question
	var row;                 // The row containing the question
	var parentRow;			 // The parent row of the question
	var cell;           	 // The cell containing the question
	var button;         	 // The different buttons (add, edit and delete)
	var div;				 // A div element
	var backgroundColor = 0; // To know wich class we need to apply to the row
	var domainID;			 // The actual proccessed domain ID

	for (var j = 0; j < domainIDs.length; j++)
	{
		domainID = domainIDs[j];
		//console.log("DOMAINID: ", domainID);
		tbody = document.getElementById("Domain " + domainsAndQuestions.domains[domainID].iddomaine);
		for (var i = 0; i < domainsAndQuestions.questions[domainID].length; i++) 
		{
			questionID = "Question " + domainsAndQuestions.questions[domainID][i].idquestion;
	
			
			/* If the question has a parent we put the question under it */
			if (domainsAndQuestions.questions[domainID][i].ParentID != 0)
			{
				parentRow = document.getElementById ("RowID " + domainsAndQuestions.questions[domainID][i].ParentID);	// Get the parent row
				row = tbody.insertRow(Array.prototype.slice.call(tbody.children).indexOf(parentRow)+1);					// Insert a row under the parent
				row.className += "hasParent " + parentRow.className;													// Sets the class of the question
				if (parentRow.classList.contains("hasChild") == false) parentRow.classList.add("hasChild");				// Delete the useless class from the parent
				question = getIndentation (domainsAndQuestions.questions[domainID][i].ParentID, domainID, i-1) + domainsAndQuestions.questions[domainID][i].Question;
			}
			else // The question has no parent
			{	
				var indexRow = i;
				if (domainIDs.length > j+1)
				{	
					indexRow = Array.prototype.slice.call(tbody.children).indexOf(document.getElementById ("Row Domain " + domainsAndQuestions.domains[domainIDs[j+1]].iddomaine));
				}
				row = tbody.insertRow(indexRow);
				if (backgroundColor%2 == 0) row.className += "sombre highlight ";
				else row.className += "clair highlight ";
				backgroundColor++;
				question = domainsAndQuestions.questions[domainID][i].Question
			}
	
			
			cell = row.insertCell (0);

			/* Set row's attributes */
			row.setAttribute("id", "RowID " + domainsAndQuestions.questions[domainID][i].idquestion);
			/*-----------------------*/

			cell.setAttribute("id", questionID);
			cell.setAttribute("class", "borderL");
			cell.appendChild(document.createTextNode(question));
	
			/* Cell containing the add button */
			cell = row.insertCell (1);
			button = document.createElement("button");
			cell.setAttribute("class", "borderC");
			button.setAttribute("class", "buttonAdd");
			button.setAttribute("onClick", "printAddQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
			div = document.createElement("div");
			div.setAttribute("class", "verticalCenter");
			div.appendChild(button);
			cell.appendChild (div);
			/*--------------------------------*/
	
			/* Cell containing the edit button */
			cell = row.insertCell (2);
			button = document.createElement("button");
			cell.setAttribute("class", "borderC");
			button.setAttribute("class", "buttonEdit");
			button.setAttribute("onClick", "printEditQuestionElements(\"" + questionID + "\"," + i + "," + domainID + ")");
			div = document.createElement("div");
			div.setAttribute("class", "verticalCenter");
			div.appendChild(button);
			cell.appendChild (div);
			/*---------------------------------*/
	
			/* Cell containing the delete button */
			cell = row.insertCell (3);
			cell.setAttribute("class", "borderR");
			button = document.createElement("button");
			button.setAttribute("class", "buttonDelete");
			button.setAttribute("onClick", "askDeleteQuestion(" + domainsAndQuestions.questions[domainID][i].idquestion + "," + domainsAndQuestions.questions[domainID][i].ParentID + "," + domainsAndQuestions.questions[domainID][i].NumOfChild + "," + domainsAndQuestions.questions[domainID][i].DomaineID + ")");
			div = document.createElement("div");
			div.setAttribute("class", "verticalCenter");
			div.appendChild(button);
			cell.appendChild (div);
			/*-----------------------------------*/
		}
	
		/* Button to add a new question */
		row = tbody.insertRow(i);
		cell = row.insertCell (0);
		button = document.createElement("button");
		button.setAttribute("class", "buttonAdd");
		button.setAttribute("onClick", "printAddQuestionElements(" + "\"Add Question To Domain " + domainID + "\"," + null + "," + domainID + ")");
		div = document.createElement("span");
		div.setAttribute("id", "Add Question To Domain " + domainID);
		cell.appendChild(button);
		cell.appendChild (div);
		/*------------------------------*/
	}
}



/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/****************************************************************************************************** QUESTION MANAGER ***********************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



/************************************************************************************/
/*  						Add all the sub-questions option  						*/
/*                                                                              	*/
/*  @Param currentIndex     : the actual index when the function has been launched  */
/*  @Param depth            : the number of recursive call of this function   		*/
/*  @Param questionID       : the index of the default parent question 				*/
/*  @Param domainID         : the index of the default domain  						*/
/*  @Param parentQuestionID : the ID of the parent question  						*/
/*  @Param parentdomainID   : the index of the domain that launched the function  	*/
/*  @Param selector         : the element to attach the option  		 			*/
/************************************************************************************/
function addAllSubQuestionOption (currentIndex, depth, questionID, domainID, parentQuestionID, parentDomainID, selector)
{
	var selectOption;
	var numOfAdd = 0;
	var numOfDirectChild = 0;
	var result = 0;

	console.log ("BEGIN addAllSubQuestionOption:", domainsAndQuestions.questions[parentDomainID][currentIndex].idquestion);
	
	// All the others available sub domains
	for (var i = currentIndex + 1; i < domainsAndQuestions.questions[parentDomainID].length; i++)
	{
		if (domainsAndQuestions.questions[parentDomainID][i].idquestion == domainsAndQuestions.questions[domainID][questionID].idquestion)
		{
			result += getTotalNumOfChild (i, parentDomainID) ;
			i += result;
			numOfAdd += result + 1;
			numOfDirectChild++;
		}
		else if (domainsAndQuestions.questions[parentDomainID][i].ParentID == parentQuestionID)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", domainsAndQuestions.questions[parentDomainID][i].idquestion);
			/*console.log("domainsAndQuestions.questions[parentDomainID][i].idquestion: " , domainsAndQuestions.questions[parentDomainID][i].idquestion);
			console.log("domainsAndQuestions.questions[parentDomainID][i].ParentID: " , domainsAndQuestions.questions[parentDomainID][i].ParentID);
			console.log("domainsAndQuestions.questions[domainID][questionID].idquestion: " , domainsAndQuestions.questions[domainID][questionID].idquestion);*/
			if (domainsAndQuestions.questions[parentDomainID][i].idquestion == domainsAndQuestions.questions[domainID][questionID].ParentID) selectOption.setAttribute("selected", "selected");
			selectOption.appendChild(document.createTextNode("\xa0\xa0\xa0".repeat(depth) + "● " + domainsAndQuestions.questions[parentDomainID][i].Question));
			selector.appendChild(selectOption);
			numOfAdd++;
			numOfDirectChild++;
			if (domainsAndQuestions.questions[parentDomainID][i].NumOfChild > 0)
			{
				result = addAllSubQuestionOption (i, depth+1, questionID, domainID, domainsAndQuestions.questions[parentDomainID][i].idquestion, parentDomainID, selector);
				i += result;
				numOfAdd += result;
			}
		}
		if (numOfDirectChild >= domainsAndQuestions.questions[parentDomainID][currentIndex].NumOfChild) 
		{
			/*console.log ("Break i: ", i);
			console.log ("NumOfDirectChild: ", numOfDirectChild);
			console.log ("NumOfChild: ", domainsAndQuestions.questions[parentDomainID][currentIndex].NumOfChild);*/
			break;
		}
	}
	console.log ("END addAllSubQuestionOption:", domainsAndQuestions.questions[parentDomainID][currentIndex].idquestion);
	return numOfAdd;
}


/******************************************************************************************/
/*  Update the select parentID question in order to propose those of the selected domain  */
/*                                                                                        */
/*  @Param questionID : the index of the default parent question 						  */
/*  @Param domainID   : the index of the default domain  								  */
/******************************************************************************************/
function updateSelectQuestion (questionID, domainID)
{
	var selectParentID = document.getElementById ("ParentID");
	var selectedDomainID = document.getElementById ("SubDomainID").value;


	/*console.log("QuestionID: ", questionID);
	console.log("selectedDomainID: ", selectedDomainID);
	console.log("DomainID: ", domainID);*/

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
		if (domainsAndQuestions.questions[selectedDomainID][i].idquestion != domainsAndQuestions.questions[domainID][questionID].idquestion && domainsAndQuestions.questions[selectedDomainID][i].ParentID != domainsAndQuestions.questions[domainID][questionID].idquestion)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", domainsAndQuestions.questions[selectedDomainID][i].idquestion);
			/*console.log("domainsAndQuestions.questions[domainID][questionID].ParentID: " , domainsAndQuestions.questions[domainID][questionID].ParentID);			
			console.log("domainsAndQuestions.questions[selectedDomainID][i].idquestion: " , domainsAndQuestions.questions[selectedDomainID][i].idquestion);*/
			console.log("i: " , i);
			if (domainsAndQuestions.questions[domainID][questionID].ParentID == domainsAndQuestions.questions[selectedDomainID][i].idquestion) selectOption.setAttribute("selected", "selected");
			selectOption.appendChild(document.createTextNode(domainsAndQuestions.questions[selectedDomainID][i].Question));
			selectParentID.appendChild(selectOption);
			if (domainsAndQuestions.questions[selectedDomainID][i].NumOfChild > 0) i += addAllSubQuestionOption (i, 1, questionID, domainID, domainsAndQuestions.questions[selectedDomainID][i].idquestion, selectedDomainID, selectParentID);
		}
		else if (domainsAndQuestions.questions[selectedDomainID][i].idquestion == domainsAndQuestions.questions[domainID][questionID].idquestion) i += getTotalNumOfChild (i, selectedDomainID);
	}
}


/*************************************************************/
/*             Add a question to the database                */
/*                                                           */
/*  @Param parentQuestionID : the id of the parent question  */
/*  @Param domainID         : the id of the domain           */
/*************************************************************/
function addQuestion (parentQuestionID, domainID)
{ 
	$.ajax({
            url: '/addQuestion',
            type: 'POST',
            data: {
                arr: [ 	
              		   	parentQuestionID,
              		   	domainID,
              		   	document.getElementById("Intitulé").value,
              		   	document.getElementById("Explication").value,
              		   	document.getElementById("Numéro").value,
						document.getElementById("Coefficient").value
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/*************************************************************************************************/
/*                       Prints the elements to add a question to the database                   */
/*                                                                                               */
/*  @Param elementTrigger  	 : the element that launch the function                              */
/*  @Param parentQuestionID  : the index where the parent question is located in retrieves data  */
/*  @Param domainID          : the index where the parent question is located in retrieves data  */
/*************************************************************************************************/
function printAddQuestionElements (elementTrigger, parentQuestionID, domainID)
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

	tableDataContainer = document.getElementById(elementTrigger);

	/* Sets the title of the action */
	if (parentQuestionID != null)
	{
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

	form.setAttribute("id", "Submit" + elementTrigger);
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

	fieldName = document.createElement ("div");
	submit.setAttribute("type", "submit");
	fieldName.appendChild(submit);

	/* Cancel button */
	submit = document.createElement("button");
	fieldName.appendChild(submit);
	submit.appendChild(document.createTextNode("Annuler"));
	submit.onclick = function ()
	{
		actualAction.container.removeChild(actualAction.div);
		actualAction = null;
	};
	/*---------------*/

	form.appendChild(fieldName);

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

	$('html, body').animate({scrollTop: $(newElement).offset().top - 350}, 1000); // Bring the view to the container

	document.getElementById("Intitulé").focus(); // Give the focus to the first text area

	/*console.log ("id: ", questionLauncher);
	console.log ("domainID: ", domainID);
	console.log ("Array: ", domainsAndQuestions);
	console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
	if (parentQuestionID != null) console.log ("Question: ", domainsAndQuestions.questions[domainID][parentQuestionID].Question);*/
}



/**********************************************************************/
/*                 Edit the question of the database                  */
/*                                                                    */
/*  @Param questionID : the id of the question to edit                */
/*  @Param numOfChild : the number of sub-questions the question has  */
/**********************************************************************/
function editQuestion (questionID, numOfChild)
{	
	//console.log("ParentID: ", document.getElementById("ParentID").value);
	$.ajax({
            url: '/editQuestion',
            type: 'POST',
            data: {
                arr: [ 	questionID,
              		   	document.getElementById("Intitulé").value,
              		   	document.getElementById("Explication").value,
              		   	document.getElementById("Numéro").value,
              		   	document.getElementById("ParentID").value,
              		   	numOfChild,
              		   	domainsAndQuestions.domains[document.getElementById("SubDomainID").value].iddomaine,
						document.getElementById("Coefficient").value


                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/************************************************************************************************/
/*                     Prints the elements to edit a question of the database                   */
/*                                                                                              */
/*  @Param questionLauncher : the id of the button that launch the function                     */
/*  @Param questionID       : the index where the parent question is located in retrieves data  */
/*  @Param domainID         : the index where the domain is located in retrieves data           */
/************************************************************************************************/
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
	var submit  = document.createElement("input");						 // The submit button to confirm or cancel the modification

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

	selectArea.setAttribute("id", "DomainID");
	selectArea.setAttribute("onchange", "updateSelectSubDomain(" + questionID + ", " + domainID + ")");
	// All the others available main domains
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID == 0)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", i);
			if (domainsAndQuestions.domains[i].iddomaine == domainsAndQuestions.domains[domainID].iddomaine) selectOption.setAttribute("selected", "selected");
			selectOption.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));
			selectArea.appendChild(selectOption);
		}
	}

	form.appendChild(selectArea);
	/*----------------------------------*/

	/* Set the area for the sub-domain */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Sous-domaine"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	selectArea = document.createElement ("select");
	selectArea.setAttribute("id", "SubDomainID");
	selectArea.setAttribute("onchange", "updateSelectQuestion(" + questionID + ", " + domainID + ")");
	

	form.appendChild(selectArea);
	/*----------------------------------*/

	/* Set the area for the parent question */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Question parente"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	selectArea = document.createElement ("select");
	selectArea.setAttribute("id", "ParentID");
	// None option
	selectOption = document.createElement("option");
	selectOption.setAttribute("value", "0");
	selectOption.appendChild(document.createTextNode("Aucune"));
	selectArea.appendChild(selectOption);
	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectArea.appendChild(selectOption);

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
	var question = document.getElementById(questionLauncher).innerHTML;
	if (domainsAndQuestions.questions[domainID][questionID].ParentID != 0) question = question.replace (/^.+● /, "");
	textArea.setAttribute("value", question);

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

	fieldName = document.createElement ("div");
	submit.setAttribute("type", "submit");
	fieldName.appendChild(submit);

	/* Cancel button */
	submit = document.createElement("button");
	fieldName.appendChild(submit);
	submit.appendChild(document.createTextNode("Annuler"));
	submit.onclick = function ()
	{
		actualAction.container.removeChild(actualAction.div);
		actualAction = null;
	};
	/*---------------*/


	form.appendChild(fieldName);
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
	/*-------------------------------------------------------------------------------*/

	updateSelectSubDomain (questionID, domainID);

	$('html, body').animate({scrollTop: $(newElement).offset().top - 350}, 1000); // Bring the view to the container

	document.getElementById("Intitulé").focus(); // Give the focus to the first text area

	/*console.log ("id: ", questionLauncher);
	console.log ("domainID: ", domainID);
	console.log ("Array: ", domainsAndQuestions);
	console.log ("Domaine: ", domainsAndQuestions.domains[domainID].Nom);
	if (questionID != null) console.log ("Question: ", domainsAndQuestions.questions[domainID][questionID].Question);*/
}


/***********************************************************************************/
/*     Create a modal alert to be sure the user wanted to delete the question      */
/*                                                                                 */
/*  @Param questionID : the id of the question to delete 						   */
/*  @Param parentID   : the id of the parent question                              */
/*  @Param numOfChild : the number of sub-question                                 */
/*  @Param domainID   : the domain id of the question                              */
/***********************************************************************************/
function askDeleteQuestion (questionID, parentID, numOfChild, domainID)
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
		$.get('/deleteQuestion/' + questionID + '/' + parentID + '/' + numOfChild + '/' + domainID)
		{
			location.reload(true); // Reload the page to print the new database
		};
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



/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/******************************************************************************************************* DOMAIN MANAGER ************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



/********************************************************************************/
/*  					Add all the sub-domains option  						*/
/*                                                                              */
/*  @Param parentdomainID : the index of the domain that launched the function  */
/*  @Param depth          : the number of recursive call of this function   	*/
/*  @Param domainID       : the index of the default domain  					*/
/*  @Param selector       : the element to attach the option  		 			*/
/********************************************************************************/
function addAllSubDomainOption (parentDomainID, depth, domainID, selector, shouldIgnoreChild)
{
	var selectOption;
	var result = 0;
	var numOfAdd = 0;
	var seekedChild = domainsAndQuestions.domains[parentDomainID].NumOfChild;

	if (shouldIgnoreChild == true) // We want to ignore the edited domain and its sub-domains
	{
		for (var i = parentDomainID + 1; i < domainsAndQuestions.domains.length; i++)
		{
			if (domainsAndQuestions.domains[domainID].iddomaine == domainsAndQuestions.domains[i].iddomaine) // This is the actual edited domain
			{
				result = getTotalNumOfChild (null, domainID);
				numOfAdd += result + 1;
				i += result;
				seekedChild--;
			}
			else if (domainsAndQuestions.domains[i].ParentID != 0 && domainsAndQuestions.domains[i].ParentID == domainsAndQuestions.domains[parentDomainID].iddomaine) // It's just a sub-domain of the same parent than the edited domain so we need to print it
			{
				selectOption = document.createElement("option");
				selectOption.setAttribute("value", i);

				selectOption.appendChild(document.createTextNode("\xa0\xa0\xa0".repeat(depth) + "● " + domainsAndQuestions.domains[i].Nom));
				selector.appendChild(selectOption);
				numOfAdd++;
				seekedChild--;
				if (domainsAndQuestions.domains[i].NumOfChild > 0) // This sub-domain has some sub-domains too
				{
					result = addAllSubDomainOption (i, depth+1, domainID, selector, shouldIgnoreChild);
					numOfAdd += result;
					i += result;
				}
			}
			if (seekedChild <= 0) break;
		}
	}
	else // We want all the sub-domains
	{
		// All the others available sub domains
		for (var i = parentDomainID + 1; i < domainsAndQuestions.domains.length; i++) 
		{
			if (domainsAndQuestions.domains[i].ParentID != 0 && domainsAndQuestions.domains[i].ParentID == domainsAndQuestions.domains[parentDomainID].iddomaine)
			{
				selectOption = document.createElement("option");
				selectOption.setAttribute("value", i);
				if (domainsAndQuestions.domains[i].iddomaine == domainsAndQuestions.domains[domainID].iddomaine) selectOption.setAttribute("selected", "selected");

				selectOption.appendChild(document.createTextNode("\xa0\xa0\xa0".repeat(depth) + "● " + domainsAndQuestions.domains[i].Nom));
				selector.appendChild(selectOption);
				numOfAdd++;

				if (domainsAndQuestions.domains[i].NumOfChild > 0) // This sub-domain has some sub-domains too
				{
					result = addAllSubDomainOption (i, depth+1, domainID, selector, shouldIgnoreChild);
					numOfAdd += result;
					i += result;
				}
			}
		}
	}
	return numOfAdd;
}


/***********************************************************************************/
/*  Update the select sub-domain in order to propose those of the selected domain  */
/*                                                                                 */
/*  @Param questionID       : the index of the default parent question 			   */
/*  @Param domainID         : the index of the default domain  					   */
/***********************************************************************************/
function updateSelectSubDomain (questionID, domainID)
{
	var selectSubDomainID = document.getElementById ("SubDomainID");
	var selectedDomainID = document.getElementById ("DomainID").value;

	/*console.log("selectedDomainID: ", selectedDomainID);
	console.log("DomainID: ", domainID);*/

	while (selectSubDomainID.hasChildNodes())
	{
		selectSubDomainID.removeChild(selectSubDomainID.lastChild);
	}

	// None option
	var selectOption;
	selectOption = document.createElement("option");
	selectOption.setAttribute("value", selectedDomainID);
	selectOption.appendChild(document.createTextNode("Aucun"));
	selectSubDomainID.appendChild(selectOption);
	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectSubDomainID.appendChild(selectOption);
	// All the others available sub domains
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID != 0 && domainsAndQuestions.domains[i].ParentID == domainsAndQuestions.domains[selectedDomainID].iddomaine)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", i);
			selectOption.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));
			selectSubDomainID.appendChild(selectOption);
			if (domainsAndQuestions.domains[i].iddomaine == domainsAndQuestions.domains[domainID].iddomaine) selectOption.setAttribute("selected", "selected");
			if (domainsAndQuestions.domains[i].NumOfChild > 0) i += addAllSubDomainOption (i, 1, domainID, selectSubDomainID, false);
		}
	}
	if (questionID != null) updateSelectQuestion (questionID, domainID);
}


/*********************************************************/
/*             Add a domain to the database              */
/*                                                       */
/*  @Param parentDomainID : the id of the parent domain  */
/*********************************************************/
function addDomain (parentDomainID)
{       
	$.ajax({
            url: '/addDomain',
            type: 'POST',
            data: {
                arr: [ 	
              		   	parentDomainID,
              		   	document.getElementById("Nom du domaine").value
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/*********************************************************************************************/
/*                       Prints the elements to add a domain to the database                 */
/*                                                                                           */
/*  @Param parentDomainID  : the index where the parent domain is located in retrieves data  */
/*********************************************************************************************/
function printAddDomainElements (parentDomainID)
{
	if (actualAction != null) actualAction.container.removeChild(actualAction.div);
	
	var domainContainer;									// The row that launched the function
	var newElement = document.createElement("div");			// The new div element that will contain all the form elements
	var title = document.createElement("h3");				// The title of the action
	var form = document.createElement("form");				// The form to fulfill
	var textArea = document.createElement("input");			// The text area to fulfill
	var fieldName = document.createElement ("div");			// The name of each field
	var submit  = document.createElement("input");			// The submit button to confirm the modification

	/* Variable to send that represent the actual ID in the database */
	var s_parentDomainID;
	/*----------------------------------------*/


	/* Sets the title of the action */
	if (parentDomainID != null)
	{
		event.stopPropagation();
		console.log("parentDomainID: ", parentDomainID);
		domainContainer = document.getElementById("Domain " + domainsAndQuestions.domains[parentDomainID].iddomaine);
		console.log("domainContainer: ", domainContainer);
		title.appendChild(document.createTextNode("Ajout d'un sous-domaine"));
		s_parentDomainID = domainsAndQuestions.domains[parentDomainID].iddomaine;
	}
	else
	{
		domainContainer = null;
		title.appendChild(document.createTextNode("Ajout d'un domain"));
		s_parentDomainID = 0;
	}
	newElement.appendChild(title);
	/*------------------------------*/

	form.setAttribute("id", "Submit");
	form.setAttribute("action", "#!/managedatabase");
	form.setAttribute("onsubmit", "addDomain(" + s_parentDomainID + ")");


	/* Set the area for the domain name */
	fieldName.appendChild(document.createTextNode("Nom du domaine"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	textArea.setAttribute("id", "Nom du domaine");
	textArea.setAttribute("type", "text");
	textArea.setAttribute("class", "areaField");
	textArea.setAttribute("placeholder", "Nom");
	textArea.setAttribute("required", true);
	form.appendChild(textArea);
	/*-------------------------------------------*/

	
	fieldName = document.createElement ("div");
	submit.setAttribute("type", "submit");
	fieldName.appendChild(submit);

	/* Cancel button */
	submit = document.createElement("button");
	fieldName.appendChild(submit);
	submit.appendChild(document.createTextNode("Annuler"));
	submit.onclick = function ()
	{
		actualAction.container.removeChild(actualAction.div);
		actualAction = null;
	};
	/*---------------*/

	form.appendChild(fieldName);

	newElement.appendChild(form);

	/* Sets the actual action element regarding if there is a parent question or not */
	if (domainContainer != null) 
	{
		domainContainer.appendChild(newElement);

		actualAction = { 
			container: domainContainer,
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


	$('html, body').animate({scrollTop: $(newElement).offset().top - 300}, 1000); // Bring the view to the container
	textArea.focus();
}


/****************************************************/
/*          Edit the domain of the database         */
/*                                                  */
/*  @Param domainID : the id of the domain to edit  */
/****************************************************/
function editDomain (domainID)
{
	console.log("ParentID: ", document.getElementById("ParentID").value);
	var ParentID = document.getElementById("ParentID").value;
	if (ParentID < 0) ParentID = 0;
	else domainsAndQuestions.domains[document.getElementById("ParentID").value].iddomaine;

	$.ajax({
            url: '/editDomain',
            type: 'POST',
            data: {
                arr: [ 	domainID,
              		   	document.getElementById("Nom du domaine").value,
              		   	ParentID
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/*******************************************************************************/
/*             Prints the elements to edit a domain of the database            */
/*                                                                             */
/*  @Param domainID : the index where the domain is located in retrieves data  */
/*******************************************************************************/
function printEditDomainElements (domainID)
{     
	event.stopPropagation();  
	if (actualAction != null) actualAction.container.removeChild(actualAction.div);
	
	var domainContainer = event.srcElement.parentNode.parentNode;	// The domain that launched the function
	var newElement = document.createElement("div");					// The new div element that will contain all the form elements
	var title = document.createElement("h3");						// The title of the action
	var form = document.createElement("form");						// The form to fulfill
	var textArea = document.createElement("input");					// The text area to fulfill
	var selectArea = document.createElement ("select");				// The selection area	
	var selectOption = document.createElement ("option");			// The options of the selection area
	var fieldName = document.createElement ("div");					// The name of each field
	var submit  = document.createElement("input");					// The submit button to confirm or cancel the modification

	/* Sets the title of the action */
	title.appendChild(document.createTextNode("Modification d'un domaine"));
	newElement.appendChild(title);
	/*------------------------------*/

	form.setAttribute("id", "Submit");
	form.setAttribute("action", "#!/managedatabase");
	form.setAttribute("onsubmit", "editDomain(" + domainsAndQuestions.domains[domainID].iddomaine + ")");

	/* Set the area for the parent domain */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Domaine parent"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);

	selectArea.setAttribute("id", "ParentID");

	selectOption.appendChild(document.createTextNode("Aucun changement"));
	selectOption.setAttribute("value", domainID);
	selectOption.setAttribute("selected", "selected");
	selectArea.appendChild(selectOption);

	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectArea.appendChild(selectOption);

	// No parent
	selectOption = document.createElement("option");
	selectOption.appendChild(document.createTextNode("Aucun parent"));
	selectOption.setAttribute("value", -1);
	selectArea.appendChild(selectOption);

	// Graphical option
	selectOption = document.createElement("option");
	selectOption.setAttribute("disabled", "disabled");
	selectOption.appendChild(document.createTextNode("──────────"));
	selectArea.appendChild(selectOption);
	// All the others available domains
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].iddomaine != domainsAndQuestions.domains[domainID].iddomaine)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", i);
			selectOption.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));
			selectArea.appendChild(selectOption);
			if (domainsAndQuestions.domains[i].NumOfChild > 0) i += addAllSubDomainOption (i, 1, domainID, selectArea, true);
		}
		else i += getTotalNumOfChild(null, domainID);
	}

	form.appendChild(selectArea);
	/*------------------------------------*/

	/* Set the area for the domain name */
	fieldName = document.createElement ("div");
	fieldName.appendChild(document.createTextNode("Nom du domaine"));
	fieldName.setAttribute ("style", "font-weight: bold;")
	form.appendChild(fieldName);
	textArea.setAttribute("id", "Nom du domaine");
	textArea.setAttribute("type", "text");
	textArea.setAttribute("class", "areaField");
	textArea.setAttribute("placeholder", "Nom");
	textArea.setAttribute("value", domainsAndQuestions.domains[domainID].Nom);

	textArea.setAttribute("required", true);
	form.appendChild(textArea);
	/*-------------------------------------------*/


	fieldName = document.createElement ("div");
	submit.setAttribute("type", "submit");
	fieldName.appendChild(submit);

	/* Cancel button */
	submit = document.createElement("button");
	fieldName.appendChild(submit);
	submit.appendChild(document.createTextNode("Annuler"));
	submit.onclick = function ()
	{
		actualAction.container.removeChild(actualAction.div);
		actualAction = null;
	};
	/*---------------*/


	form.appendChild(fieldName);
	newElement.appendChild(form);

	/* Sets the actual action element */
	if (domainContainer != null) 
	{
		newElement.setAttribute("onclick", "event.stopPropagation()");
		newElement.setAttribute("style", "line-height: 30px;");
		domainContainer.appendChild(newElement);

		actualAction = { 
			container: domainContainer,
			div: newElement
		};
	}
	/*--------------------------------*/

	$('html, body').animate({scrollTop: $(newElement).offset().top - 350}, 1000); // Bring the view to the container

	document.getElementById("Nom du domaine").focus(); // Give the focus to the first text area
}


/*******************************************************************************/
/*     Create a modal alert to be sure the user wanted to delete the question  */
/*                                                                             */
/*  @Param domainID   : the domain id to delete                                */
/*******************************************************************************/
function askDeleteDomain (domainID)
{
	event.stopPropagation();

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
	title.appendChild(document.createTextNode("Suppression d'un domaine"));
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
	body.appendChild(document.createTextNode("Vous êtes sur le point de supprimer un domaine de la base de donnée. Toutes les sous-domaines, questions et sous-questions associés seront également supprimés ! Êtes-vous sûr de vouloir continuer ?"));
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
		$.get('/deleteDomain/' + domainID)
		{
			location.reload(true); // Reload the page to print the new database
		};
		console.log ("Domain to delete: ", domainID);
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