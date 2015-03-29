var oldValue;

var month29 = [ 2 ];
var month30 = [ 4, 6, 9, 11 ];
var month31 = [ 1, 3, 5, 7, 8, 10, 12 ];

var specialCharacters = [ '/', '\\', '\'', '"', '.', '-', '(', ')', '!', '?', '#', '@', '$', '%', '&', '=', '*', '^', ',', ';', ':', '{', '}', '+', '[', ']', '<', '>'];

/**
 * Document ready function
 */
$(document).ready(function() {
	// Set todays date
	var date = new Date();
	$('#monthSelect').val(date.getMonth() + 1);
	$('#yearSelect').val(date.getFullYear());
	
	$('.inputPersonale').focusout(focusOutInputPersonale);
	$('.inputPersonale').focusin(focusInInputPersonale);

	var params = {
		period : $('#monthSelect').val() + $('#yearSelect').val()
	};
	
	DB.loadPlanning(params);
});

/**
 * Load all the data from server for the selected period
 */
function loadPeriod() {
	// Clean the loaded data from the page
	cleanData();

	// Prepare params for query
	var params = {
		period : $('#monthSelect').val() + $('#yearSelect').val()
	};
	
	DB.loadPlanning(params);
	DB.load(params);
}

/**
 * Clear the grid
 */
function cleanData() {
	$('.planning').each(function (index) {
		$(this).find('.projectList').html('');
		$(this).find('.inputPersonale').val('');
	});
	
	$('.cellPersonale').each(function (index) {
		$(this).text('');
	});
}

/**
 * focusin function for dayWork objects
 */
function dayWorkFocusIn() {
	oldValue = $(this).val();
}

/**
 * Changes state of the object given by 'cellId'
 *
 * NOTE: Execute only if value has been changed
 */
function changeDayWorkState(cellId) {
	var obj = $('#' + cellId);
	if ($(obj).val() != oldValue) {
		if ($(obj).val() <= 0) {
			$(obj).val('');
		}
		
		if ($(obj).val() != '' && $(obj).val() != 0) {
			$(obj).removeClass('dayWhite');
			$(obj).addClass('dayGreenYellow');
		} else {
			$(obj).removeClass('dayGreenYellow');
			$(obj).addClass('dayWhite');
		}
	}
}

/**
 * Changes state of the object given by 'cellId' and saves on DB
 *
 * NOTE: Execute only if value has been changed
 */
function changeDayWorkStateAndSave() {
	if ($(this).val() != oldValue) {
		// If cell value is under 0 or 0, set to empty
		if ($(this).val() <= 0) {
			$(this).val('');
		}
		
		// Change cell state
		if ($(this).val() != '' && $(this).val() != 0) {
			$(this).removeClass("dayWhite");
			$(this).addClass("dayGreenYellow");
		} else {
			$(this).removeClass("dayGreenYellow");
			$(this).addClass("dayWhite");
		}
		
		// Prepare params for the update
		var params = {
			id : $(this).attr('id'),
			value : $(this).val(),
			period : $('#monthSelect').val() + $('#yearSelect').val(),
			project : $(this).parent().attr('id')
			
		};
		
		// INSERT if the value is different from '', else DELETE
		if ($(this).val() != '') {
			DB.save(params);
		} else {
			DB.deleteRow(params);
		}
		
		// Execute calculations
		calculate(this);
	}
}

/**
 * --------------
 */
function checkDayWorkEnabled(day) {
	var selectedMonth = parseInt($('#monthSelect').val());
	var selectedYear = parseInt($('#yearSelect').val());
	var enabled = true;
	
	switch (day) {
		case 29:
			if (month29.indexOf(selectedMonth) != -1 && !isLeapYear(selectedYear)) {
				enabled = false;
			}
			break;
			
		case 30:
			if (month29.indexOf(selectedMonth) != -1) {
				enabled = false;
			}
			break;
			
		case 31:
			if (month31.indexOf(selectedMonth) == -1) {
				enabled = false;
			} else if (month31.indexOf(selectedMonth) == -1) {
				enabled = false;
			}
			break;
	}
	
	return enabled;
}

/**
 * Calculates if the year is a leap year
 */
function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/**
 * focusin function for dayWork objects
 */
function focusInInputPersonale() {
	oldValue = $(this).val();
}

/**
 * Focus out event for inputPersonale class
 */
function focusOutInputPersonale() {
	if (oldValue != $(this).val()) {
		var params = {};
		params.value = $(this).val();
		params.period = $('#monthSelect').val() + $('#yearSelect').val();
		params.planning = $(this).parent().parent().attr('id');
	
		DB.savePlanning(params);
	}
}

/**
 * Switch if must calculate one column or all columns
 */
function calculate(obj) {
	if (typeof obj == 'undefined') {
		$('.planning').each(function (index) {
			// Calculate for each input of the first project
			$(this).find('.projectList').first().find('.daywork').each(function (index) {
				calculateSingleColumn(this);
			});
		});
	} else {
		calculateSingleColumn(obj);
	}
}

/**
 * Calculates the 'PERSONALE' values
 */
function calculateSingleColumn(obj) {
	var result = 0;
	var idWrap = extractId( $(obj).attr('id') );
	var projList = $(obj).parent().parent();
	$(projList).find('.project').each(function (index) {
	
		// .project
		$(this).each(function (index) {
			var id = idWrap.date + '-' + idWrap.planning + '-' + $(this).attr('id') + '-' + idWrap.day;
			var parse = parseInt( $('#' + id).val() );
			if (!isNaN(parse)) {
				result += parse;
			}
		});
	});
	
	if (result > 0) {
		$('#' + idWrap.planning + idWrap.day).text(result);
	} else {
		$('#' + idWrap.planning + idWrap.day).text('');
	}
	
	var difference = parseInt( $(projList).parent().find('.totals').find('.inputPersonale').val() ) - result;
	// If inputPersonale is not valorized, difference is NaN
	if (!isNaN(difference) && difference < 0) {
		// Set red text in the result cell
		$('#' + idWrap.planning + idWrap.day).addClass('redText');
		
		// Set value in the 'esterno' result cell
		$('#' + idWrap.planning + '_e' + idWrap.day).text( Math.abs(difference) );
	} else {
		// Remove red text
		$('#' + idWrap.planning + idWrap.day).removeClass('redText');
		// Reset value of the esterno result cell
		$('#' + idWrap.planning + '_e' + idWrap.day).text('');
	}
}

/**
 * Add new project to the grid
 */
function addProject() {
	var newProjectComp = $("#newProject");
	var monthSelect = $("#monthSelect");
	var yearSelect = $("#yearSelect");
	Error.hideErrorMessage($("#top-error-area"));
	
	if ( containsSpecialCharacters(newProjectComp.val()) ) {
		Error.showErrorMessage($("#top-error-area"), "Non sono ammessi caratteri speciali ad eccezione di _");
		newProjectComp.focus();
	} else if (!projectExists(newProjectComp.val())) {
		// Trim the input string
		newProjectComp.val(newProjectComp.val().trim());
		// Remove all white spaces
		newProjectComp.val(newProjectComp.val().replace(/ /g, ""));
		
		newProjectComp.val( removeSpecialCharacters( newProjectComp.val() ) )
		
		// Check if input is empty
		if (newProjectComp.val()) {
		
			// Execute for all lists
			$(".projectList").each(function (index) {
				var tmp = "";
				
				tmp = tmp.concat("<div id='" + newProjectComp.val() + "' class='project'>");
				// Set project name
				tmp = tmp.concat("<label class='spacer-15'>" + newProjectComp.val() + "</label>");
				
				// Set all the days input
				for (var i = 1; i <= 31; i++) {
					var state;
					
					// Check 29, 30 and 31 days if are enabled
					if (checkDayWorkEnabled(i)) {
						state = 'enabled';
					} else {
						state = 'disabled';
					}
					
					tmp = tmp.concat("<input type='number' " + state + " id='" + monthSelect.val() + yearSelect.val() + "-" + $(this).parent().attr("id") + "-" + newProjectComp.val() + "-" + i + "' class='day daywork dayWhite'></input>");
				}
				
				tmp = tmp.concat('<img src="resources/delete_icon.png" class="deleteButton" onclick="deleteProject(\'' + newProjectComp.val() + '\')" />');
				tmp = tmp.concat("</div>");
				
				$(this).append(tmp);
			});
			
			// Set dayWork focusout event
			$(".daywork").focusout(changeDayWorkStateAndSave);
			$(".daywork").focusin(dayWorkFocusIn);
		
			// Reset new project value
			newProjectComp.val("");
		}
	} else {
		newProjectComp.focus();
	}
}

/**
 * Delete selected project
 */
function deleteProject(project) {
	if (confirm("Sicuro di voler eliminare definitivamente:\n" +
				" - Progetto: " + project + "\n" +
				" - Periodo:  " + $('#monthSelect').find(":selected").text() + "  " + $('#yearSelect').find(":selected").text() + " ?")) {
		
		cleanData();
		
		var params = {};
		params.project = project;
		params.period = $('#monthSelect').val() + $('#yearSelect').val();
		DB.deleteProject(params);
	}
}

/**
 * Check if project already exists
 */
function projectExists(projectId) {
	var result = false;

	$(".project").each(function (index) {
		if ($(this).attr("id") == projectId) {
			result = true;
		}
	});
	
	return result;
}

/**
 * Extract object wrapping the ID
 */
function extractId(projectId) {
	var object = {date: "", planning : "", project : "", day : ""};
	
	object.date = projectId.substring(0, projectId.indexOf("-"));
	projectId = projectId.substring(projectId.indexOf("-") + 1);
	object.planning = projectId.substring(0, projectId.indexOf("-"));
	projectId = projectId.substring(projectId.indexOf("-") + 1);
	object.project = projectId.substring(0, projectId.indexOf("-"));
	projectId = projectId.substring(projectId.indexOf("-") + 1);
	object.day = projectId.substring(projectId.indexOf("-") + 1);
	
	return object;
}

/**
 * Hide / show loading image
 */
function changeLoaderState(state) {
	if (state == true) {
		$('.loader').show();
	} else {
		$('.loader').hide();
	}
}

/**
 * Removes all special characters
 */
function removeSpecialCharacters(str) {
	for (var idx = 0; idx < specialCharacters.length; idx++) {
		str = str.replace(specialCharacters[idx], "");
	}
	
	return str;
}

/**
 * Look for special characters
 * - 'true' if a character is found
 * - 'false' if any special character was found
 */
function containsSpecialCharacters(str) {
	var found = false;
	
	for (var idx = 0; idx < specialCharacters.length; idx++) {
		if (str.indexOf(specialCharacters[idx]) != -1) {
			found = true;
		}
	}
	
	return found;
}
