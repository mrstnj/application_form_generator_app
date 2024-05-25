import Form from '../../../../features/routes/companies/Form'

type Params = {
  params: {
    id: number;
  }
}

const CompanyEdit = ({ params }: Params) => {

  return (
    <>
      <Form params={{ is_new: false, id: params.id }}/>
    </>
  );
};

export default CompanyEdit;