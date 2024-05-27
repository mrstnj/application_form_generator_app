import Form from '../../../../features/routes/companies/Form'

interface Props {
  params: {
    id: number;
  }
}

const CompanyEdit = async ({ params }: Props) => {
  const company = await fetch(`http://backend:8080/companies/${params.id}`, { cache: 'no-store' }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} company={company} />
    </>
  );
};

export default CompanyEdit;