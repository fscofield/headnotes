from django.contrib import admin
from app.models import Document, Annotation

class DocumentAdmin(admin.ModelAdmin):
    list_display = ['name']
    ordering = ['name']

admin.site.register(Document, DocumentAdmin)

class AnnotationAdmin(admin.ModelAdmin):
    list_display = ['id', 'text', 'doc_id', 'timestamp']
    ordering = ['id']

admin.site.register(Annotation, AnnotationAdmin)