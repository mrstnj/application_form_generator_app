import {
  Paper,
  Box,
  Grid
} from '@mui/material';
import ServiceInfo from '@/features/routes/front/service/ServiceInfo'
import PlanCard from '@/features/routes/front/service/PlanCard';

type Plan = {
  id: number;
  name: string;
  content: string;
  status: string;
}

interface Props {
  params: {
    service_code: string;
  }
}

const ServiceTop = async({ params }: Props) => {
  const service = await fetch(`${process.env.API_BASE_URL}/services/show_by_code?code=${params.service_code}`, {cache: 'no-store'}).then((res) => res.json())
  
  return (
    <div>
      <Paper elevation={3} className='m-5'>
        <ServiceInfo service={service} />
        <Box className="p-8">
          <Grid container spacing={2}>
            {service.plans_attributes.map( (plan: Plan, index: number) => {
              return (
                <PlanCard plan={plan} key={index} />
              )
            })}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default ServiceTop;