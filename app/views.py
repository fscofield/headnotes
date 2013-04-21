from os import system
# Django modules
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404, redirect, render
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie, csrf_protect
from django.template import Context, loader
# project modules
from app.models import *
import json


def index(request):
    
    t = loader.get_template('index.html')
    c = Context({
        })
    return HttpResponse(t.render(c))

# @ensure_csrf_cookie
@requires_csrf_token
def documentApi(request, document_id):
    document = Document.objects.get(id=document_id)
    if request.method == "PUT":
        document.html = json.loads(request.body)['html']
        document.save()
        return HttpResponse()

    elif request.method == "GET":
        response_data = {
            'html': document.html,
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@requires_csrf_token
def collectionApi(request, collection_id):
    print "hello!"
    if request.method == "PUT":
        annotations = Annotation.objects.get(collection_id=collection_id)
        return HttpResponse()
    elif request.method == "GET":
        annotations = Annotation.objects.filter(doc_id=collection_id)
        response_data = []
        for annotation in annotations:
            response_data.append({
                '_id' : annotation.id,
                'text' : annotation.text
                })
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@requires_csrf_token
def annotationApi(request, annotation_id = None): 
    if request.method == "POST":
        json_annotation= json.loads(request.body)
        new_annotation = Annotation(
            text =  json_annotation['text'],
            doc_id = json_annotation['docId'],
            )
        new_annotation.save()
        response_data = {
            'id' : new_annotation.id,
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


    if request.method == "GET":
        annotations = Annotation.objects.filter(id=annotation_id)
        response_data = []
        for annotation in annotations:
            response_data.append({
                'id' : annotation.id,
                'cid' : annotation.collection_id,
                'text' : annotation.text
                })
        return HttpResponse(json.dumps(response_data), content_type="application/json")

    if request.method == "DELETE":
        annotation = Annotation.objects.get(id=annotation_id)
        annotation.delete()
        return HttpResponse()

