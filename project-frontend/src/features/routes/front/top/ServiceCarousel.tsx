"use client";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image'

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
    <Box sx={{ maxWidth: '100%', background: 'white' }}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          autoplay: true,
          interval: 3000,
          type: 'loop',
          gap: '5rem',
          perPage: isMobile ? 1 : 4,
          perMove: 1,
        }}
      >
        {services.map(service => (
          <SplideSlide key={service.id} className="flex justify-center items-center">
            {service.img ?
              <img className="slide-img" src={service.img} alt={service.name}/> :
              <Image src="/img/no_image.jpeg" alt="My Image" width={300} height={300} />
            }
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              {service.name}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default ServiceCarousel;