(function ($) {

	// define Annotation as a Backbone Model Object
	var Annotation = Backbone.Model.extend({ 
		sync: function () { return false; },
		removed: false,
		completed: false
	});

	//define a collection to store Annotation Models
	var AnnotationCollection = Backbone.Collection.extend({
		model: Annotation
	});

	// define a router to store annotations object
	var annColl = new AnnotationCollection();

	var AnnotationEntryForm = Backbone.View.extend({
		el: $('.annotation-entry'),

		textarea: $('.annotations-entry#textbox'),

		events: {
			'click .annotation-submit': 'submit',
			'click .annotation-cancel': 'cancel'
		},

		initialize: function(){
			_.bindAll(this, 'submit', 'cancel');
		},

		submit: function() {

			$(this.el).hide();
			$('.annotations').show();
			this.model.set({text: $('#textbox').val(), completed: true});
			$('#textbox').val('');
			this.model = null;
			
		},

		cancel: function() {
			$(this.el).hide();
			$('.annotations').show();
			this.textarea.val('');
			this.model.set({removed:true});
		}
	});
	// define window object, allowing resetting of annotation entry inside other functions
	EntryForm = new AnnotationEntryForm;

	var AnnotationView = Backbone.View.extend({

		tagName: 'li',

		events: {
			'click .delete': 'remove'
		},

		initialize: function(){
      		_.bindAll(this, 'render', 'remove', 'complete');
      		this.model.bind('change:removed', this.remove);
      		this.model.bind('change:completed', this.complete);
  		},

  		render: function() {
  			$(this.el).html('<li>'+this.model.get('text')+'<button class="btn delete">Delete</button></li>');
  			return this;
  		},

  		complete: function() {
  			this.model.bind('change', this.render);
  			this.render();
  		},

  		remove: function(){
  			$(this.el).remove();
  			this.model.set({removed: true});   		
    	}
	});

	// define a view for the right side Annotation List
	var AnnotationListView = Backbone.View.extend({

		el: $('.annotations-list'),

		events: {
			
		},

		initialize: function(){
      		_.bindAll(this, 'render', 'appendAnnotation');
      		this.collection = annColl;
      		this.collection.bind('add', this.appendAnnotation);
			this.render();
    	},

    	render: function(){
    		return this;
    	},


    	appendAnnotation: function(annotation){
    		var annotationView = new AnnotationView({
    			model: annotation
    		})
    		// view is actually rendered via the newly created annotationView
    		$(this.el).append(annotationView.render().el);
    	}
	});

	var listview = new AnnotationListView();

	var SelectionView = Backbone.View.extend({
		tagName: 'span',

		events: {
			// "click" : "showAnnotation",
			// "mouseoff": "hideAnnotation"
		},

		initialize: function(){
			this.completed = false;
      		_.bindAll(this, 'render', 'remove', 'unrender');
      		this.model.bind('change:removed', this.unrender);
      		this.render();
  		},

  		render: function(){
  			// injects a highlighted span into the document, which marks the annotation selection
			var range = this.model.get('rangeObj');
			var spanWrap = document.createElement('span');
			spanWrap.className = 'selection';
			range.surroundContents(spanWrap);
			this.el = spanWrap;
  		},

  		unrender: function(){
  			$(this.el).replaceWith($(this.el).html());
  			this.model.destroy();
  		},

	});

	var DocumentView = Backbone.View.extend({
		
		el: $('.doc-text'),

		events: {
			'mouseup': 'collectText',
		},

		initialize: function(){
		    _.bindAll(this, 'render', 'collectText'); 
      		this.collection = annColl;
    	},

    	render: function(){

    	},

		collectText: function() {
			var sel = document.getSelection();
			var rangeObj = sel.getRangeAt(0);

			// only creates an annotation object if text selection length > 1
			if (!rangeObj.collapsed) {
				var resp = confirm('Annotate this text?')
				
				// only adds annotation if resp is true.
				if (resp) {

					$('.annotations').hide();
					$('.annotation-entry').show();

					var annotation = new Annotation({
						selection: sel,
						text: null,
						rangeObj: rangeObj,
					});

					EntryForm.model = annotation;

					var selection = new SelectionView({
						model: annotation
					});

					// add new annotation object to a Collection
					this.collection.add(annotation);

				}
			} 
		},


	});

	var docview = new DocumentView;

})(jQuery);




