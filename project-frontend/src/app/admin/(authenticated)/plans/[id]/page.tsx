import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/plans/Form'

interface Props {
  params: {
    id: number;
  }
}

const PlanEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const services = await fetch(`${process.env.API_BASE_URL}/services`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())
  const forms = await fetch(`${process.env.API_BASE_URL}/forms`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())
  const plan = await fetch(`${process.env.API_BASE_URL}/plans/${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} plan={plan} services={services} forms={forms} />
    </>
  );
};

export default PlanEdit;