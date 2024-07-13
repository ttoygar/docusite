import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from docs.models import Category, Document


@pytest.mark.django_db
def test_create_document_api():
    client = APIClient()
    user = User.objects.create_user(username="testuser", password="password")
    client.force_authenticate(user=user)

    category = Category.objects.create(name="Test Category")

    response = client.post("/api/documents/", {
        "title": "Test Document",
        "content": "Content",
        "category_ids": [category.id]
    }, format='json')

    assert response.status_code == 201


@pytest.mark.django_db
def test_get_documents_api():
    client = APIClient()
    user = User.objects.create_user(username="testuser", password="password")
    client.force_authenticate(user=user)

    Document.objects.create(title="Test Document", content="Content", author=user)

    response = client.get("/api/documents/")

    assert response.status_code == 200
