from django.contrib import admin
from app.models import Document

class DocumentAdmin(admin.ModelAdmin):
    list_display = ['name']
    ordering = ['name']

admin.site.register(Document, DocumentAdmin)