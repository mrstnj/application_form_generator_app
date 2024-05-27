import { Button } from "@mui/material"
  
interface Props {
  action_letter: string;
}

const SubmitButton = ({ action_letter }: Props) => {
  return (
    <Button variant="contained" color="primary" size="large" type="submit" className="m-2">
      {action_letter}
    </Button>
  )
}

export default SubmitButton;