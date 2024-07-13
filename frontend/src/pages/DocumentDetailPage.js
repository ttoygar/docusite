import React from 'react';
import DocumentDetail from '../components/DocumentDetail';
import { Container, Typography, Paper } from '@mui/material';

const DocumentDetailPage = () => {
  return (
    <Container component={Paper} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Document Detail
      </Typography>
      <DocumentDetail />
    </Container>
  );
};

export default DocumentDetailPage;
