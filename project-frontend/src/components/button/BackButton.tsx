import { Button } from "@mui/material"
import { useRouter } from 'next/navigation'

type Params = {
  params: {
    path: string;
  }
}
  
const BackButton = ({ params }: Params) => {
  const router = useRouter();
  
  return (
    <Button variant="contained" color="inherit" size="large" className="m-2" onClick={() => router.push(params.path)}>
      戻る
    </Button>
  )
}

export default BackButton;