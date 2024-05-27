import { Button } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  onClick: (data: number) => void;
  data: number;
}
  
const EditButton = ({ onClick, data }: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={() => onClick(data)}
      className="m-2"
    >
      <VisibilityIcon />
    </Button>
  )
}

export default EditButton;