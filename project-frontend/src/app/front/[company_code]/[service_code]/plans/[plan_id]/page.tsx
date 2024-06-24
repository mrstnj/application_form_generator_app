import {
  Paper,
} from '@mui/material';
import PlanInfo from '@/features/routes/front/plan/PlanInfo'
import PlanForm from '@/features/routes/front/plan/PlanForm'

interface Props {
  params: {
    plan_id: number;
  }
}

const PlanTop = async({ params }: Props) => {
  const plan = await fetch(`${process.env.API_BASE_URL}/plans/${params.plan_id}`, {cache: 'no-store'}).then((res) => res.json())
  const form = await fetch(`${process.env.API_BASE_URL}/forms/${plan.form.id}`, {cache: 'no-store'}).then((res) => res.json())
  console.log(form.form_items_attributes)

  return (
    <div>
      <Paper elevation={3} className='m-5'>
        <PlanInfo plan={plan} />
        <PlanForm form_items={form.form_items_attributes} />
      </Paper>
    </div>
  );
};

export default PlanTop;