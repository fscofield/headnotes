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
            num = i+1;
        self.$el.append( 
          '<li class="annotation text-'+id+'"><a href="#'+id+'"><span class="count">'+num+'</span></a>'
          +'<div class="text">'+el.get('text')
          +'<a class="delete" id="delete-'+id+'">'
          +'<i class="icon-trash"></i></a>'
          +'</div></li>');
    });
  },
  focusAnnotation: function(e){
    var id = e.currentTarget.className.split('-')[1];
    $('#delete-'+id).show();
    $('.annotation-'+id).css("text-decoration", "underline");
  },
  unfocusAnnotation: function(e){
    var id = e.currentTarget.className.split('-')[1];
    $('#delete-'+id).hide();
    $('.annotation-'+id).css("text-decoration", "none");
  },
  deleteAnnotation: function(e){
    var id = e.currentTarget.id.split('-')[1];
    var model = this.collection.get(id);
    model.destroy();
  },
});