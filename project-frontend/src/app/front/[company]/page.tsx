import ServiceCarousel from '@/features/routes/front/top/ServiceCarousel'
import Menu from '@/features/routes/front/top/Menu'
import Content from '@/features/routes/front/top/Content'

const Top = () => {

  return (
    <div>
      <ServiceCarousel/>
      <div style={{ height: '50vh', display: 'flex' }}>
        <Menu/>
        <Content/>
      </div>
    </div>
  );
};

export default Top;