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
		_.bindAll(this, 'render', 'submit', 'close', 'cancel');
		this.render();
		
	},
	render: function() {
		this.$el.show();
		$('.annotations').hide();
		this.$el.html("<h4>Create a new Annotation</h4>"+
      					  "<textarea rows=\"7\" cols=\"15\" id=\"textbox\">"+
      					  "</textarea><button class=\"btn annotation-submit\">"+
      					  "Submit</button><button class=\"btn annotation-cancel\">"+
      					  "Cancel</button>");
		// this.$el.find('textarea').focus();
	},
	submit: function() {
		// triggers the saving and rendering of the new annotation, and removes the model from this view
		this.model.set({text: $('#textbox').val()});
		this.model.save({},
			{
				success: function(model, response){
					console.log("success");
					hn.annotations.add(model);
				}
			});
		this.close();
	},

	cancel: function(){
		//pulls the highlighted span from the document
		$('.uncomplete').contents().unwrap();
		this.close();
	},

	close: function() {
		this.$el
		  .html("")
	      .hide();
		$('.annotations').show();
		
		this.undelegateEvents();
	},


/// completed -- probably isnt necessary 
/// 
});