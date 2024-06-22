import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid
} from '@mui/material';

interface Props {
  params: {
    service_code: string;
  }
}

const Top = async({ params }: Props) => {
  const service = await fetch(`${process.env.API_BASE_URL}/services/show_by_code?code=${params.service_code}`, {cache: 'no-store'}).then((res) => res.json())
  console.log(service)

  return (
    <div>
      <Paper elevation={3} className='m-5'>
        <Box className="p-8">
          <Typography variant="h4" gutterBottom>
            {service.name}
          </Typography>
          <Divider/>
          <Typography variant="subtitle1" gutterBottom className='pt-5'>
            {service.content}
          </Typography>
          <CardMedia
            sx={{ height: 200 }}
            image={service.img}
            title="service"
          />
        </Box>
        <Box className="p-8">
        <Grid container spacing={2}>
          {service.plans_attributes.map( plan => {
            return (
              <Grid item xs={12} sm={4} md={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">詳細</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Top;