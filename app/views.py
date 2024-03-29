from os import system
# Django modules
from django.core.context_processors import csrf
from django.shortcuts import render_to_response, HttpResponse, get_object_or_404, redirect, render
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.template import Context, loader
from django.core import serializers
# project modules
from app.models import *
import json


def index(request):
    
    t = loader.get_template('index.html')
    annotations = Annotation.objects.filter(doc_id=1)
    document = Document.objects.get(id=1)
    resp_data = []
    for annotation in annotations:
        resp_data.append({
            '_id' : annotation.id,
            'text': annotation.text,
            })
    c = Context({
            'annotations' : json.dumps(resp_data),
            'doc' : document,
        })
    c.update(csrf(request))
    return HttpResponse(t.render(c))

@ensure_csrf_cookie
@csrf_exempt
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


@csrf_exempt
def collectionApi(request, collection_id):
    print "hello!"
    if request.method == "PUT":
        annotations = Annotation.objects.filter(doc_id=collection_id)
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


@csrf_exempt
def annotationApi(request, annotation_id = None): 
    if request.method == "POST":
        json_annotation= json.loads(request.body)
        new_annotation = Annotation(
            text =  json_annotation['text'],
            doc_id = json_annotation['docId'],
            )
        new_annotation.save()
        response_data = {
            '_id' : new_annotation.id,
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

