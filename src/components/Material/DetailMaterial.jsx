import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialService from '../../services/MaterialService';
import { Grid } from '@mui/material';
import { Spinner } from '@nextui-org/react';

function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href;
}
export function DetailMaterial() {
  const routeParams = useParams();
  console.log(routeParams);

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    MaterialService.getMaterialById(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        console.log(response.data.id_color);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [routeParams.id]);

  if (!loaded)
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="font-bold text-4xl py-8">
        <h1 className="uppercase">Material Detail</h1>
      </div>
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        {data && (
          <Grid container spacing={2}>
            <Grid item={true} xs={5}>
              <Box
                component="img"
                sx={{
                  borderRadius: '4%',
                  maxWidth: '100%',
                  height: 'auto',
                }}
                alt="Ticket pelicula"
                src={getImgUrl(data.image_url)}
              />
            </Grid>
            <Grid item={true} xs={7}>
              <Typography variant="h4" component="h1" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="subtitle1" component="h1" gutterBottom>
                {data.measurement.name}
              </Typography>
              <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Description:
                </Box>{' '}
                {data.description}
              </Typography>
              <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Unit cost:
                </Box>{' '}
                {data.unit_cost} ecocoins
              </Typography>
              <Typography component="span" variant="subtitle1" display="block">
                <Box fontWeight="bold" display="inline">
                  Color:
                </Box>{' '}
                {data.color.name} {data.color.value}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
