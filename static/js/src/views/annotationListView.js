var AnnotationListView = Backbone.View.extend({
	// controls the right-side list of annotations

	el: $('.annotations-list'),

  events: {
    'click .delete': 'deleteAnnotation',
    'mouseover .annotation': 'focusAnnotation',
    'mouseout .annotation': 'unfocusAnnotation',
  },

	initialize: function(options){
      _.extend(this, options);
  		_.bindAll(this, 'render', 'deleteAnnotation', 'focusAnnotation', 'unfocusAnnotation');
      this.listenTo(this.collection,'add', this.render);
      this.collection.bind('remove', this.render);
      this.render();
  },
  render: function(){
    var self = this;
    self.$el.html('');
    _.each(this.collection.models, function(el, i){
        var id = el.id || el.get('id');
        self.$el.append( // what is this here?
          '<li class="annotation text-'+id+'"><span>'+el.get('text')+'</span>'
          +'<button class="btn delete" id="delete-'+id+'" style="margin-left: 10px;">'
          +'<i class="icon-trash"></i></button></li>');
    });
  },
  focusAnnotation: function(e){
    var id = e.currentTarget.className.split('-')[1];
    $('.annotation-'+id).css("text-decoration", "underline");
  },
  unfocusAnnotation: function(e){
    var id = e.currentTarget.className.split('-')[1];
    $('.annotation-'+id).css("text-decoration", "none");
  },
  deleteAnnotation: function(e){
    var id = e.currentTarget.id.split('-')[1];
    var model = this.collection.get(id);
    model.destroy();
  },
});