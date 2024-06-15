import { cookies } from 'next/headers'
import Index from '@/features/routes/admin/plans/Index'

const PlanIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const services = await fetch(`${process.env.API_BASE_URL}/services`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())
  const plans = await fetch(`${process.env.API_BASE_URL}/plans`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Index plansList={plans} services={services} />
    </>
  );
};

export default PlanIndex;