import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchDocuments } from '../api/documents';
import { List, ListItem, ListItemText, Divider, Typography, Drawer, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ refreshKey }) => {
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const documentsData = await fetchDocuments();
        setCategories(categoriesData);
        setDocuments(documentsData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [refreshKey]);

  const getDocumentsByCategory = (categoryId) => {
    return documents.filter((document) =>
      document.categories.some((category) => category.id === categoryId)
    );
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
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <div key={category.id}>
              <ListItem>
                <ListItemText primary={category.name} />
              </ListItem>
              {getDocumentsByCategory(category.id).map((document) => (
                <ListItem
                  button
                  component={Link}
                  to={`/documents/${document.id}`}
                  key={document.id}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={document.title} />
                </ListItem>
              ))}
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
