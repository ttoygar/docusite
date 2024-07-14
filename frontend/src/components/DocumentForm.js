import React, { useState } from 'react';
import { createDocument, updateDocument } from '../api/documents';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DocumentForm = ({ document, parentId, onNewDocument, onDocumentUpdated }) => {
  const [title, setTitle] = useState(document ? document.title : '');
  const [content, setContent] = useState(document ? document.content : '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content, parent: parentId || null };
    try {
      if (document) {
        await updateDocument(document.id, payload);
        if (onDocumentUpdated) {
          onDocumentUpdated();
        }
      } else {
        await createDocument(payload);
        if (onNewDocument) {
          onNewDocument();
        }
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save document', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">{document ? 'Edit Document' : 'New Document'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {document ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default DocumentForm;
