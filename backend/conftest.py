import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from docs.models import Document


@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='password')


@pytest.fixture
def api_client(user):
    client = APIClient()
    # client.login(username='testuser', password='password')
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def parent_document(user):
    return Document.objects.create(title='Parent Document', content='Content', author=user)


@pytest.fixture
def child_document(user, parent_document):
    return Document.objects.create(title='Child Document', content='Content', author=user, parent=parent_document)
