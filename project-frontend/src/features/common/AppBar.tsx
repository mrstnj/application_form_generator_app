import { Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from './custom/AppBar'

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function CustomAppBar({ open, handleDrawerOpen }: Props) {

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
