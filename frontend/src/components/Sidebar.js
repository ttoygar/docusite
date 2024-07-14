import React, { useState, useEffect } from 'react';
import { fetchDocuments } from '../api/documents';
import { List, ListItem, ListItemText, Divider, Typography, Drawer, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ refreshKey }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentsData = await fetchDocuments();
        setDocuments(documentsData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [refreshKey]);

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
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
          Documents
        </Typography>
        <List>
          {renderDocuments(documents)}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
