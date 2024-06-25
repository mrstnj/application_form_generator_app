import {
  Paper,
} from '@mui/material';
import PlanInfo from '@/features/routes/front/plan/PlanInfo'
import PlanForm from '@/features/routes/front/plan/PlanForm'

interface Props {
  params: {
    company_code: string;
    service_code: string;
    plan_id: number;
  }
}

const PlanTop = async({ params }: Props) => {
  const plan = await fetch(`${process.env.API_BASE_URL}/plans/${params.plan_id}`, {cache: 'no-store'}).then((res) => res.json())
  const form = await fetch(`${process.env.API_BASE_URL}/forms/${plan.form.id}`, {cache: 'no-store'}).then((res) => res.json())
  console.log(form.form_items_attributes)

  return (
    <div>
      <Paper elevation={3} className="sm:mx-auto sm:max-w-prose m-5 p-8" >
        <PlanInfo plan={plan} />
        <PlanForm company_code={params.company_code} service_code={params.service_code} form_items={form.form_items_attributes} />
      </Paper>
    </div>
  );
};

export default PlanTop;