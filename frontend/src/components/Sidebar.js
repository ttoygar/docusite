import React, { useState, useEffect } from 'react';
import { fetchDocuments } from '../api/documents';
import { List, ListItem, ListItemText, Typography, Drawer, Box, IconButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Sidebar = ({ refreshKey }) => {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState({}); // Store open/close state of documents

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

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const renderDocuments = (docs, parentId = null, level = 0) => {
    return docs
      .filter(doc => doc.parent === parentId)
      .map(doc => (
        <React.Fragment key={doc.id}>
          <ListItem button component={Link} to={`/documents/${doc.id}`} sx={{ pl: level * 2 }}>
            <Box display="flex" alignItems="center">
              {docs.some(child => child.parent === doc.id) && (
                <IconButton onClick={() => handleToggle(doc.id)}>
                  {open[doc.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
              <ListItemText primary={doc.title} />
            </Box>
          </ListItem>
          {open[doc.id] && renderDocuments(docs, doc.id, level + 1)}
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
