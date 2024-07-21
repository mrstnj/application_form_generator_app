import {
  Box,
  Divider,
  Typography
} from '@mui/material';

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
      <img src={service.img} alt={service.name}/>
    </Box>
  );
};

export default ServiceInfo;