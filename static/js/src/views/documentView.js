var DocumentView = Backbone.View.extend({
	// controls user interactions with the main document of the page
	
	el: $('.doc-text'),

	events: {
		'mouseup': 'collectText',
	},

	initialize: function(options){
	    _.bindAll(this, 'collectText');
	    // this view uses the same collection as the AnnotationList view above 
	    _.extend(this, options);
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