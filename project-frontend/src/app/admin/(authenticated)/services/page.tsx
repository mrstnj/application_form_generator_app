import Index from '@/features/routes/services/Index'

const ServiceIndex = async () => {
  const services = await fetch("http://backend:8080/services", { cache: 'no-store' }).then((res) => res.json())

  return (
    <>
      <Index servicesList={services} />
    </>
  );
};

export default ServiceIndex;