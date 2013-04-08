var AnnotationListView = Backbone.View.extend({
	// controls the right-side list of annotations

	el: $('.annotations-list'),

	initialize: function(options){
    		_.bindAll(this, 'appendAnnotation');
        _.extend(this, options);
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