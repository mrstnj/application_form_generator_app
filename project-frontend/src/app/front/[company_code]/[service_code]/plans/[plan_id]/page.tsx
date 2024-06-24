import {
  Paper,
} from '@mui/material';
import PlanInfo from '@/features/routes/front/plan/PlanInfo'

interface Props {
  params: {
    plan_id: number;
  }
}

const PlanForm = async({ params }: Props) => {
  const plan = await fetch(`${process.env.API_BASE_URL}/plans/${params.plan_id}`, {cache: 'no-store'}).then((res) => res.json())
  
  return (
    <div>
      <Paper elevation={3} className='m-5'>
        <PlanInfo plan={plan} />
      </Paper>
    </div>
  );
};

export default PlanForm;