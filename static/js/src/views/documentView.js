var DocumentView = Backbone.View.extend({
	// controls user interactions with the main document of the page
	
	el: $('.doc-text'),

	events: {
		'mouseup': 'createAnnotation',
	},

	initialize: function(options){
		_.extend(this, options);
	    _.bindAll(this, 'createAnnotation', 'render', 'save', 'removeAnnotation', 'insertAnnotation');
	   	this.listenTo(this.collection, 'remove', this.removeAnnotation);
	   	// this.collection.on('add', this.insertAnnotation, this);
	   	// this.collection.on('remove', this.removeAnnotation, this);
	    this.listenTo(this.collection, 'add', this.insertAnnotation);
	    this.listenTo(this.model,'change', this.render);
	    this.model.fetch();
	},
	render: function(){
		this.$el.html(this.model.get('html'));
	},
	createAnnotation: function() {
		/* triggered when a user highlights text on the displayed document
		It creates a new selection view and annotation model and adds it to the collection */

		// obtain user's text selection
		var selection = document.getSelection(),
		    range = selection.getRangeAt(0);


		// only creates an annotation object if user's text selection length > 1
		if (!range.collapsed) {

			spanWrap = document.createElement('span');
		    spanWrap.className = 'selection uncomplete';
		    range.surroundContents(spanWrap);

			// create Annotation model
			var annotation = new Annotation({
				class: null,
				text: null,
				docId: this.model.id,
			});
			// make EntryForm view's model temporarily the current annotation
			hn.entryForm = new AnnotationEntryForm({model: annotation});
		} 
	},
	removeAnnotation: function(e){
		annotationClass = '.annotation-'+e.attributes._id;
		annotationSpan = $(annotationClass);
		annotationSpan.replaceWith(annotationSpan.html());
		this.save();
	},
	insertAnnotation: function(e) {
		console.log(e);
		$('.uncomplete').append('<a name="'+e.attributes._id+'"></a>');
		$('.uncomplete')[0].className = 'selection annotation-'+e.attributes._id;
		this.save();
	},
	save: function() {
		this.model.set({
			html: this.$el.html()
		});
		this.model.save({html: this.$el.html()});
	},
});