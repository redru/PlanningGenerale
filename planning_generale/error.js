var Error = {

	showErrorMessage: function(component, errorString) {
		component.text(errorString);
		component.fadeIn();
	},
	
	hideErrorMessage: function(component) {
		component.text("");
		component.fadeOut();
	}
	
}
