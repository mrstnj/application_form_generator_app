"use client";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

type Service = {
  id: number;
  name: string;
  content: string;
  img: string;
};

interface Props {
  services: Service[];
}

const ServiceCarousel = ({ services }: Props) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          autoplay: true,
          interval: 3000,
          type: 'loop',
          gap: '5rem',
          perPage: isMobile ? 1 : 3,
          perMove: 1,
        }}
      >
        {services.map(service => (
          <SplideSlide key={service.id} className="flex justify-center items-center">
            <img className="slide-img" src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service.img}`} alt={service.name}/>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default ServiceCarousel;