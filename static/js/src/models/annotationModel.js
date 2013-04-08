// define Annotation as a Backbone Model Object
var Annotation = Backbone.Model.extend({ 
	sync: function () { return false; }, // not currently hooked up to a server
	removed: false,
	completed: false
});