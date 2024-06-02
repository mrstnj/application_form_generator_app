import Index from '@/features/routes/companies/Index'

const CompanyIndex = async () => {
  const companies = await fetch("http://backend:8080/companies", { cache: 'no-store' }).then((res) => res.json())

  return (
    <>
      <Index companiesList={companies} />
    </>
  );
};

export default CompanyIndex;