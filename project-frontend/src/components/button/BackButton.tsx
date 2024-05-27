import { Button } from "@mui/material"
import { useRouter } from 'next/navigation'

interface Props {
  path: string;
}
  
const BackButton = ({ path }: Props) => {
  const router = useRouter();
  
  return (
    <Button variant="contained" color="inherit" size="large" className="m-2" onClick={() => router.push(path)}>
      戻る
    </Button>
  )
}

export default BackButton;