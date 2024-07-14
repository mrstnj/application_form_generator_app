import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/services/Form'

const ServiceCreate = async() => {
  const accessToken = cookies().get('accessToken');
  const companies = await fetch(`${process.env.API_BASE_URL}/companies`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form is_new={true} companies={companies} />
    </>
  );
};

export default ServiceCreate;