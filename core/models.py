from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


CATEGORY_CHOICES = [
    ('health', 'Health'),
    ('career', 'Career'),
    ('fun', 'Fun'),
    ('social', 'Social'),
]


class Decision(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Option(models.Model):
    decision = models.ForeignKey(
        Decision,
        on_delete=models.CASCADE,
        related_name='options',
        db_index=True
    )
    name = models.CharField(max_length=255)

    importance = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    effort = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    fun = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    energy_required = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    time_required = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    class Meta:
        ordering = ['-importance']

    def __str__(self):
        return f"{self.name} - {self.decision_id}"


class WeightConfig(models.Model):
    name = models.CharField(max_length=100, unique=True)

    importance = models.FloatField(default=0.4)
    fun = models.FloatField(default=0.3)
    effort = models.FloatField(default=0.3)

    energy = models.FloatField(default=0.4)
    time = models.FloatField(default=0.3)
    priority = models.FloatField(default=0.3)

    base_weight = models.FloatField(default=0.5)
    context_weight = models.FloatField(default=0.5)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name