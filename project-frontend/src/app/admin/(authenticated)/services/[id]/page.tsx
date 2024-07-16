import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/services/Form'

interface Props {
  params: {
    id: number;
  }
}

const ServiceEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const service = await fetch(`${process.env.API_BASE_URL}/services/${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())
  const companies = await fetch(`${process.env.API_BASE_URL}/companies`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} service={service} companies={companies} />
    </>
  );
};

export default ServiceEdit;