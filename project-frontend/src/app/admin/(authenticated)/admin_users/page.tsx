import { cookies } from 'next/headers'
import Index from '@/features/routes/admin/admin_users/Index'

const CompanyIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const admin_users = await fetch(`${process.env.API_BASE_URL}/admin_users`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Index adminUsersList={admin_users} />
    </>
  );
};

export default CompanyIndex;