(function ($) {



	// define Annotation as a Backbone Model Object
	var Annotation = Backbone.Model.extend({ 
		sync: function () { return false; }, // not currently hooked up to a server
		removed: false,
		completed: false
	});

	//define a collection to store Annotation Models
	var AnnotationCollection = Backbone.Collection.extend({
		model: Annotation
	});

	// define a collection to store annotation models
	var annColl = new AnnotationCollection();

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

	// define window object, allowing resetting of annotation entry inside other functions
	// not entirely sure if global is necessary here. 
	// would "var entryForm" be sufficient? See below (line 187).
	EntryForm = new AnnotationEntryForm;

	var AnnotationView = Backbone.View.extend({
		// controls individual annotations in the right-side annotation bar.

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
  			// I need to figure out templating, this is a mess! -.-
  			$(this.el).html(
  				'<li data-startoffset="'+this.model.get('startOffset')+'" data-endoffset="'
  				+this.model.get('endOffset')+'"><span>'+this.model.get('text')+'</span>'
  				+'<button class="btn delete" style="margin-left: 10px;"><i class="icon-trash"></i></button></li>');
  			return this;
  		},

  		complete: function() {
  			// is triggered when a user completes annotation-entry form.
  			this.model.bind('change', this.render);
  			this.render();
  		},

  		remove: function(){
  			$(this.el).remove();
  			// this event triggers the removal of the corresponding selection view in the main document
  			this.model.set({removed: true});

    	}
	});

	
	var AnnotationListView = Backbone.View.extend({
		// controls the right-side list of annotations

		el: $('.annotations-list'),

		initialize: function(){
      		_.bindAll(this, 'appendAnnotation');
      		this.collection = annColl;
      		// any time an annotation is added to the collection, a new annotation view is rendered.
      		this.collection.bind('add', this.appendAnnotation);
    	},

    	appendAnnotation: function(annotation){
    		var annotationView = new AnnotationView({
    			model: annotation
    		})
    		// view is actually rendered via the newly created annotationView and its render function
    		$(this.el).append(annotationView.render().el);
    	}
	});

	var listview = new AnnotationListView();

	var SelectionView = Backbone.View.extend({
		// creates and controls individual user selections on the main document
		tagName: 'span',

		initialize: function(){
			this.completed = false;
      		_.bindAll(this, 'render', 'remove', 'unrender');
      		this.model.bind('change:removed', this.unrender);
      		// I've listened to the removal of this view's model via a custom attribute...
      		// bind('destroy', this.unrender) throws an error because this.model no longer exists
      		// is this the correct way to link this view to a model, where another view is already linked?
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
  			//removes the wrapping span from the doc-text
  			$(this.el).replaceWith($(this.el).html());
  			this.model.destroy();
  		}
	});

	var DocumentView = Backbone.View.extend({
		// controls user interactions with the main document of the page
		
		el: $('.doc-text'),

		events: {
			'mouseup': 'collectText',
		},

		initialize: function(){
		    _.bindAll(this, 'collectText');
		    // this view uses the same collection as the AnnotationList view above 
      		this.collection = annColl;
    	},

		collectText: function() {
			/* triggered when a user highlights text on the displayed document
			It creates a new selection view and annotation model and adds it to the collection */

			// obtain user's text selection
			var sel = document.getSelection();
			var rangeObj = sel.getRangeAt(0);

			// only creates an annotation object if user's text selection length > 1
			if (!rangeObj.collapsed) {
				var resp = confirm('Annotate this text?');

				if (resp) {
					$('.annotations').hide();
					$('.annotation-entry').show();

					// create Annotation model
					var annotation = new Annotation({
						selection: sel,
						text: null,
						rangeObj: rangeObj,
						startOffset: rangeObj.startOffset,
						endOffset: rangeObj.endOffset,
					});

					// make EntryForm view's model temporarily the current annotation
					// since this is accessed inside the collect text function, it has to be global... right?
					EntryForm.model = annotation;

					// create a new text selection view to be added to the document
					var selection = new SelectionView({
						model: annotation
					});
					// add new annotation object to a Collection
					this.collection.add(annotation);
				}
			} 
		},
	});
	// initialize document view
	var docview = new DocumentView;
})(jQuery);




