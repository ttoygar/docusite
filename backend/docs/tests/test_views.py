import pytest


@pytest.mark.django_db
def test_create_document_api(api_client):
    response = api_client.post('/api/documents/', {
        'title': 'Parent Document',
        'content': 'Content'
    }, format='json')
    assert response.status_code == 201


@pytest.mark.django_db
def test_create_nested_document_api(api_client, parent_document):
    response = api_client.post('/api/documents/', {
        'title': 'Child Document',
        'content': 'Content',
        'parent': parent_document.id
    }, format='json')
    assert response.status_code == 201


@pytest.mark.django_db
def test_get_documents_api(api_client, parent_document, child_document):
    response = api_client.get(f'/api/documents/{parent_document.id}/')
    assert response.status_code == 200
    assert len(response.data['children']) == 1
