import { cookies } from 'next/headers'
import Form from '@/features/routes/admin/users/Form'

interface Props {
  params: {
    id: number;
  }
}

const UserEdit = async ({ params }: Props) => {
  const accessToken = cookies().get('accessToken');
  const user = await fetch(`${process.env.API_BASE_URL}/users/${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())
  const user_plans = await fetch(`${process.env.API_BASE_URL}/users/show_user_plan?id=${params.id}`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Form id={params.id} user={user} user_plans={user_plans} />
    </>
  );
};

export default UserEdit;