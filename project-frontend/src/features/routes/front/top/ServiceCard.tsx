import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid
} from '@mui/material';

type Service = {
  id: number;
  name: string;
  content: string;
  img: string;
};

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={service.img}
          title="service"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {service.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">詳細</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ServiceCard;