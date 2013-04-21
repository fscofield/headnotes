var AnnotationListView = Backbone.View.extend({
	// controls the right-side list of annotations

	el: $('.annotations-list'),

  events: {
    'click .delete': 'deleteAnnotation',
  },

	initialize: function(options){
      _.extend(this, options);
  		_.bindAll(this, 'render', 'deleteAnnotation');
      this.listenTo(this.collection,'add', this.render);
      this.collection.bind('remove', this.render);
      this.render();
  },
  render: function(){
    var self = this;
    self.$el.html('');
    _.each(this.collection.models, function(el, i){
        var aid = el.id || el.get('id');
        self.$el.append( // what is this here?
          '<li class="annotation"><span>'+el.get('text')+'</span>'
          +'<button class="btn delete" id="delete-'+aid+'" style="margin-left: 10px;">'
          +'<i class="icon-trash"></i></button></li>');
    });
  },

  deleteAnnotation: function(e){
    var id = e.currentTarget.id.slice(-2)
    var model = this.collection.get(id);
    model.destroy();
  },
});