(function ($) {
	var annColl = new AnnotationCollection();
	// define window object, allowing resetting of annotation entry inside other functions
	// not entirely sure if global is necessary here. 
	// would "var entryForm" be sufficient? See below (line 187).
	EntryForm = new AnnotationEntryForm;
	var listview = new AnnotationListView({collection: annColl});
	var docview = new DocumentView({collection: annColl});
})(jQuery);




