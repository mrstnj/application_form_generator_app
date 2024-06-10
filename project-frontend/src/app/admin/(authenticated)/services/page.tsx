import { cookies } from 'next/headers'
import Index from '@/features/routes/services/Index'

const ServiceIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const services = await fetch(`${process.env.API_BASE_URL}/services`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Index servicesList={services} />
    </>
  );
};

export default ServiceIndex;