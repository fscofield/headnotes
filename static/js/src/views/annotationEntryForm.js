var AnnotationEntryForm = Backbone.View.extend({
	/*  Controls the entry form made visible on user selection.
		Temporarily holds an annotation model during user editing. 
		Submission saves and renders the model, while form cancellation deletes it.
	*/
	el: $('.annotation-entry'),
	events: {
		'click .annotation-submit': 'submit',
		'click .annotation-cancel': 'cancel'
	},
	initialize: function(){
		_.bindAll(this, 'submit', 'cancel');
	},
	submit: function() {
		// triggers the saving and rendering of the new annotation, and removes the model from this view
		$(this.el).hide();
		$('.annotations').show();
		this.model.set({text: $('#textbox').val(), completed: true});
		// I'm triggering the 'completion' or rendering of this model with these custom variables 
		// via a change:attribute event. I couldn't figure out a better solution. Suggestions?
		$('#textbox').val('');
		this.model = null;
	},
	cancel: function() {
		// triggers the deletion of the current annotation model (also removing it from this view).
		$(this.el).hide();
		$('.annotations').show();
		$('#textbox').val('');
		this.model.set({removed:true});
		// I'm triggering these deleting events with custom variables -- there's probably a better 
		// way to do this. 
	}
});