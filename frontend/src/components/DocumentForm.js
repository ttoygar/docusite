import React, { useState, useEffect } from 'react';
import { createDocument, updateDocument, fetchCategories } from '../api/documents';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DocumentForm = ({ document, onNewDocument, onDocumentUpdated }) => {
  const [title, setTitle] = useState(document ? document.title : '');
  const [content, setContent] = useState(document ? document.content : '');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(document ? document.categories.map(c => c.id) : []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content, category_ids: selectedCategories };
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categories</InputLabel>
          <Select
            labelId="category-label"
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {document ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default DocumentForm;
