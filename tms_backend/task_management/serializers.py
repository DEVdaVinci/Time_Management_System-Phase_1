from dataclasses import fields

from rest_framework import serializers

from .models import *



#depth is automatically set to 0 so it doesn't need to be explicitly set for write serializers
#depth determines how many levels deep connections are resolved
    #instead of representing an object represented by a connection as an id you can extract the whole object
    #This can be very recursive because objects can have connections to other objects which also have connections to other objects.
    # Depth determines how many levels or links in a chain of connection are resolved into entire objects instead of id's
    # Depth 0: all connections are represented by ids
    # Depth 1: The connections of the main object (i.e. the object targeted by the serializer) are resolved into whole objects, however if those objects from the connections also have connections of their own they are represented by ids 


'''
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


    def validate(self, attributes):
        is_root = attributes.get(
            "is_root",
            getattr(self.instance, "is_root", False),
        )
        superior = attributes.get(
            "superior",
            getattr(self.instance, "superior", None),
        )
        if is_root and superior is not None:
            raise serializers.ValidationError({
                "superior": "A root category must not have a superior."
            })
        if not is_root and superior is None:
            raise serializers.ValidationError({
                "superior": "A non-root category must have a superior."
            })
        if (self.instance is not None
            and superior is not None
            and superior.pk == self.instance.pk):
            raise serializers.ValidationError({
                "superior": "A category cannot be its own superior."
            })
        return attributes
'''


'''
=====================================================================================================================================
[serializers.py]
'''
class CategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        depth = 1

class CategoryWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

        





class TagReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
        depth = 1
class TagWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class ActionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"
        depth = 1
class ActionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"



class ActivityReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
        depth = 1
class ActivityWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"



class TaskReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        depth = 1
class TaskWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
