import { cookies } from 'next/headers'
import Index from '@/features/routes/services/Index'

const ServiceIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const services = await fetch("http://backend:8080/services", { 
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