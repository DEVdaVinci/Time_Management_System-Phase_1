from uuid import UUID

from django.db import models
import uuid
from django.core.exceptions import ValidationError


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    superior = models.ForeignKey("self", on_delete=models.PROTECT, related_name="subordinates")
    superiors_additional = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="subordinates_additional")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    is_root = models.BooleanField(default=False)
    

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=(
                    models.Q(is_root=True, superior__isnull=True)
                    | models.Q(is_root=False, superior__isnull=False)
                ),
                name="category_root_or_has_superior",
                violation_error_message=(
                    "A non-root category must have a superior."
                ),
            ),
        ]

    def clean(self):
        super().clean()

        if not self.is_root and self.superior_id is None:
            raise ValidationError({
                "superior": "A non-root category must have a superior."
            })
        elif self.is_root and self.superior_id is not None:
            raise ValidationError({
                "superior": "A root category must NOT have a superior."
            })


        if self.pk is not None and self.superior_id == self.pk:
            raise ValidationError({
                "superior": "A category cannot be its own superior."
            })

    def __str__(self):
        return self.name


    
    
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    superiors = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="subordinates")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    


class Action (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="actions")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="actions_additional")
    tags = models.ManyToManyField(Tag, blank=True)
    
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)

    actions = models.ManyToManyField(Action)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="activities")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="activities_additional")
    tags = models.ManyToManyField(Tag, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    




class Task(models.Model):
    STATUS = (
        ("NOT_STARTED", "Not Started"),
        ("IN_PROGRESS", "In Progress"),
        ("PAUSED", "Paused"),
        ("BLOCKED", "Blocked"),
        ("COMPLETED", "Completed"),
        ("CANCELED", "Canceled"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    #user = models.OneToOneField()

    activity = models.ForeignKey(Activity, on_delete=models.PROTECT)
    additional_actions = models.ManyToManyField(Action, blank=True)
    status = models.CharField(choices=STATUS, max_length=25, default="NOT_STARTED")
    

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="tasks")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="tasks_additional")
    tags = models.ManyToManyField(Tag, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


'''
class classTemplate(models.Model):
    VAR_NAME = (
        (0, "None"),
        (1, "Minimal"),
        (2, "Very Low"),
        (3, "Low"),

        (4, "Low-Medium"),
        (5, "Medium"),
        (6, "Medium-High"),

        (7, "High"),
        (8, "Very High"),
        (9, "Critical"),
        (10, "Maximum"),
    )
    PRIORITY = (
            (0, "None"),
            (1, "Minimal"),
            (2, "Very Low"),
            (3, "Low"),
    
            (4, "Low-Medium"),
            (5, "Medium"),
            (6, "Medium-High"),
    
            (7, "High"),
            (8, "Very High"),
            (9, "Critical"),
            (10, "Maximum"),
        )
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    categories_additional = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



    connection_manyToOne = models.ForeignKey(className, on_delete=models.PROTECT)
    connection_manyToMany = models.ManyToManyField(className)
    var_name = models.CharField(choices=VAR_NAME, max_length=100)
    priority = models.IntegerFieldField(choices=PRIORITY, max_length=100)
    
''' 
    