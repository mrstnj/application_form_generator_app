import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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
          image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${service.img}`}
          title="green iguana"
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