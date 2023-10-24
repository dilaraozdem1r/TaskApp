import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListAltIcon from '@mui/icons-material/ListAlt';


function Navbar() {
 
  return (
    <AppBar position="static">
      <Toolbar>
        <ListAltIcon/>
        <Typography variant="h6" style={{marginRight:'15px'}}>TO_DO_APP</Typography>
        <Button color="inherit">Home Page</Button>
        <Button color="inherit">Add Item</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
