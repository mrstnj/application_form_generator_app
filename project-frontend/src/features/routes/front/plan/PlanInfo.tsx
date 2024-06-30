import {
  Box,
  Divider,
  Typography
} from '@mui/material';

type Plan = {
  name: string;
  content: string;
  img: string;
}

interface Props {
  plan: Plan;
}

const PlanInfo = ({ plan }: Props) => {  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {plan.name}
      </Typography>
      <Divider/>
      <Typography variant="body2" gutterBottom className='pt-5'>
        {plan.content}
      </Typography>
    </Box>
  );
};

export default PlanInfo;