import ServiceCarousel from '@/features/routes/front/top/ServiceCarousel'
import Content from '@/features/routes/front/top/Content'

interface Props {
  params: {
    company_code: string;
  }
}

const Top = async({ params }: Props) => {
  const company = await fetch(`${process.env.API_BASE_URL}/companies/show_by_code?code=${params.company_code}`, {cache: 'no-store'}).then((res) => res.json())

  return (
    <div>
      <ServiceCarousel services={company.services_attributes} />
      <Content services={company.services_attributes} company_code={params.company_code}/>
    </div>
  );
};

export default Top;