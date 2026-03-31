from rest_framework import serializers
from . models import Decision, Option, Category


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        exclude = ['decision']
    
class DecisionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Decision
        fields = ['id', 'title', 'description', 'created_at', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        decision = Decision.objects.create(**validated_data)

        for option_data in options_data:
            Option.objects.create(decision=decision, **option_data)

        return decision
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class EvaluationSerializer(serializers.Serializer):
    energy = serializers.IntegerField(min_value=1, max_value=10)
    mood = serializers.CharField()
    time_available = serializers.IntegerField(min_value=1, max_value=10)
    priority = serializers.ChoiceField(choices=[
        'health', 'career', 'fun', 'social'
    ])

