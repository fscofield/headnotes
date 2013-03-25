from os import system
# Django modules
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404, redirect, render
from django.template import Context, loader
# project modules
from app.models import *


def index(request):
    document = Document.objects.all()[0]
    annotations = Annotation.objects.filter(document=document)
    
    t = loader.get_template('document.html')
    c = Context({
        'document' : document,
        'annotations' : annotations,
        })
    return HttpResponse(t.render(c))