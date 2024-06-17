import { cookies } from 'next/headers'
import Index from '@/features/routes/admin/forms/Index'

const FormIndex = async () => {
  const accessToken = cookies().get('accessToken');
  const forms = await fetch(`${process.env.API_BASE_URL}/forms`, { 
    cache: 'no-store',
    headers: accessToken ? {
      'AccessToken': `${accessToken.value}`
    } : {}
  }).then((res) => res.json())

  return (
    <>
      <Index formsList={forms} />
    </>
  );
};

export default FormIndex;