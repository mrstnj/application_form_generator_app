import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid
} from '@mui/material';

type Plan = {
  id: number;
  name: string;
  content: string;
}

interface Props {
  company_code: string;
  service_code: string;
  plan: Plan;
}

const PlanCard = ({ company_code, service_code, plan }: Props) => {  

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea href={`/front/${company_code}/${service_code}/plans/${plan.id}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {plan.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PlanCard;