import { useTheme } from '@mui/material/styles';
import { Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerHeader from './custom/DrawerHeader';
import Drawer from './custom/Drawer';
import DrawerList from './DrawerList';

type Params = {
  params: {
    open: boolean;
    handleDrawerClose: () => void;
  }
}

export default function CustomDrawer({ params }: Params) {
  const { open, handleDrawerClose } = params;
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
