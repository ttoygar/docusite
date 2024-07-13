import React from 'react';
import DocumentList from '../components/DocumentList';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <DocumentList />
    </Container>
  );
};

export default Home;
