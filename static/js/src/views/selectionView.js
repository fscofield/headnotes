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