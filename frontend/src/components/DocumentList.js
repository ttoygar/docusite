import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../api/documents';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docs = await fetchDocuments();
      setDocuments(docs);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Documents</Typography>
      <List>
        {documents.map((document) => (
          <ListItem button component={Link} to={`/documents/${document.id}`} key={document.id}>
            <ListItemText primary={document.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DocumentList;
