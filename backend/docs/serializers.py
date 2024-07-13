from rest_framework import serializers
from .models import Document, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class DocumentSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Category.objects.all(),
        source='categories'
    )

    class Meta:
        model = Document
        fields = ['id', 'title', 'content', 'author', 'categories', 'category_ids', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']

    def create(self, validated_data):
        categories = validated_data.pop('categories')
        document = Document.objects.create(**validated_data)
        document.categories.set(categories)
        return document

    def update(self, instance, validated_data):
        categories = validated_data.pop('categories')
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        instance.categories.set(categories)
        return instance
