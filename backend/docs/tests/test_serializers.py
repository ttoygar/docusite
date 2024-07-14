import pytest
from docs.serializers import DocumentSerializer


@pytest.mark.django_db
def test_document_serializer_create(user):
    data = {
        "title": "Test Document",
        "content": "Content",
    }
    serializer = DocumentSerializer(data=data)
    assert serializer.is_valid()
    document = serializer.save(author=user)

    assert document.title == "Test Document"
    assert document.content == "Content"
    assert document.author == user


@pytest.mark.django_db
def test_document_serializer_nested(user, parent_document):
    data = {'title': 'Child Document', 'content': 'Content', 'parent': parent_document.id}
    serializer = DocumentSerializer(data=data)
    assert serializer.is_valid()
    child_document = serializer.save(author=user)
    assert child_document.parent == parent_document


# @pytest.mark.django_db
# def test_document_serializer_update(user):

#     data = {
#         "title": "Updated Document",
#         "content": "Updated Content",
#         "category_ids": [category2.id]
#     }
#     serializer = DocumentSerializer(document, data=data)
#     assert serializer.is_valid()
#     updated_document = serializer.save()

#     assert updated_document.title == "Updated Document"
#     assert updated_document.content == "Updated Content"
#     assert list(updated_document.categories.all()) == [category2]
