import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import '../styles/NavBar.css';

const NavBar = ({ onLogout }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <AppBar position="fixed" className="navbar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" className="title" >
          Documentation
        </Typography>
        <Box>
          <Button className="button" component={Link} to="/">
            Home
          </Button>
          <Button className="button" component={Link} to="/new">
            New Document
          </Button>
          <Button className="button" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
