import ServiceCarousel from '@/features/routes/front/top/ServiceCarousel'
import Content from '@/features/routes/front/top/Content'

type Service = {
  status: string;
}

interface Props {
  params: {
    company_code: string;
  }
}

const Top = async({ params }: Props) => {
  const company = await fetch(`${process.env.API_BASE_URL}/companies/show_by_code?code=${params.company_code}`, {cache: 'no-store'}).then((res) => res.json())
  const services = company.services_attributes.filter((service: Service) => service.status === 'activate')

  return (
    <div>
      <ServiceCarousel services={services} />
      <Content services={services} company_code={params.company_code}/>
    </div>
  );
};

export default Top;