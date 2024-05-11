import { Button } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type Params = {
  params: {
    onClick: (data: number) => void;
    data: number;
  }
}
  
const DeleteButton = ({ params }: Params) => {
  return (
    <Button
      variant="contained"
      color="error"
      size="medium"
      onClick={() => params.onClick(params.data)}
      className="m-2"
    >
      <DeleteForeverIcon />
    </Button>
  )
}

export default DeleteButton;