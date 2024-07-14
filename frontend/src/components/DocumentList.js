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

  const renderDocuments = (docs, parentId = null) => {
    return docs
      .filter(doc => doc.parent === parentId)
      .map(doc => (
        <React.Fragment key={doc.id}>
          <ListItem button component={Link} to={`/documents/${doc.id}`}>
            <ListItemText primary={doc.title} />
          </ListItem>
          {renderDocuments(docs, doc.id)}
        </React.Fragment>
      ));
  };

  return (
    <Container>
      <Typography variant="h4">Documents</Typography>
      <List>
        {renderDocuments(documents)}
      </List>
    </Container>
  );
};

export default DocumentList;
