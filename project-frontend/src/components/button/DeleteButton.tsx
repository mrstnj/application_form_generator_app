import { Button } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  onClick: (data: number) => void;
  data: number;
}
  
const DeleteButton = ({ onClick, data }: Props) => {
  return (
    <Button
      variant="contained"
      color="error"
      size="medium"
      onClick={() => onClick(data)}
      className="m-2"
    >
      <DeleteForeverIcon />
    </Button>
  )
}

export default DeleteButton;