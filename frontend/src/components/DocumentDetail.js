import React, { useEffect, useState } from 'react';
import { fetchDocument } from '../api/documents';
import { Container, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const DocumentDetail = () => {
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

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">{document.title}</Typography>
      <Typography variant="body1">{document.content}</Typography>
      <Button variant="contained" color="primary" component={Link} to={`/documents/${document.id}/edit`} sx={{ mt: 2 }}>
        Edit
      </Button>
      {document.children && document.children.length > 0 && (
        <div>
          <Typography variant="h5" sx={{ mt: 4 }}>Sub-Documents</Typography>
          {document.children.map((childId) => (
            <Button key={childId} variant="contained" component={Link} to={`/documents/${childId}`} sx={{ mt: 1, ml: 1 }}>
              {childId}
            </Button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DocumentDetail;
