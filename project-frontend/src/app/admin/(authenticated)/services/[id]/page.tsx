import Form from '@/features/routes/services/Form'

interface Props {
  params: {
    id: number;
  }
}

const ServiceEdit = async ({ params }: Props) => {
  let service = await fetch(`http://backend:8080/services/${params.id}`, { cache: 'no-store' }).then((res) => res.json())
  service.img = service.img.url;
  console.log(service)

  return (
    <>
      <Form is_new={false} id={params.id} service={service} />
    </>
  );
};

export default ServiceEdit;