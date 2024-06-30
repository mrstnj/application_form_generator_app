import {
  Box,
  Divider,
  Typography
} from '@mui/material';
// import Image from 'next/image'

type Service = {
  name: string;
  content: string;
  img: string;
}

interface Props {
  service: Service;
}

const ServiceInfo = ({ service }: Props) => {  

  return (
    <Box className="p-8">
      <Typography variant="h4" gutterBottom>
        {service.name}
      </Typography>
      <Divider/>
      <Typography variant="body2" gutterBottom className='pt-5'>
        {service.content}
      </Typography>
      {/* TODO: 画像を表示させる */}
      {/* <Image src={service.img} alt="preview" width={200} height={200} /> */}
    </Box>
  );
};

export default ServiceInfo;