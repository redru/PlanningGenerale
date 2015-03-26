var DB = {

	load: function(params) {
		changeLoaderState(true);
	
		$.ajax({
			url: 'services/LoadService.php',
			method: 'POST',
			data: { period: params.period },
			dataType: 'json',
			complete: loadSuccess
		});
	},
	
	loadPlanning: function(params) {
		changeLoaderState(true);
	
		$.ajax({
			url: 'services/LoadPlanningService.php',
			method: 'POST',
			data: { period: params.period },
			dataType: 'json',
			complete: loadPlanningSuccess
		});
	},
	
	save: function(params) {
		changeLoaderState(true);
		
		$.ajax({
			url: 'services/SaveService.php',
			method: 'POST',
			data: { id: params.id, value: params.value, period: params.period, project: params.project },
			dataType: 'html',
			complete: saveSuccess
		});
	},
	
	savePlanning: function(params) {
		changeLoaderState(true);
		
		$.ajax({
			url: 'services/SavePlanningService.php',
			method: 'POST',
			data: { value: params.value, period: params.period, planning: params.planning },
			dataType: 'html',
			complete: savePlanningSuccess
		});
	},
	
	deleteRow: function(params) {
		changeLoaderState(true);
		
		$.ajax({
			url: 'services/DeleteRowService.php',
			method: 'POST',
			data: { id: params.id },
			dataType: 'html',
			complete: deleteRowSuccess
		});
	},
	
	deleteProject: function(params) {
		changeLoaderState(true);
		
		$.ajax({
			url: 'services/DeleteProjectService.php',
			method: 'POST',
			data: { project: params.project, period: params.period },
			dataType: 'html',
			complete: deleteProjectSuccess
		});
	}

};

function loadSuccess(response, status) {
	var gridData = response.responseJSON;
	
	if (gridData != undefined) {
		for (var i = 0; i < gridData.length; i++) {
			if (!projectExists(gridData[i].id_cella)) {
				$('#newProject').val(extractId(gridData[i].id_cella).project);
				addProject();
			}
			
			$('#' + gridData[i].id_cella).val(gridData[i].valore);
			changeDayWorkState(gridData[i].id_cella);
		}
		
		$('#newProject').val('');
	}
	
	// Execute calculations
	calculate();
	changeLoaderState(false);
}

function loadPlanningSuccess(response, status) {
	var gridData = response.responseJSON;
	
	if (gridData != undefined) {
		for (var i = 0; i < gridData.length; i++) {
			$('#' + gridData[i].id_planning).find('.inputPersonale').val(gridData[i].value);
		}
	}
	
	var params = {};
	params.period = $('#monthSelect').val() + $('#yearSelect').val();
	DB.load(params);
}

function saveSuccess(response, status) {
	changeLoaderState(false);
}

function savePlanningSuccess(response, status) {
	changeLoaderState(false);
}

function deleteRowSuccess(response, status) {
	changeLoaderState(false);
}

function deleteProjectSuccess(response, status) {
	changeLoaderState(false);
	
	loadPeriod();
}