import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from docs.models import Document, Category


@pytest.mark.django_db
def test_create_document_api():
    client = APIClient()
    _ = User.objects.create_user(username="testuser", password="password")
    client.login(username="testuser", password="password")

    category = Category.objects.create(name="Test Category")

    response = client.post("/api/documents/", {
        "title": "Test Document",
        "content": "Content",
        "category_ids": [category.id]
    }, format='json')

    assert response.status_code == 201
    assert response.data["title"] == "Test Document"
    assert response.data["content"] == "Content"


@pytest.mark.django_db
def test_get_documents_api():
    client = APIClient()
    user = User.objects.create_user(username="testuser", password="password")
    client.login(username="testuser", password="password")

    _ = Document.objects.create(title="Test Document", content="Content", author=user)

    response = client.get("/api/documents/")

    assert response.status_code == 200
    assert response.data[0]["title"] == "Test Document"
    assert response.data[0]["content"] == "Content"
