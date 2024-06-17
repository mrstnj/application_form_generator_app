import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/forms/Form'

interface Props {
  params: {
    id: number;
  }
}

const FormEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const form = await fetch(`${process.env.API_BASE_URL}/forms/${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} form={form} />
    </>
  );
};

export default FormEdit;