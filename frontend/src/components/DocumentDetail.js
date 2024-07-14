import React, { useEffect, useState } from 'react';
import { fetchDocument } from '../api/documents';
import { Container, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import '../styles/DocumentDetail.css';

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [childDocuments, setChildDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await fetchDocument(id);
        setDocument(doc);

        if (doc.children && doc.children.length > 0) {
          const childDocs = await Promise.all(
            doc.children.map(childId => fetchDocument(childId))
          );
          setChildDocuments(childDocs);
        }
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
    <Container className="document-detail">
      <Typography variant="h4" className="title">{document.title}</Typography>
      <Typography variant="body1" className="content">{document.content}</Typography>
      <Button variant="contained" color="primary" component={Link} to={`/documents/${document.id}/edit`} sx={{ mt: 2 }}>
        Edit
      </Button>
      {childDocuments.length > 0 && (
        <div className="sub-documents">
          <Typography variant="h5">Sub-Documents</Typography>
          {childDocuments.map((childDoc) => (
            <Button key={childDoc.id} variant="contained" component={Link} to={`/documents/${childDoc.id}`} className="button">
              {childDoc.title}
            </Button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DocumentDetail;
