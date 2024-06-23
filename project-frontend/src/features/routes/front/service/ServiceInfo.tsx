import {
  Box,
  Divider,
  Typography
} from '@mui/material';
import Image from 'next/image'

type Service = {
  name: string;
  content: string;
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
      <Typography variant="subtitle1" gutterBottom className='pt-5'>
        {service.content}
      </Typography>
      {/* <Image src={service.img} alt="preview" className="file-preview shadow-md" width={200} height={200} /> */}
    </Box>
  );
};

export default ServiceInfo;