import { Button } from "@mui/material"
  
type Params = {
  params: {
    action_letter: string;
  }
}

const SubmitButton = ({ params }: Params) => {
  return (
    <Button variant="contained" color="primary" size="large" type="submit" className="m-2">
      {params.action_letter}
    </Button>
  )
}

export default SubmitButton;