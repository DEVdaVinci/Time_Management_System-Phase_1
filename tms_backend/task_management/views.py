from argparse import Action
from multiprocessing import context
import re

from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import *
from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.auth import authenticate, login




def loginPage(request: Request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request=request, username=username, password=password)

    if user is None:
        return Response(status=401)

    login(request, user)
    
    return Response(status=200)

def registerPage(request: HttpResponse):

    context = {}
    return JsonResponse(context, safe=False)
