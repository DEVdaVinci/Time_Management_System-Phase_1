from argparse import Action

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *







# Create your views here.
def actions(request):

    actions = Action.objects.all()

    context = {
        "actions": actions,
    }
    return JsonResponse(context)

def action(request):
    id = request.GET.get('id')
    name = request.GET.get('name')

    if id:
        action = Action.objects.get(id=id)
    elif name:
        action = Action.objects.get(name=name)
    else: 
        action = None

    context = {
        "action": action,
        "id": id,
        "name": name,
    }
    return JsonResponse(context)
