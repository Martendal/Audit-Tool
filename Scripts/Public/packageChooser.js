/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/****************************************************************************************************** GLOBAL FUNCTION ************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



var MainTable = document.getElementById('MainTable'); // The table containing all the inforamtion (domain, questions, checkBoxs, ...)
var actualAction;    // The actual in progress action (add, edit, ...)
var packageID;


/**********************************************************************************/
/*                  Retrieve the domains and questions from the database          */
/**********************************************************************************/
var domainsAndQuestions;
var packages;
var packageQuestions
$.get('/getDomains', array = function(c_domainsAndQuestions)
{
	domainsAndQuestions = c_domainsAndQuestions;
	var divPackage = document.getElementById("PackageSelector");
	var selectPackage = document.createElement("select");
	var selectOption;

	selectPackage.setAttribute("id", "Main Package Selector");
	selectPackage.setAttribute("class", "sel");
	selectPackage.setAttribute("onchange", "changePackageID()");

	divPackage.appendChild(selectPackage);

	console.log("Domains: ", domainsAndQuestions.domains);
	console.log("Questions: ", domainsAndQuestions.questions);
	var alreadySet = false;

	$.get('/getAllPackages', function(c_packages)
	{
		packages = c_packages;
		for (var i = 0; i < packages.length; i++)
		{
			selectOption = document.createElement("option");
			selectOption.setAttribute("value", i);
			selectOption.appendChild(document.createTextNode(packages[i].Nom));
			selectPackage.appendChild(selectOption);
		}

		changePackageID();
	});

	// Add the different domains as tab
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID == 0)
		{	
			printDomainsPackage (i);
		}
	}
});


/***********************************************************************************/
/*                            Change the studied package                           */
/***********************************************************************************/
function changePackageID ()
{
		
	for (var i = 0; i < domainsAndQuestions.questions.length; i++)
	{
		for (var j = 0; j < domainsAndQuestions.questions[i].length; j++)
		{
			document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[i][j].idquestion).removeAttribute("checked");
		}
	}
		

	packageID = packages[document.getElementById ("Main Package Selector").value].idpackage;

	$.get('/getAllQuestionsByPackageId/' + packageID, function(c_packageQuestions)
	{
		packageQuestions = c_packageQuestions;
		console.log("Result: ", packageQuestions);
		checkPackageIDBox (packageQuestions)
	});
}


function getQuestionIDOfiquestion (idquestion, domainID)
{
	if (idquestion == 0) return -1;
	for (var i = 0; domainsAndQuestions.questions[domainID].length; i++)
	{
		if(domainsAndQuestions.questions[domainID][i].idquestion == idquestion) return i;
	}
}


/********************************************************/
/*       Print all domains present in the database      */
/*														*/
/* selectedDomainID : the index of the domain to print  */
/********************************************************/
function printDomainsPackage (selectedDomainID)
{

/*	// Delete all the present rows
	while (MainTable.hasChildNodes()) 
	{
		MainTable.removeChild(MainTable.lastChild);
	}
*/

	/* Create the main domain body */
	var divDomain;
	divDomain = document.createElement("div");
	divDomain.className = "custom-select-trigger opened";
	divDomain.appendChild(document.createTextNode(domainsAndQuestions.domains[selectedDomainID].Nom));
	divDomain.setAttribute("id", "div Domain Name " + domainsAndQuestions.domains[selectedDomainID].iddomaine);
	divDomain.setAttribute("onClick", "toggleOpenedDomainPackage (" + domainsAndQuestions.domains[selectedDomainID].iddomaine + ")");

	/* Add a checkBox */
	var checkBox = document.createElement("input");
	var label = document.createElement("label");
	var span = document.createElement("span");
	checkBox.type = "checkbox";
	span.setAttribute("class", "squaredFour");
	label.setAttribute("class", "squaredFour");
	label.id = "LC Domain " + domainsAndQuestions.domains[selectedDomainID].iddomaine;
	label.setAttribute("onClick", "toggleCheckBox()");
	checkBox.id = "CheckBox Domain " + domainsAndQuestions.domains[selectedDomainID].iddomaine;
	checkBox.value = selectedDomainID;
	span.appendChild(checkBox);
	span.appendChild(label);
	divDomain.appendChild(span);
	/*------------*/

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
			cell.setAttribute("colspan", "2");
			divDomain = document.createElement("div");											// Create a div element
			divDomain.className = "custom-select-trigger opened";								// Set the classes of the div element
			divDomain.setAttribute("id", "div Domain Name " + domainsAndQuestions.domains[i].iddomaine);
			divDomain.setAttribute("onClick", "toggleOpenedDomainPackage (" + domainsAndQuestions.domains[i].iddomaine + ")");
			divDomain.appendChild(document.createTextNode(domainsAndQuestions.domains[i].Nom));	// Add a text to the div element
			tbody = document.createElement("tbody");											// Create the body of the new domain
			tbody.setAttribute("id", "Domain " + domainsAndQuestions.domains[i].iddomaine);		// Set the id of the new body
			tbody.setAttribute("class", "custom-tbody opened");
			tbody.setAttribute("style", "background-color: hsla(" + (209+(20*i))%360 + ", 30%, 60%, 0.7)");
			cell.appendChild(divDomain);														// Add the div element to the cell
			cell.appendChild(tbody);															// Add the span element to the cell
			domainIDs.push(i);																	// Put the domain ID into the involved IDs array


			/* Add a checkBox */
			checkBox = document.createElement("input");
			label = document.createElement("label");
			span = document.createElement("span");
			checkBox.type = "checkbox";
			span.setAttribute("class", "squaredFour");
			label.setAttribute("class", "squaredFour");
			label.id = "LC Domain " + domainsAndQuestions.domains[i].iddomaine;
			label.setAttribute("onClick", "toggleCheckBox()");
			checkBox.id = "CheckBox Domain " + domainsAndQuestions.domains[i].iddomaine;
			checkBox.value = i;
			span.appendChild(checkBox);
			span.appendChild(label);
			divDomain.appendChild(span);
			/*------------*/
		}
	}

	putQuestionInFormPackage(domainIDs);	// Print the questions associated to all the involved domains


}


/*****************************************************************************/
/*           Prints the elements to edit a domain of the database            */
/*                                                                           */
/*  @Param elementTriggerID : the id of the checkBox that launch the function  */
/*****************************************************************************/
function toggleOpenedDomainPackage (elementTriggerID)
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
function getIndentationPackage (parentQuestionID, domainID, startIndex)
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
function putQuestionInFormPackage (domainIDs)
{
	var questionID;          // The id of the question in the database
	var question;			 // The actual written question
	var row;                 // The row containing the question
	var parentRow;			 // The parent row of the question
	var cell;           	 // The cell containing the question
	var checkBox;         	 // The different checkBoxs (add, edit and delete)
	var div;				 // A div element
	var backgroundColor = 0; // To know wich class we need to apply to the row
	var domainID;			 // The actual proccessed domain ID

	var label;
	var span;

	for (var j = 0; j < domainIDs.length; j++)
	{
		domainID = domainIDs[j];
		console.log("DOMAINID: ", domainID);
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
				question = domainsAndQuestions.questions[domainID][i].Question;
			}
	
			
			cell = row.insertCell (0);

			/* Set row's attributes */
			row.setAttribute("id", "RowID " + domainsAndQuestions.questions[domainID][i].idquestion);
			/*-----------------------*/

			cell.setAttribute("id", questionID);
			cell.setAttribute("class", "borderL");
			cell.appendChild(document.createTextNode(question));
	
			/* Cell containing the checkBox */
			cell = row.insertCell (1);

			/* Add a checkBox */
			checkBox = document.createElement("input");
			label = document.createElement("label");
			span = document.createElement("span");
			checkBox.type = "checkbox";
			span.setAttribute("class", "squaredFour");
			label.setAttribute("class", "squaredFour");
			label.id = "LC Row " + domainsAndQuestions.questions[domainID][i].idquestion;
			checkBox.id = "CheckBox Row " + domainsAndQuestions.questions[domainID][i].idquestion;
			checkBox.value = domainID;
			checkBox.name = i;
			span.appendChild(checkBox);
			span.appendChild(label);
			cell.appendChild(span);
			/*------------*/
		}
	}
}




/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/****************************************************************************************************** CHECKBOX FUNCTIONS *********************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



/************************************************************************/
/*             Check all the box that belong to the package             */
/*																		*/
/*  @Param packageQuestions : the questions that belong to the package  */
/************************************************************************/
function checkPackageIDBox (packageQuestions)
{
	var checkBox;
	for (var i = 0; i < packageQuestions.length; i++)
	{
		checkBox = document.getElementById("CheckBox Row " + packageQuestions[i].idquestion);
		if (checkBox != null) checkBox.setAttribute("checked", true);
		checkBox.setAttribute("disabled", "true");
	}
}


/***********************************************************************************/
/*          			Confirm the changes made to the package    			       */
/***********************************************************************************/
function confirmChoice ()
{
	// Delete all the present rows
	while (MainTable.hasChildNodes()) 
	{
		MainTable.removeChild(MainTable.lastChild);
	}
	document.getElementById("Package").parentNode.removeChild(document.getElementById("Package"));
	document.getElementById("confirmChoice").parentNode.removeChild(document.getElementById("confirmChoice"));
	
	getJson (packageID);
}