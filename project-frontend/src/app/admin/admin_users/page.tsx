import Index from '../../../features/routes/admin_users/Index'

const CompanyIndex = async () => {
  const admin_users = await fetch("http://backend:8080/admin_users", { cache: 'no-store' }).then((res) => res.json())

  return (
    <>
      <Index adminUsersList={admin_users} />
    </>
  );
};

export default CompanyIndex;