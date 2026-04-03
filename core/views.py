from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Option, Decision, WeightConfig
from .serializers import OptionSerializer, DecisionSerializer, EvaluationSerializer
from .utils import rank_options, normalize


class DecisionViewSet(ModelViewSet):
    queryset = Decision.objects.all()
    serializer_class = DecisionSerializer

    @action(detail=True, methods=['post'], url_path='evaluate')
    def evaluate(self, request, pk=None):
        decision = self.get_object()

        if not decision.options.exists():
            return Response(
                {"error": "No options available"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = EvaluationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user_data = {
            "energy": data['energy'],
            "time_available": data['time_available'],
            "priority": data['priority']
        }

        custom_weights_provided = all(
            data.get(field) is not None for field in [
                'importance_weight',
                'fun_weight',
                'effort_weight',
                'energy_weight',
                'time_weight',
                'priority_weight',
            ]
        )

        # 🔹 Handle weights
        if custom_weights_provided:
            base_weights = normalize([
                data['importance_weight'],
                data['fun_weight'],
                data['effort_weight']
            ])

            context_weights = normalize([
                data['energy_weight'],
                data['time_weight'],
                data['priority_weight']
            ])

            final_weights = [0.5, 0.5]

        else:
            weights = WeightConfig.objects.order_by('-created_at').first()

            if not weights:
                return Response(
                    {"error": "No weight configuration found"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            base_weights = normalize([
                weights.importance,
                weights.fun,
                weights.effort
            ])

            context_weights = normalize([
                weights.energy,
                weights.time,
                weights.priority
            ])

            final_weights = [
                weights.base_weight,
                weights.context_weight
            ]

        weights_tuple = (base_weights, context_weights, final_weights)

        ranked = rank_options(decision, user_data, weights_tuple)

        return Response({
            "decision": decision.title,
            "best_option": ranked[0],
            "all_options": ranked
        })


class OptionViewSet(ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer