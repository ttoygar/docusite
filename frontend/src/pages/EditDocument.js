import React, { useEffect, useState } from 'react';
import DocumentForm from '../components/DocumentForm';
import { fetchDocument } from '../api/documents';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const EditDocument = ({ onDocumentUpdated }) => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await fetchDocument(id);
        setDocument(doc);
      } catch (error) {
        console.error('Failed to fetch document', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container component={Paper} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Document
      </Typography>
      {document && <DocumentForm document={document} onDocumentUpdated={onDocumentUpdated} />}
    </Container>
  );
};

export default EditDocument;
