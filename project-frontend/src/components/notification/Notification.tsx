import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Valiant = 'success' | 'warning' | 'error' | 'info';

type Params = {
  params: {
    handleClose: () => void;
    notification: {
      open: boolean;
      message: string;
      valiant: Valiant;
    };
  }
}

const Notification = ({ params }: Params) => {
  const { handleClose, notification } = params;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={notification.valiant}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification;