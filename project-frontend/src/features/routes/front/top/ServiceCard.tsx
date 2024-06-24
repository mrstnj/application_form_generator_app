import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Grid
} from '@mui/material';

type Service = {
  id: number;
  code: string;
  name: string;
  content: string;
  img: string;
};

interface Props {
  service: Service;
  company_code: string;
}

const ServiceCard = ({ service, company_code }: Props) => {

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea href={`/front/${company_code}/${service.code}`}>
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
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ServiceCard;