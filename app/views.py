from os import system
# Django modules
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404, redirect, render
from django.template import Context, loader
# project modules
from app.models import *


def index(request):
    document = Document.objects.all()[0]
    annotations = Annotation.objects.filter(document=document)
    
    t = loader.get_template('index.html')
    c = Context({
    	'document': document,
        })
    return HttpResponse(t.render(c))


def test(request):
    t = loader.get_template('test.html')
    c = Context({
        })
    return HttpResponse(t.render(c))