from rest_framework import viewsets
from .models import *
from .serializers import *


'''
=====================================================================================================================================
[viewsets.py]
'''

class ReadWriteModelViewSet(viewsets.ModelViewSet):
    read_serializer_class = None
    write_serializer_class = None

    def get_serializer_class(self):
        writeActions = [
            "create",
            "update",
            "partial_update",
        ]
        if self.action in writeActions:
            return self.write_serializer_class
        else:
            return self.read_serializer_class



class CategoryViewSet(ReadWriteModelViewSet):
    queryset = Category.objects.all()
    read_serializer_class = CategoryReadSerializer
    write_serializer_class = CategoryWriteSerializer



class TagViewSet(ReadWriteModelViewSet):
    queryset = Tag.objects.all()
    read_serializer_class = TagReadSerializer
    write_serializer_class = TagWriteSerializer


class ActionViewSet(ReadWriteModelViewSet):
    queryset = Action.objects.all()
    read_serializer_class = ActionReadSerializer
    write_serializer_class = ActionWriteSerializer



class ActivityViewSet(ReadWriteModelViewSet):
    queryset = Activity.objects.all()
    read_serializer_class = ActivityReadSerializer
    write_serializer_class = ActivityWriteSerializer



class TaskViewSet(ReadWriteModelViewSet):
    queryset = Task.objects.all()
    read_serializer_class = TaskReadSerializer
    write_serializer_class = TaskWriteSerializer

