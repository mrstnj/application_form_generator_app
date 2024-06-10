import { cookies } from 'next/headers'
import Form from '@/features/routes/services/Form'

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
  service.img = service.img.url;

  return (
    <>
      <Form is_new={false} id={params.id} service={service} />
    </>
  );
};

export default ServiceEdit;