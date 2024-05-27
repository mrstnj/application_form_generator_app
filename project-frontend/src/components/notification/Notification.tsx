import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Valiant = 'success' | 'warning' | 'error' | 'info';

interface Props {
  handleClose: () => void;
  notification: {
    open: boolean;
    message: string;
    valiant: Valiant;
  };
}

const Notification = ({ handleClose, notification }: Props) => {

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