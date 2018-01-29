var page = 0;
var pagemax = 0;
var json = 0;
var coef = 0;
var isLoad = false;

//Load the json from the server
function getJson(id) {
	$.get('/getCoefficients', function(coef_imported) {
		$.get('/getPackage/' + id, function(json_imported) {
			json = json_imported;
			renderView (json);

		});
		coef = coef_imported;
    });
}


// Used to download the JSON file
function updateJsonDownloader() {
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
	$("#saveAudit").attr("href", "data:" + data);
	$("#saveAudit").attr("download", 'audit.json');
}



/***********************************************************************************/
/*         Get the total number of child of the given question / domain            */
/*                                                                                 */
/*  @Param questionID : the index where the question is located in retrieves data  */
/*  @Param domainID   : the index where the domain is located in retrieves data    */
/***********************************************************************************/
function getTotalNumOfChild (questionID, domainID, json)
{
	numOfTotalChild = 0;
	if (questionID != null) // We want to know the number of children of a question
	{
		numOfTotalChild = json.domains[domainID].questions[questionID].NumOfChild;
		for (var i = questionID + 1; i < json.domains[domainID].questions.length; i++)
		{
			if (json.domains[domainID].questions[i].NumOfChild > 0 && json.domains[domainID].questions[i].ParentID == json.domains[domainID].questions[questionID].idquestion) 
				numOfTotalChild += getTotalNumOfChild (i, domainID, json);
		}
	}
	else  // We want to know the number of children of a domain
	{
		numOfTotalChild = json.domains[domainID].NumOfChild;
		for (var i = domainID + 1; i < json.domains.length; i++)
		{
			if (json.domains[i].NumOfChild > 0 && json.domains[i].ParentID == json.domains[domainID].iddomaine)
				numOfTotalChild += getTotalNumOfChild (null, i, json);
		}
	}
	return numOfTotalChild;
}

/***********************************************************************************/
/*              Regroup all the sub-domains into their main domain                 */
/***********************************************************************************/
function regroupSubDomainAndMainDomain ()
{
	var numOfTotalChild;
	var studiedJSON = JSON.parse(JSON.stringify(json)); // Create a clone of the original json file
	console.log (studiedJSON);
	var j;

	// Check and regroup the sub-domains
	for (var i = 0; i < studiedJSON.domains.length; i++)
	{
		if(studiedJSON.domains[i].NumOfChild > 0) // This domain has sub-domains
		{
			numOfTotalChild = getTotalNumOfChild (null, i, studiedJSON);
			j = 1;
			while (j <= numOfTotalChild)
			{
				studiedJSON.domains[i].questions = studiedJSON.domains[i].questions.concat(studiedJSON.domains[i+j].questions); // Concat the question of the sub-domain with the main domain one's
				j++;
			}
			studiedJSON.domains.splice (i+1, numOfTotalChild); // Deletes the sub-domains in order to avoid their apparition on the graph
		}

		// Deletes all the questions that have a parent set to "no"
		for (var k = 0; k < studiedJSON.domains[i].questions.length; k++)
		{
			if (studiedJSON.domains[i].questions[k].answer == 9)
			{
				numOfTotalChild = getTotalNumOfChild (k, i, studiedJSON);
				console.log (numOfTotalChild);
				studiedJSON.domains[i].questions.splice (k, numOfTotalChild+1);
				console.log (studiedJSON);
				k--;
			}
		}
	}
	return studiedJSON;
}


	//Generates the graph when the associated button is pressed
	function generateGraph(json) {
		$("#questionnaire").hide();
		$("#toPdf").attr("hidden", false);
		$("#inputName").attr("hidden", false);
		$("#chartDiv").attr("hidden", false);

		var studiedJSON = regroupSubDomainAndMainDomain();
		//console.log (json);

		var ctx = document.getElementById("chartResult");
	    var means = [];
	    var meansmax = [];
	    var labels = [];
	    for (l = 0; l < studiedJSON.domains.length; l++)
	    {
	        labels.push(studiedJSON.domains[l].title);
	        var meantmp = 0;
	        var meantmp2 = 0;
	        var name = studiedJSON.domains[l].name;
	        var val = 0;
	        var currentCoef = 0;
	        var coefSum = 0;
	        var len = studiedJSON.domains[l].questions.length;

	        for(r = 0; r < studiedJSON.domains[l].questions.length; r++)
	        {
	        	console.log(studiedJSON.domains[l].questions[r]);
	            val = studiedJSON.domains[l].questions[r].answer;//The user's answer
	            currentCoef = coef[studiedJSON.domains[l].questions[r].coef - 1].Valeur + 1; //Get the associated coefficient value imported from DB

	            //The answer is between 1 and 5
	            if(val < 6)
	            {
	                meantmp += val*currentCoef;
	                meantmp2 += val*currentCoef;
	                coefSum = coefSum+currentCoef;
	            }

	            //The answer is "I don't know", so we have to consider extremes values
	            else if(val == 6) {
	                meantmp2 += 5*currentCoef;
	                coefSum = coefSum+currentCoef;
	            }

	            //The answer is "not concerned / yes / no", so we don't consider this question in the mean calculation
	            else 
	            {
	                len--;
	            }
	        }

	        //Calculation of the means to use in the graph
	        meantmp = meantmp/coefSum;
	        meantmp2 = meantmp2/coefSum;
	        means.push(meantmp);
	        meansmax.push(meantmp2);
	    }


	    //Useful for the PDF generation to avoid having a black background
	    Chart.plugins.register({
		  beforeDraw: function(chartInstance) {
		    var ctx = chartInstance.chart.ctx;
		    ctx.fillStyle = "white";
		    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
		  }
		});

	    //Creation of the chart
	    var myChart = new Chart(ctx, {
	        type: 'radar',
	        data: {
	            labels: labels,
	            datasets: [{
	                label: 'Minimum security of the company',
	                data: means,
	                backgroundColor: 'rgba(14,43,211,0.2)'              
	            },{
	                label: 'Maximum security of the company',
	                data: meansmax,
	                backgroundColor: 'rgba(111,89,122,0.2)'              
	            }]
	        },
	        options: {
	            scale: {
	                
	                    ticks: {
	                        min:0,
	                        max:5
	                    }
	                
	            }
	        }
	    });
	}


	//Creates a PDF file containing the resulting graph
	function generatePDF() {
		var doc = new jsPDF();
		var canvas = document.querySelector('#chartResult');
		doc.setFontSize(30);
		doc.setFont("arial");
		doc.text(70, 15, $('#companyName').text());
		var canvasImg = canvas.toDataURL("image/png", 1.0);
		doc.addImage(canvasImg, 'PNG', 10, 70, 200, 200 );
		doc.save('audit-result.pdf');
	}

	
	
	$('#inputName').keyup(function() {
	    $('#companyName').html($(this).val());
	});



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


function renderView (json)
{
	var graphBtn = document.getElementById("graphBtn");
    graphBtn.setAttribute("onclick", "generateGraph(json)");
	console.log("json:", json);
	// Add the different domains as tab
	if (json.domains.length <= 0) return;

	document.getElementById("graphBtn").removeAttribute("hidden");
	document.getElementById("saveAudit").removeAttribute("hidden");

	for (var i = 0; i < json.domains.length; i++) 
	{	
		if (parseInt(json.domains[i].ParentID) == 0)
		{	
			printDomains (i, json);
		}
	}
}


/********************************************************/
/*       Print all domains present in the database      */
/*														*/
/* selectedDomainID : the index of the domain to print  */
/********************************************************/
function printDomains (selectedDomainID, json)
{
	/* Create the main domain body */
	var divDomain;
	divDomain = document.createElement("div");
	divDomain.className = "custom-select-trigger opened";
	divDomain.appendChild(document.createTextNode(json.domains[selectedDomainID].title));
	divDomain.setAttribute("id", "div Domain Name " + json.domains[selectedDomainID].iddomaine);
	divDomain.setAttribute("onClick", "toggleOpenedDomain (" + json.domains[selectedDomainID].iddomaine + ")");


	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "Domain " + json.domains[selectedDomainID].iddomaine);	
	tbody.setAttribute("class", "custom-tbody opened");
	MainTable.appendChild(divDomain);
	MainTable.appendChild(tbody);
	/*-----------------------------*/


	var parentDomain;	// The parent domain
	var domainIDs = [];	// The IDs of all involved domains (Main domain and all its sub-domains)
	var row;			// A row
	var cell;			// A cell
	var th;

	row = tbody.insertRow(-1);
	row.insertCell(0);
	cell = row.insertCell (1);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("1"));
	cell.appendChild(th);


	cell = row.insertCell (2);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("2"));
	cell.appendChild(th);


	cell = row.insertCell (3);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("3"));
	cell.appendChild(th);


	cell = row.insertCell (4);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("4"));
	cell.appendChild(th);


	cell = row.insertCell (5);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("5"));
	cell.appendChild(th);


	cell = row.insertCell (6);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("I don't know"));
	cell.appendChild(th);


	cell = row.insertCell (7);
	th = document.createElement("th");
	th.setAttribute("class", "header");
	th.appendChild(document.createTextNode("Not concerned"));
	cell.appendChild(th);


	domainIDs.push(selectedDomainID); // Put the Main domain ID into the involved IDs array

	// Add all the sub-domains (and their children) to the main domain body 
	for (var i = selectedDomainID; i < json.domains.length; i++)
	{
		parentDomain = document.getElementById("Domain " + json.domains[i].ParentID);
		if (parentDomain != null)
		{
			/*console.log("added domainID: ", domainsAndQuestions.domains[i].iddomaine);
			console.log("added at index: ", -1);*/
			row = parentDomain.insertRow(-1);													// Insert a row at the last position
			row.setAttribute("id", "Row Domain " + json.domains[i].iddomaine);	// Set the ID of the row
			cell = row.insertCell(0)															// Insert a cell into the previous create row
			cell.setAttribute("colspan", "8");
			divDomain = document.createElement("div");											// Create a div element
			divDomain.className = "custom-select-trigger opened";								// Set the classes of the div element
			divDomain.setAttribute("id", "div Domain Name " + json.domains[i].iddomaine);
			divDomain.setAttribute("onClick", "toggleOpenedDomain (" + json.domains[i].iddomaine + ")");
			divDomain.appendChild(document.createTextNode(json.domains[i].title));	// Add a text to the div element
			tbody = document.createElement("tbody");											// Create the body of the new domain
			tbody.setAttribute("id", "Domain " + json.domains[i].iddomaine);		// Set the id of the new body
			tbody.setAttribute("class", "custom-tbody opened");
			tbody.setAttribute("style", "background-color: hsla(" + (209+(20*i))%360 + ", 30%, 60%, 0.7)");
			cell.appendChild(divDomain);														// Add the div element to the cell
			cell.appendChild(tbody);															// Add the span element to the cell
			domainIDs.push(i);																	// Put the domain ID into the involved IDs array
			

			row = tbody.insertRow(-1);
			row.insertCell(0);
			cell = row.insertCell (1);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("1"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (2);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("2"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (3);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("3"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (4);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("4"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (5);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("5"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (6);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("I don't know"));
			cell.appendChild(th);
		
		
			cell = row.insertCell (7);
			th = document.createElement("th");
			th.setAttribute("class", "header");
			th.appendChild(document.createTextNode("Not concerned"));
			cell.appendChild(th);
		}
	}

putQuestionInForm(json, domainIDs); // Print the questions associated to all the involved domains
	


}


/*******************************************************************************/
/*           Prints the elements to edit a domain of the database              */
/*                                                                             */
/*  @Param elementTriggerID : the id of the checkBox that launch the function  */
/*******************************************************************************/
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
function getIndentation (parentQuestionID, json, domainID, startIndex)
{
	var depth = 1;
	for (var i = startIndex; i >= 0; i--) 
	{
		if (json.domains[domainID].questions[i].ParentID == 0) break;
		if (json.domains[domainID].questions[i].idquestion == parentQuestionID)
		{
			depth++;
			parentQuestionID = json.domains[domainID].questions[i].ParentID;
		}
	}
	return "\xa0\xa0\xa0\xa0".repeat(depth) + "● ";
}


/****************************************************************/
/*           Print the question of the desired domain           */
/*                                                              */
/*  @Param json      : the json containing all the information  */
/*  @Param domainIDs : the list of all involved domains         */
/****************************************************************/
function putQuestionInForm (json, domainIDs)
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

	var th;
	var label;
	var span;

	for (var j = 0; j < domainIDs.length; j++)
	{
		domainID = domainIDs[j];
		console.log("DOMAINID: ", domainID);
		tbody = document.getElementById("Domain " + json.domains[domainID].iddomaine);

		for (var i = 0; i < json.domains[domainID].questions.length; i++) 
		{
			questionID = "Question " + json.domains[domainID].questions[i].idquestion;
	
			
			/* If the question has a parent we put the question under it */
			if (json.domains[domainID].questions[i].ParentID != 0)
			{
				parentRow = document.getElementById ("RowID " + json.domains[domainID].questions[i].ParentID);	// Get the parent row
				row = tbody.insertRow(Array.prototype.slice.call(tbody.children).indexOf(parentRow)+1);					// Insert a row under the parent
				row.className += "hasParent " + parentRow.className;													// Sets the class of the question
				if (parentRow.classList.contains("hasChild") == false) parentRow.classList.add("hasChild");				// Delete the useless class from the parent
				question = getIndentation (json.domains[domainID].questions[i].ParentID, json, domainID, i-1) + json.domains[domainID].questions[i].text;
			}
			else // The question has no parent
			{	
				var indexRow = i + 1; // We add +1 beacause the fisrt row is here to indicates the corresponding value of the radio buttons
				if (domainIDs.length > j+1)
				{	
					indexRow = Array.prototype.slice.call(tbody.children).indexOf(document.getElementById ("Row Domain " + json.domains[domainIDs[j+1]].iddomaine));
				}
				row = tbody.insertRow(indexRow);
				if (backgroundColor%2 == 0) row.className += "sombre highlight ";
				else row.className += "clair highlight ";
				backgroundColor++;
				question = json.domains[domainID].questions[i].text;
			}

			cell = row.insertCell (0);

			/* Set row's attributes */
			row.setAttribute("id", "RowID " + json.domains[domainID].questions[i].idquestion);
			/*-----------------------*/

			cell.setAttribute("id", questionID);
			cell.setAttribute("class", "borderL");
			cell.appendChild(document.createTextNode(question));
	

			if (json.domains[domainID].questions[i].NumOfChild <= 0)
			{
				cell = row.insertCell (1);	
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 1;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 1;
				cell.appendChild(th);
	
			
			
				cell = row.insertCell (2);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 2;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 2;
				cell.appendChild(th);
			
			
				cell = row.insertCell (3);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 3;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 3;
				cell.appendChild(th);
	
			
				cell = row.insertCell (4);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 4;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 4;
				cell.appendChild(th);
			
			
				cell = row.insertCell (5);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i + " " + 5;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 5;
				cell.appendChild(th);
			
			
				cell = row.insertCell (6);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.id = domainID + " " + i  + " " + 6;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.checked = true;
				th.value = 6;
				cell.appendChild(th);
	
			
			
				cell = row.insertCell (7);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 7;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 7;
				cell.appendChild(th);


			}

			else
			{
				cell = row.insertCell (1);
				cell = row.insertCell (2);
				cell = row.insertCell (3);
				cell = row.insertCell (4);
				cell = row.insertCell (5);
				
				cell = row.insertCell (6);
				cell.setAttribute("class", "radioButton");
				label = document.createElement("label");
				label.appendChild(document.createTextNode("Oui: "));
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i  + " " + 8;
				th.value = 8;
				if (isLoad == false) json.domains[domainID].questions[i].answer = 8;
				th.setAttribute("onchange", "saveRadioChoice()");
				cell.appendChild(label);
				cell.appendChild(th);

				cell = row.insertCell (7);
				cell.setAttribute("class", "radioButton");
				label = document.createElement("label");
				label.appendChild(document.createTextNode("Non: "));
				th = document.createElement("input");
				th.name = "Radio Question " + json.domains[domainID].questions[i].idquestion;	
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i + " " + 9;		
				th.value = 9;
				th.setAttribute("onchange", "saveRadioChoice()");
				cell.appendChild(label);
				cell.appendChild(th);
			}


			document.getElementById(domainID + " " + i  + " " + json.domains[domainID].questions[i].answer).checked = true;

		}
	}
}

//Write the user's answers dynamically in the JSON file
function saveRadioChoice()
{
	var myString = event.srcElement.id;
	var myRegexp = /(\d+) (\d+)/g;
	var match = myRegexp.exec(myString);
	
	console.log("Old value:", json.domains[match[1]].questions[match[2]].answer);
	json.domains[match[1]].questions[match[2]].answer = parseInt(event.srcElement.value);
	console.log("New value:", json.domains[match[1]].questions[match[2]].answer);
}

//Gets the JSON file chosen by the user
function loadJson() {
	$.get('/getCoefficients', function(coef_imported) {
		coef = coef_imported;
		var userJson = $('#userJson').get(0).files[0];
		if(userJson) {
			var reader = new FileReader();
			reader.readAsText(userJson, "UTF-8");
			reader.onload = function (evt) {
				json = $.parseJSON(evt.target.result);
				isLoad = true;
				renderView (json);
				document.getElementById("uploadBtn").setAttribute("style", "visibility: collapse;");
			}
			reader.onerror = function(evt) {
				alert("File not found ! ");
			}
		}
	});
}