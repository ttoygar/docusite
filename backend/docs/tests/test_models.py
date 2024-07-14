import pytest
from docs.models import Document


@pytest.mark.django_db
def test_create_document(user):
    document = Document.objects.create(title="Test Document", content="Content", author=user)
    assert document.title == "Test Document"
    assert document.content == "Content"
    assert document.author == user


@pytest.mark.django_db
def test_create_nested_document(user, parent_document):
    child_document = Document.objects.create(
        title="Child Document",
        content='Content',
        author=user,
        parent=parent_document)
    assert child_document.parent == parent_document
