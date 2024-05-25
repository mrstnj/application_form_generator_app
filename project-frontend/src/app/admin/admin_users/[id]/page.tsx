import Form from '../../../../features/routes/admin_users/Form'

type Params = {
  params: {
    id: number;
  }
}

const AdminUserEdit = ({ params }: Params) => {

  return (
    <>
      <Form params={{ is_new: false, id: params.id }}/>
    </>
  );
};

export default AdminUserEdit;