from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
]
