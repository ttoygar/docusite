import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are not authorized to view this page. Please log in again.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Go to Login
      </Button>
    </Container>
  );
};

export default ErrorPage;
