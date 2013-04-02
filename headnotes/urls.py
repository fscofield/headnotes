from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^admin/', include(admin.site.urls)),
	url(r'^annotation/add/', 'app.views.add_annotation'),
	url(r'', 'app.views.index'),
)
