import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/admin_users/Form'

interface Props {
  params: {
    id: number;
  }
}

const AdminUserEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const admin_user = await fetch(`${process.env.API_BASE_URL}/admin_users/${params.id}`, {
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
      <Form is_new={false} id={params.id} adminUser={admin_user} companies={companies} />
    </>
  );
};

export default AdminUserEdit;