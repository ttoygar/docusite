from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Document
        fields = ['id', 'title', 'content', 'author', 'parent', 'children', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']

    def get_children(self, obj):
        return DocumentSerializer(obj.children.all(), many=True).data
