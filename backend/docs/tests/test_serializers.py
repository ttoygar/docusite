import pytest
from django.contrib.auth.models import User
from docs.models import Document, Category
from docs.serializers import DocumentSerializer


@pytest.mark.django_db
def test_document_serializer_create():
    user = User.objects.create_user(username="testuser", password="password")
    category1 = Category.objects.create(name="Category 1")
    category2 = Category.objects.create(name="Category 2")

    data = {
        "title": "Test Document",
        "content": "Content",
        "author": user.id,
        "category_ids": [category1.id, category2.id]
    }
    serializer = DocumentSerializer(data=data)
    assert serializer.is_valid()
    document = serializer.save(author=user)

    assert document.title == "Test Document"
    assert document.content == "Content"
    assert document.author == user
    assert list(document.categories.all()) == [category1, category2]


@pytest.mark.django_db
def test_document_serializer_update():
    user = User.objects.create_user(username="testuser", password="password")
    category1 = Category.objects.create(name="Category 1")
    category2 = Category.objects.create(name="Category 2")
    document = Document.objects.create(title="Test Document", content="Content", author=user)
    document.categories.set([category1])

    data = {
        "title": "Updated Document",
        "content": "Updated Content",
        "category_ids": [category2.id]
    }
    serializer = DocumentSerializer(document, data=data)
    assert serializer.is_valid()
    updated_document = serializer.save()

    assert updated_document.title == "Updated Document"
    assert updated_document.content == "Updated Content"
    assert list(updated_document.categories.all()) == [category2]
