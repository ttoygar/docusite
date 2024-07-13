import React from 'react';
import DocumentForm from '../components/DocumentForm';
import { Container, Typography, Paper } from '@mui/material';

const NewDocument = ({ onNewDocument }) => {
  return (
    <Container component={Paper} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        New Document
      </Typography>
      <DocumentForm onNewDocument={onNewDocument} />
    </Container>
  );
};

export default NewDocument;
