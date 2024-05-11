import { Button } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility";

type Params = {
  params: {
    onClick: (data: number) => void;
    data: number;
  }
}
  
const EditButton = ({ params }: Params) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={() => params.onClick(params.data)}
      className="m-2"
    >
      <VisibilityIcon />
    </Button>
  )
}

export default EditButton;