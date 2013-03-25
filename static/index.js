$(document).ready( function() {

	// define Annotation as a Backbone Model Object
	Annotation = Backbone.Model.extend({
		
		initialize: function(attributes, options) {
			console.log(arguments, attributes, this.attributes);
		}

	});

	// define AnnotationList as a Backbone Collection Object
	AnnotationList = Backbone.Collection.extend({
		model: Annotation
	});

	annotations = new AnnotationList;




	// collect text on document mouseup event
	$(".document").on("mouseup", function(e){
		
		var sel = document.getSelection();
		var rangeObj = sel.getRangeAt(0);


		if (!rangeObj.collapsed) {
			var respText = prompt("Annotate this please :)");

			var annotation = new Annotation({
				selection: sel,
				text: respText,
				rangeObj: rangeObj,
			});

			// add new annotation object to a Collection
			annotations.add([annotation]);

			// There must be a better way to append html... is there an easy templating solution to this? 
			$(".annotations-list").append("<li class=\"annotation\" id=\""+annotation.cid+"\">"+respText+"</li>");
			$("#"+annotation.cid).bind("mouseover", displayAnnotation);
		};
	});

	function displayAnnotation() {
		console.log(this.id);
		var annotation = annotations.get(this.id);
		console.log(annotation.attributes.rangeObj)
	}

	function wrapText(elementId, openTag, closeTag){
		
	}

	$(".annotation").on("mouseover", displayAnnotation);




});




