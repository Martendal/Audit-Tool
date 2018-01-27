var id = '1';
	var page = 0;
	var pagemax = 0;
	var json = 0;
	var coef = 0;

	//Load the json from the server
	function getJson(id) {
		$.get('/getCoefficients', function(coef_imported) {
			$.get('/getPackage/' + id, function(json_imported) {
				json = json_imported;
				renderView (json);

			});
			coef = coef_imported;

			var graphBtn = document.getElementById("graphBtn");
        	graphBtn.setAttribute("onclick", "generateGraph(json)");
		});
	}

	//Refresh the page to the next one
	function nextPage() {
		if(page < pagemax-1){
			page++;
			$("#tableBody").empty();
			pageLoader(page, json, coef);
		}
		
	}

	//Refresh the page to the previous one
	function previousPage() {
		if(page > 0){
			page--;
			$("#tableBody").empty();
			pageLoader(page, json, coef);
		}
	}

	//Used to download the JSON file
	function updateJsonDownloader(json) {
		var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
		$("#saveAudit").attr("href", "data:" + data);
		$("#saveAudit").attr("download", 'audit.json');
	}



	//Generates the graph when the associated button is pressed
	function generateGraph(json) {
		$("#questionnaire").hide();
		$("#toPdf").attr("hidden", false);
		$("#inputName").attr("hidden", false);
		$("#chartDiv").attr("hidden", false);

		var ctx = document.getElementById("chartResult");
	    var means = [];
	    var meansmax = [];
	    var labels = [];
	    for (l=0; l<json.pages.length; l++) {
	        labels.push(json.pages[l].questions[0].title);
	        var meantmp = 0;
	        var meantmp2 = 0;
	        var name = json.pages[l].questions[0].name;
	        var val = 0;
	        var currentCoef = 0;
	        var len = json.pages[l].questions[0].rows.length;
	        for(r=0; r<json.pages[l].questions[0].rows.length; r++) {
	            val = json.pages[l].questions[0].rows[r].answer;//The user's answer
	            currentCoef = coef[json.pages[l].questions[0].rows[r].coef - 1].Valeur + 1; //Get the associated coefficient value imported from DB

	            //The answer is between 1 and 5
	            if(val < 6){
	                meantmp += val*currentCoef;
	                meantmp2 += val*currentCoef;
	            }

	            //The answer is "I don't know", so we have to consider extremes values
	            else if(val == 6) {
	                meantmp2 += 5*currentCoef;
	            }

	            //The answer is "not concerned", so we don't consider this question in the mean calculation
	            else {
	                len --;
	            }
	        }

	        //Calculation of the means to use in the graph
	        meantmp = meantmp/len;
	        meantmp2 = meantmp2/len;
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




	//Shows the right page of the questionnaire
	function pageLoader(page, json, coef) {
        var tbody = $("#tableBody");
        for(var line=0; line<json.pages[page].questions[0].rows.length; line++) { //Iteration over each question of the domain
        	var question = json.pages[page].questions[0].rows[line];
        	

        	//Creating the html components dynamically
        	var tr = document.createElement("tr");
        	var td = document.createElement("td");
        	var q = question.text;
        	var domain = json.pages[page].questions[0].title;
       		$("#domainName").text(domain);
        	td.append(q);
        	tr.append(td);
        	for (var i=1; i<8; i++) {
        		td = document.createElement("td");
        		var label = document.createElement("label");
        		$(label).addClass("sv_q_m_label");
        		var input = document.createElement("input");
        		input.type = "radio";
        		input.name = domain + line;
        		input.value = question.value;
        		$(input).attr("onclick", "saveRadioChoice("+question.value+","+i+")");
        		var span1 = document.createElement("span");
        		var span2 = document.createElement("span");
        		$(span1).addClass("circle");
        		$(span2).addClass("check");

        		//If there is a saved answer in the json
        		if(question.answer == i) {
        			input.checked = true;
        		}
        		label.append(input, span1, span2);
        		td.append(label);
        		tr.append(td);
        	}
        	tbody.append(tr);

        }

        //Handles the graph generator button
        if(page == pagemax-1) {
        	var graphBtn = document.createElement("input");
        	graphBtn.type = "button";
        	$(graphBtn).addClass("buttonQuestionnaire");
        	$(graphBtn).attr("id", "graphBtn");
        	$(graphBtn).attr("onclick", "generateGraph(json)");
        	$(graphBtn).attr("value", "View Graph");
        	$("#questionnaireButtons").append(graphBtn);
        	$("#btnNextPage").hide();
        }
        else{
        	$("#graphBtn").remove();
        	$("#btnNextPage").show();
        }


        updateJsonDownloader(json);
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


	getJson(1);
	
	
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




/*{ questions:
   [ { type: 'matrix',
       name: 'Sécurité physique0',
       title: 'Sécurité physique',
       columns: [Array],
       rows: [Array] } ] }*/



var MainTable = document.getElementById('MainTable'); // The table containing all the inforamtion (domain, questions, checkBoxs, ...)
var actualAction;    // The actual in progress action (add, edit, ...)
var packageID;


/**********************************************************************************/
/*                  Retrieve the domains and questions from the database          */
/**********************************************************************************/
/*var domainsAndQuestions;
var packages;
var packageQuestions
$.get('/getDomains', array = function(c_domainsAndQuestions)
{
	domainsAndQuestions = c_domainsAndQuestions;

	console.log("Domains: ", domainsAndQuestions.domains);
	console.log("Questions: ", domainsAndQuestions.questions);
	

	// Add the different domains as tab
	for (var i = 0; i < domainsAndQuestions.domains.length; i++) 
	{
		if (domainsAndQuestions.domains[i].ParentID == 0)
		{	
			printDomains (i);
		}
	}
});
*/

function renderView (json)
{
	console.log("json:", json);
	// Add the different domains as tab
	for (var i = 0; i < json.pages.length; i++) 
	{	
		if (parseInt(json.pages[i].questions[0].ParentID) == 0)
		{	
			printDomains (i, json);
		}
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
function printDomains (selectedDomainID, json)
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
	divDomain.appendChild(document.createTextNode(json.pages[selectedDomainID].questions[0].title));
	divDomain.setAttribute("id", "div Domain Name " + json.pages[selectedDomainID].questions[0].iddomaine);
	divDomain.setAttribute("onClick", "toggleOpenedDomain (" + json.pages[selectedDomainID].questions[0].iddomaine + ")");

	/* Add a checkBox */
	/*var checkBox = document.createElement("input");
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
	divDomain.appendChild(span);*/
	/*------------*/


	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "Domain " + json.pages[selectedDomainID].questions[0].iddomaine);	
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
	for (var i = selectedDomainID; i < json.pages.length; i++)
	{
		parentDomain = document.getElementById("Domain " + json.pages[i].questions[0].ParentID);
		if (parentDomain != null)
		{
			/*console.log("added domainID: ", domainsAndQuestions.domains[i].iddomaine);
			console.log("added at index: ", -1);*/
			row = parentDomain.insertRow(-1);													// Insert a row at the last position
			row.setAttribute("id", "Row Domain " + json.pages[i].questions[0].iddomaine);	// Set the ID of the row
			cell = row.insertCell(0)															// Insert a cell into the previous create row
			cell.setAttribute("colspan", "8");
			divDomain = document.createElement("div");											// Create a div element
			divDomain.className = "custom-select-trigger opened";								// Set the classes of the div element
			divDomain.setAttribute("id", "div Domain Name " + json.pages[i].questions[0].iddomaine);
			divDomain.setAttribute("onClick", "toggleOpenedDomain (" + json.pages[i].questions[0].iddomaine + ")");
			divDomain.appendChild(document.createTextNode(json.pages[i].questions[0].title));	// Add a text to the div element
			tbody = document.createElement("tbody");											// Create the body of the new domain
			tbody.setAttribute("id", "Domain " + json.pages[i].questions[0].iddomaine);		// Set the id of the new body
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

			/* Add a checkBox */
			/*checkBox = document.createElement("input");
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
			divDomain.appendChild(span);*/
			/*------------*/
		}
	}

putQuestionInForm(json, domainIDs); // Print the questions associated to all the involved domains
	


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
function getIndentation (parentQuestionID, json, domainID, startIndex)
{
	var depth = 1;
	for (var i = startIndex; i >= 0; i--) 
	{
		if (json.pages[domainID].questions[0].rows[i].ParentID == 0) break;
		if (json.pages[domainID].questions[0].rows[i].value == parentQuestionID)
		{
			depth++;
			parentQuestionID = json.pages[domainID].questions[0].rows[i].ParentID;
		}
	}
	return "\xa0\xa0\xa0\xa0".repeat(depth) + "● ";
}


/*********************************************************/
/*         Print the question of the desired domain      */
/*                                                       */
/*  @Param domainIDs : the list of all involved domains  */
/*********************************************************/
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
		tbody = document.getElementById("Domain " + json.pages[domainID].questions[0].iddomaine);

		for (var i = 0; i < json.pages[domainID].questions[0].rows.length; i++) 
		{
			questionID = "Question " + json.pages[domainID].questions[0].rows[i].value;
	
			
			/* If the question has a parent we put the question under it */
			if (json.pages[domainID].questions[0].rows[i].ParentID != 0)
			{
				parentRow = document.getElementById ("RowID " + json.pages[domainID].questions[0].rows[i].ParentID);	// Get the parent row
				row = tbody.insertRow(Array.prototype.slice.call(tbody.children).indexOf(parentRow)+1);					// Insert a row under the parent
				row.className += "hasParent " + parentRow.className;													// Sets the class of the question
				if (parentRow.classList.contains("hasChild") == false) parentRow.classList.add("hasChild");				// Delete the useless class from the parent
				question = getIndentation (json.pages[domainID].questions[0].rows[i].ParentID, json, domainID, i-1) + json.pages[domainID].questions[0].rows[i].text;
			}
			else // The question has no parent
			{	
				var indexRow = i + 1; // We add +1 beacause the fisrt row is here to indicates the corresponding value of the radio buttons
				if (domainIDs.length > j+1)
				{	
					indexRow = Array.prototype.slice.call(tbody.children).indexOf(document.getElementById ("Row Domain " + json.pages[domainIDs[j+1]].questions[0].iddomaine));
				}
				row = tbody.insertRow(indexRow);
				if (backgroundColor%2 == 0) row.className += "sombre highlight ";
				else row.className += "clair highlight ";
				backgroundColor++;
				question = json.pages[domainID].questions[0].rows[i].text;
			}

			cell = row.insertCell (0);

			/* Set row's attributes */
			row.setAttribute("id", "RowID " + json.pages[domainID].questions[0].rows[i].value);
			/*-----------------------*/

			cell.setAttribute("id", questionID);
			cell.setAttribute("class", "borderL");
			cell.appendChild(document.createTextNode(question));
	

			if (json.pages[domainID].questions[0].rows[i].NumOfChild <= 0)
			{
				cell = row.insertCell (1);	
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 1;
				cell.appendChild(th);
	
			
			
				cell = row.insertCell (2);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 2;
				cell.appendChild(th);
			
			
				cell = row.insertCell (3);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 3;
				cell.appendChild(th);
	
			
				cell = row.insertCell (4);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 4;
				cell.appendChild(th);
			
			
				cell = row.insertCell (5);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.value = 5;
				cell.appendChild(th);
			
			
				cell = row.insertCell (6);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.id = domainID + " " + i;
				th.setAttribute("onchange", "saveRadioChoice()");
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.checked = true;
				th.value = 6;
				cell.appendChild(th);
	
			
			
				cell = row.insertCell (7);
				cell.setAttribute("class", "radioButton");
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.id = domainID + " " + i;
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
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;
				th.setAttribute("class", "radioButton");
				th.type = "radio";
				th.checked = true;
				th.value = 8;
				cell.appendChild(label);
				cell.appendChild(th);

				cell = row.insertCell (7);
				cell.setAttribute("class", "radioButton");
				label = document.createElement("label");
				label.appendChild(document.createTextNode("Non: "));
				th = document.createElement("input");
				th.name = "Radio Question " + json.pages[domainID].questions[0].rows[i].value;	
				th.setAttribute("class", "radioButton");
				th.type = "radio";			
				th.value = 9;
				cell.appendChild(label);
				cell.appendChild(th);
			}

		}
	}
}

//Write the user's answers dynamically in the JSON file
function saveRadioChoice()
{
	var myString = event.srcElement.id;
	var myRegexp = /(\d+) (\d+)/g;
	var match = myRegexp.exec(myString);
	
	//console.log(match); // abc
	console.log("Old value:", json.pages[match[1]].questions[0].rows[match[2]].answer);
	json.pages[match[1]].questions[0].rows[match[2]].answer = event.srcElement.value;
	console.log("New value:", json.pages[match[1]].questions[0].rows[match[2]].answer);
}