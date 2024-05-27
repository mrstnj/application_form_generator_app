import { useTheme } from '@mui/material/styles';
import { Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerHeader from './custom/DrawerHeader';
import Drawer from './custom/Drawer';
import DrawerList from './DrawerList';

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}

export default function CustomDrawer({ open, handleDrawerClose }: Props) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerList handleDrawerClose={handleDrawerClose}/>
    </Drawer>
  );
}
