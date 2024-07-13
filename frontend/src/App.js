import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import NewDocument from './pages/NewDocument';
import EditDocument from './pages/EditDocument';
import DocumentDetailPage from './pages/DocumentDetailPage';
import Login from './components/Login';
import { getCurrentUser } from './api/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCurrentUser());
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = getCurrentUser();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleRefreshSidebar = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Router>
      <CssBaseline />
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Box sx={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar refreshKey={refreshKey} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { sm: '240px' } }}>
          <Toolbar />
          <Routes>
            {!isAuthenticated ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<NewDocument onNewDocument={handleRefreshSidebar} />} />
                <Route path="/documents/:id" element={<DocumentDetailPage />} />
                <Route path="/documents/:id/edit" element={<EditDocument onDocumentUpdated={handleRefreshSidebar} />} />
              </>
            )}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
