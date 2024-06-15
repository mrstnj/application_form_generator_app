import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CustomAppBar() {

  return (
    <AppBar position="static" className="bg-green-500">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit">ログイン</Button>
      </Toolbar>
    </AppBar>
  );
}
