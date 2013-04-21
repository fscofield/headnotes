//define a collection to store Annotation Models
var AnnotationCollection = Backbone.Collection.extend({
	model: Annotation,
	url: '/annotation-collection/1',
});