import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid
} from '@mui/material';

type Plan = {
  name: string;
  content: string;
}

interface Props {
  plan: Plan;
}

const PlanCard = ({ plan }: Props) => {  

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea href="/admin/login">
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