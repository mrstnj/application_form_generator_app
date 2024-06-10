import { cookies } from 'next/headers'
import Index from '@/features/routes/companies/Index'

const CompanyIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const companies = await fetch(`${process.env.API_BASE_URL}/companies`, {
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Index companiesList={companies} />
    </>
  );
};

export default CompanyIndex;