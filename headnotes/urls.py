from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^admin/', include(admin.site.urls)),
	url(r'^document/(?P<document_id>[0-9]+)', 'app.views.documentApi'),
	url(r'^annotation-collection/(?P<collection_id>[0-9]+)', 'app.views.collectionApi'),
	url(r'^annotation$', 'app.views.annotationApi'),
	url(r'^annotation/(?P<annotation_id>[0-9]+)', 'app.views.annotationApi'),
	url(r'', 'app.views.index'),
)
