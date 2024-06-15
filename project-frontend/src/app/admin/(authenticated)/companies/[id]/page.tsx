import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/companies/Form'

interface Props {
  params: {
    id: number;
  }
}

const CompanyEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const company = await fetch(`${process.env.API_BASE_URL}/companies/${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} company={company} />
    </>
  );
};

export default CompanyEdit;