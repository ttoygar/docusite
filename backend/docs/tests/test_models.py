import pytest
from django.contrib.auth.models import User
from docs.models import Document, Category


@pytest.mark.django_db
def test_create_category():
    category = Category.objects.create(name="Test Category")
    assert category.name == "Test Category"


@pytest.mark.django_db
def test_create_document():
    user = User.objects.create_user(username="testuser", password="password")
    document = Document.objects.create(title="Test Document", content="Content", author=user)
    assert document.title == "Test Document"
    assert document.content == "Content"
    assert document.author == user
