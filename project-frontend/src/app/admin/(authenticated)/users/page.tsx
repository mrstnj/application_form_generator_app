import { cookies } from 'next/headers'
import Index from '@/features/routes/admin/users/Index'

const UserIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const users = await fetch(`${process.env.API_BASE_URL}/users`, {
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
      <Index usersList={users} plans={plans} />
    </>
  );
};

export default UserIndex;