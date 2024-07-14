import React, { useState, useEffect } from 'react';
import { createDocument, updateDocument, fetchDocuments } from '../api/documents';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/DocumentForm.css';

const DocumentForm = ({ document, onNewDocument, onDocumentUpdated }) => {
  const [title, setTitle] = useState(document ? document.title : '');
  const [content, setContent] = useState(document ? document.content : '');
  const [parentId, setParentId] = useState(document ? document.parent : '');
  const [documents, setDocuments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docs = await fetchDocuments();
      setDocuments(docs);
    };
    fetchData();
  }, []);

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
    <Container className="document-form">
      <Typography variant="h4">{document ? 'Edit Document' : 'New Document'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          className="field"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          className="field"
        />
        <FormControl fullWidth margin="normal" className="field">
          <InputLabel>Parent Document</InputLabel>
          <Select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {documents.map(doc => (
              <MenuItem key={doc.id} value={doc.id}>{doc.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className="button">
          {document ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default DocumentForm;
