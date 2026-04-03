from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DecisionViewSet, OptionViewSet

router = DefaultRouter()
router.register(r'decisions', DecisionViewSet, basename='decision')
router.register(r'options', OptionViewSet, basename='option')

urlpatterns = [
    path('', include(router.urls)),
]