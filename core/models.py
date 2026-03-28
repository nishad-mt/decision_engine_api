from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator

CATEGORY_CHOICES = [
    ('health', 'Health'),
    ('career', 'Career'),
    ('fun', 'Fun'),
    ('social', 'Social'),
]

PRIORITY_CHOICES = [
    ('health', 'Health'),
    ('career', 'Career'),
    ('fun', 'Fun'),
    ('social', 'Social'),
]

class Decision(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Option(models.Model):
    decision = models.ForeignKey(Decision,on_delete=models.CASCADE,related_name='options')
    name = models.CharField(max_length=255)

    # scoring

    importance = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    effort = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    fun = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    energy_required = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    time_required = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )

    catergory = models.CharField(max_length=20,choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.name},{self.decision.title}"

class Category(models.Model):
    energy = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    mood = models.CharField(max_length=255)
    time_available = models.IntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(10)]
    )
    priotiry = models.CharField(max_length=200,choices=PRIORITY_CHOICES)

    def __str__(self):
        return f"Energy: {self.energy}, priority: {self.priotiry}"


