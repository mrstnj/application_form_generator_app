import ServiceCarousel from '@/features/routes/front/top/ServiceCarousel'
import Menu from '@/features/routes/front/top/Menu'
import Content from '@/features/routes/front/top/Content'

interface Props {
  params: {
    code: string;
  }
}

const Top = async({ params }: Props) => {
  const company = await fetch(`${process.env.API_BASE_URL}/companies/show_by_code?code=${params.code}`, {cache: 'no-store'}).then((res) => res.json())

  return (
    <div>
      <ServiceCarousel services={company.services_attributes} />
      <div style={{ height: '50vh', display: 'flex' }}>
        <Menu/>
        <Content/>
      </div>
    </div>
  );
};

export default Top;