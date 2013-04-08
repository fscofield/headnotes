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