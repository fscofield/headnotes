(function ($) {
	hn.collection = new AnnotationCollection();
	hn.listView = new AnnotationListView({collection: hn.annColl});
	hn.docView = new DocumentView({collection: hn.annColl});
})(jQuery);




