import Form from '../../../../features/routes/admin_users/Form'

interface Props {
  params: {
    id: number;
  }
}

const AdminUserEdit = async ({ params }: Props) => {
  const admin_user = await fetch(`http://backend:8080/admin_users/${params.id}`, { cache: 'no-store' }).then((res) => res.json())

  return (
    <>
      <Form is_new={false} id={params.id} adminUser={admin_user} />
    </>
  );
};

export default AdminUserEdit;