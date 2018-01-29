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

		// Graphical option
		selectOption = document.createElement("option");
		selectOption.setAttribute("disabled", "disabled");
		selectOption.appendChild(document.createTextNode("──────────"));
		selectPackage.appendChild(selectOption);
		// Nouveau Package
		selectOption = document.createElement("option");
		selectOption.setAttribute("value", -1);
		selectOption.appendChild(document.createTextNode("Nouveau package"));
		selectPackage.appendChild(selectOption);

		changePackageID();
	});

	// Add the different domains as tab
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID == 0)
		{	
			printDomains (i);
		}
	}
});


/***********************************************************************************/
/*                            Change the studied package                           */
/***********************************************************************************/
function changePackageID ()
{
	if (document.getElementById ("Main Package Selector").value == -1) printAddPackageElements ();
	else
	{
		if (actualAction != null)
		{
			actualAction = null;

			// Add the different domains as tab
			for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
			{
				if (domainsAndQuestions.domains[i].ParentID == 0)
				{	
					printDomains (i);
				}
			}
			document.getElementById ("PackageNameForm").setAttribute("onsubmit", "confirmChanges()");
			document.getElementById ("DeletePackage").removeAttribute("style");
			document.getElementById ("DeletePackage").removeAttribute("disabled");
		}
		else
		{
			for (var i = 0; i < domainsAndQuestions.questions.length; i++)
			{
				for (var j = 0; j < domainsAndQuestions.questions[i].length; j++)
				{
					document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[i][j].idquestion).removeAttribute("checked");
				}
			}
		}

		packageID = packages[document.getElementById ("Main Package Selector").value].idpackage;

		document.getElementById("PackageName").value = packages[document.getElementById ("Main Package Selector").value].Nom;

		$.get('/getAllQuestionsByPackageId/' + packageID, function(c_packageQuestions)
		{
			packageQuestions = c_packageQuestions;
			console.log("Result: ", packageQuestions);
			checkPackageIDBox (packageQuestions)
		});
	}
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
function printDomains (selectedDomainID)
{

/*	// Delete all the present rows
	while (MainTable.hasChildNodes()) 
	{
		MainTable.removeChild(MainTable.lastChild);
	}
*/
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
			divDomain.setAttribute("onClick", "toggleOpenedDomain (" + domainsAndQuestions.domains[i].iddomaine + ")");
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

	putQuestionInForm(domainIDs);	// Print the questions associated to all the involved domains


}


/*****************************************************************************/
/*           Prints the elements to edit a domain of the database            */
/*                                                                           */
/*  @Param elementTriggerID : the id of the checkBox that launch the function  */
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
			label.setAttribute("onClick", "toggleCheckBox()");
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
	}
}


/**********************************************************************************/
/*           Toggle the state of the checkbox that called the function            */
/**********************************************************************************/
function toggleCheckBox()
{
	event.stopPropagation();
	console.log ("LC:", event.srcElement.id.replace("LC", ""));
	var checkBox = document.getElementById ("CheckBox" + event.srcElement.id.replace("LC", ""));

	if (checkBox.checked == false)
	{
		checkBox.setAttribute("checked", true);
		if (checkBox.id.includes("Domain"))
		{
			//console.log ("Result: ", domainsAndQuestions.domains[checkBox.value]);
			toggleAllCheckBoxOfADomain (checkBox.value, true);
		}
		else 
		{
			//console.log ("Result: ", domainsAndQuestions.questions[checkBox.value][checkBox.name]);
			toggleAllCheckBoxOfAQuestion (checkBox.name, checkBox.value, true);
		}
	}
	else
	{
		checkBox.removeAttribute("checked");
		if (checkBox.id.includes("Domain"))
		{
			//console.log ("Result: ", domainsAndQuestions.domains[checkBox.value]);
			toggleAllCheckBoxOfADomain (checkBox.value, false);
		}
		else 
		{
			//console.log ("Result: ", domainsAndQuestions.questions[checkBox.value][checkBox.name]);
			toggleAllCheckBoxOfAQuestion (checkBox.name, checkBox.value, false);
		}
	}
}


/***********************************************************************************/
/*           Toggle the state of all checkbox that belong to the domain            */
/*																				   */
/*  @Param domainID   : the index where the domain is located in retrieves data    */
/*  @Param state      : the state we want the checkbox to be                       */
/***********************************************************************************/
function toggleAllCheckBoxOfADomain(domainID, state)
{
	var checkBox;
	domainID = parseInt(domainID);

	// Toggle the state of all sub-domains and their questions
	for (var i = 1; i <= domainsAndQuestions.domains[domainID].NumOfChild; i++)
	{
		checkBox = document.getElementById ("CheckBox Domain " + domainsAndQuestions.domains[domainID+i].iddomaine);
		if (state == true) checkBox.setAttribute("checked", true);
		else checkBox.removeAttribute("checked");
		toggleAllCheckBoxOfADomain (domainID + i, state);
	}

	// Toogle the state of all questions that belong to the domain
	for (var i = 0; i < domainsAndQuestions.questions[domainID].length; i++)
	{
		checkBox = document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[domainID][i].idquestion);
		if (state == true) checkBox.setAttribute("checked", true);
		else checkBox.removeAttribute("checked");
	}
}


/***********************************************************************************/
/*          Check if the question has at least one child that is checked           */
/*																				   */
/*  @Param questionID : the index where the question is located in retrieves data  */
/*  @Param domainID   : the index where the domain is located in retrieves data    */
/***********************************************************************************/
function doesParentQuestionHasACheckedChildBox (questionID, domainID)
{
	numOfAdd = 0; // The number of studied direct child
	
	for (var i = questionID + 1; i < domainsAndQuestions.questions[domainID].length; i++)
	{
		if (domainsAndQuestions.questions[domainID][i].ParentID == domainsAndQuestions.questions[domainID][questionID].idquestion)
		{
			numOfAdd++;
			checkBox = document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[domainID][i].idquestion);
			if (checkBox.checked == true) return true;
		}
		if (numOfAdd >= domainsAndQuestions.questions[domainID][questionID].NumOfChild) break;
	}
	return false;
}


/***********************************************************************************/
/*          Toggle the state of all checkbox that belong to the question           */
/*																				   */
/*  @Param questionID : the index where the question is located in retrieves data  */
/*  @Param domainID   : the index where the domain is located in retrieves data    */
/*  @Param state      : the state we want the checkbox to be                       */
/***********************************************************************************/
function toggleAllCheckBoxOfAQuestion(questionID, domainID, state)
{
	var checkBox;
	questionID = parseInt(questionID); 
	domainID = parseInt(domainID);

	var numOfAdd = 0; // The number of studied direct child
	var parentID = domainsAndQuestions.questions[domainID][questionID].ParentID;
	
	if (parentID != 0) // If the question has a parent it will also change its state
	{
		var tempQuestionID = getQuestionIDOfiquestion(domainsAndQuestions.questions[domainID][questionID].ParentID, domainID);

		if (state == true) // Just set the parent checkbox to true
		{
			do
			{
				console.log ("CheckBox Row :", parentID);
				checkBox = document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[domainID][tempQuestionID].idquestion);
				checkBox.setAttribute("checked", true);
				parentID = domainsAndQuestions.questions[domainID][tempQuestionID].ParentID;
				tempQuestionID = getQuestionIDOfiquestion(domainsAndQuestions.questions[domainID][tempQuestionID].ParentID, domainID);
			} while (parentID != 0);
		}
		else // Here we need to check if the parent doesn't have another checked child before disabling the parent checkbox
		{
			do
			{
				if (doesParentQuestionHasACheckedChildBox (tempQuestionID, domainID) == true) break;
				checkBox = document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[domainID][tempQuestionID].idquestion);
				checkBox.removeAttribute("checked");
				parentID = domainsAndQuestions.questions[domainID][tempQuestionID].ParentID;
				tempQuestionID = getQuestionIDOfiquestion(domainsAndQuestions.questions[domainID][tempQuestionID].ParentID, domainID);
			} while (parentID != 0);
		}
	}

	// Toggle all checkbox that belong to the parent question
	for (var i = questionID + 1; i < domainsAndQuestions.questions[domainID].length; i++)
	{
		/*console.log ("NumOfAdd:", numOfAdd);
		console.log ("i:", i);
		console.log ("domainsAndQuestions.questions[domainID][questionID].idquestion:", domainsAndQuestions.questions[domainID][questionID].idquestion);
		console.log ("domainsAndQuestions.questions[domainID][i].idquestion:", domainsAndQuestions.questions[domainID][i].idquestion);
		console.log ("domainsAndQuestions.questions[domainID][i].ParentID:", domainsAndQuestions.questions[domainID][i].ParentID);*/

		if (domainsAndQuestions.questions[domainID][i].ParentID == domainsAndQuestions.questions[domainID][questionID].idquestion)
		{
			numOfAdd++;
			checkBox = document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[domainID][i].idquestion);
			if (state == true) checkBox.setAttribute("checked", true);
			else checkBox.removeAttribute("checked");

			if (domainsAndQuestions.questions[domainID][i].NumOfChild > 0) numOfAdd += toggleAllCheckBoxOfAQuestion (i, domainID, state);
		}
		if (numOfAdd >= domainsAndQuestions.questions[domainID][questionID].NumOfChild) break;
	}
	return numOfAdd;
}



/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/******************************************************************************************************* PACKAGE MANAGER ***********************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/
/***********************************************************************************************************************************************************************************************************************************************/



/*************************************************************/
/*             Add a package to the database                 */
/*************************************************************/
function addPackage ()
{ 
	console.log(document.getElementById("PackageName").value);
	$.ajax({
            url: '/addPackage',
            type: 'POST',
            data: {
                arr: [ 	
              		   	document.getElementById("PackageName").value
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/*************************************************************************************************/
/*                       Prints the elements to add a package to the database                    */
/*************************************************************************************************/
function printAddPackageElements ()
{    
	while (MainTable.hasChildNodes()) 
	{
		MainTable.removeChild(MainTable.lastChild);
	}

	document.getElementById ("DeletePackage").removeAttribute("style", "visibility: hidden;");
	document.getElementById ("DeletePackage").setAttribute("disabled", "disabled");

	document.getElementById ("PackageNameForm").setAttribute("onsubmit", "addPackage()");
	document.getElementById ("PackageName").value = "";
	document.getElementById ("PackageName").focus(); // Give the focus to the first text area

	actualAction = 1;

}


/**********************************************************************************************************/
/*  Check the differencies between the original state package id and the state of the retrieved checkbox  */
/*																										  */
/*	@Note: it is recommanded to send sorted array by idquestion 										  */
/*																		                                  */
/*  @Param originalPackage : the data of the original package                                             */
/*  @Param modifiedPackage : the data containing the value of all checkboxes                              */
/**********************************************************************************************************/
function checkDifferencies (originalPackage, modifiedPackage)
{
	differencies = [];
	length = (originalPackage.length < modifiedPackage.length) ? modifiedPackage.length : originalPackage.length;
	var p1 = 0;
	var p2 = 0;
	console.log ("Length: ", length);
	for (var i = 0; i < length; i++)
	{
		console.log (originalPackage[p1]);
		console.log (modifiedPackage[p2]);

		if (p1 >= originalPackage.length || p2 >= modifiedPackage.length) break; // The original or modified package has no more differences or the original package had no question
		
		if (originalPackage[p1].idquestion > modifiedPackage[p2].idquestion) // The question was not present in the original package
		{
			if(modifiedPackage[p2].status == true) differencies.push(modifiedPackage[p2]); // We only add it if the state of the corresponding checkbox is checked
			p2++;
		}
		else // The question was present in the original package
		{
			if (modifiedPackage[p2].status == false) differencies.push(modifiedPackage[p2]); 
			p1++;
			p2++;
		}
	}

	for (var i = p2; i < length; i++)
	{
		if(modifiedPackage[i].status == true) differencies.push(modifiedPackage[i]);
	}

	console.log ("differencies:", differencies);
	return differencies;
}


/***********************************************************************************/
/*          			Confirm the changes made to the package    			       */
/***********************************************************************************/
function confirmChanges ()
{
	var finalPackagesState = [];

	for (var i = 0; i < domainsAndQuestions.questions.length; i++)
	{
		for (var j = 0; j < domainsAndQuestions.questions[i].length; j++)
		{
			var questionState = { 	
							idquestion: domainsAndQuestions.questions[i][j].idquestion,
							domainID: domainsAndQuestions.questions[i][j].DomaineID,
							status: document.getElementById ("CheckBox Row " + domainsAndQuestions.questions[i][j].idquestion).checked
						};
			console.log("questionState", questionState);
			finalPackagesState.push(questionState);
		}
	}

	finalPackagesState.sort(function(a, b)
	{
		return a.idquestion - b.idquestion;
	});
	console.log("finalPackagesState:", finalPackagesState);


	packageQuestions.sort(function(a, b)
	{
		return a.idquestion - b.idquestion;
	});
	console.log("Original package:", packageQuestions);

	finalPackagesState = checkDifferencies (packageQuestions, finalPackagesState);

	$.ajax({
            url: '/modifyPackage',
            type: 'POST',
            data: {
                arr: [ 	
                		packages[document.getElementById("Main Package Selector").value].idpackage,
              		   	document.getElementById("PackageName").value,
              		   	finalPackagesState
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
}


/*****************************************************************************/
/*   Create a modal alert to be sure the user wanted to delete the package   */
/*****************************************************************************/
function askDeletePackage ()
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
	body.appendChild(document.createTextNode("Vous êtes sur le point de supprimer un package de la base de donnée. Êtes-vous sûr de vouloir continuer ?"));
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
		$.ajax({
            url: '/deletePackage',
            type: 'POST',
            data: {
                arr: [ 	
              		   	packageID
                ]
            },
            success: function(data){
                console.log(data);
				location.reload(true); // Reload the page to print the new database
            }
        });
		console.log ("Package to delete: ", packageID);
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