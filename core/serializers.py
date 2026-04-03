from rest_framework import serializers
from .models import Decision, Option


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        exclude = ['decision']


class DecisionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Decision
        fields = ['id', 'title', 'description', 'created_at', 'options']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        decision = Decision.objects.create(**validated_data)

        for option_data in options_data:
            Option.objects.create(decision=decision, **option_data)

        return decision


class EvaluationSerializer(serializers.Serializer):
    energy = serializers.IntegerField(min_value=1, max_value=10)
    time_available = serializers.IntegerField(min_value=1, max_value=10)
    priority = serializers.ChoiceField(choices=[
        'health', 'career', 'fun', 'social'
    ])

    # Base weights
    importance_weight = serializers.FloatField(required=False, min_value=0)
    fun_weight = serializers.FloatField(required=False, min_value=0)
    effort_weight = serializers.FloatField(required=False, min_value=0)

    # Context weights
    energy_weight = serializers.FloatField(required=False, min_value=0)
    time_weight = serializers.FloatField(required=False, min_value=0)
    priority_weight = serializers.FloatField(required=False, min_value=0)

    def validate(self, data):
        base_weights = [
            data.get('importance_weight'),
            data.get('fun_weight'),
            data.get('effort_weight')
        ]

        context_weights = [
            data.get('energy_weight'),
            data.get('time_weight'),
            data.get('priority_weight')
        ]

        # Either ALL or NONE
        if any(base_weights) and not all(base_weights):
            raise serializers.ValidationError(
                "Provide all base weights or none"
            )

        if any(context_weights) and not all(context_weights):
            raise serializers.ValidationError(
                "Provide all context weights or none"
            )

        return data