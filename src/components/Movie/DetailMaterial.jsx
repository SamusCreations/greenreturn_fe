import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialService from '../../services/MaterialService';
import StarIcon from '@mui/icons-material/Star';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Grid } from '@mui/material';

export function DetailMaterial() {
  const routeParams= useParams();
  console.log(routeParams)

   //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
  useEffect(()=>{
    //Llamar al API y obtener una pelicula
    MaterialService.getMaterialById(routeParams.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[routeParams.id])

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }} >
    {data && ( 
        <Grid container spacing={2}>
          
          <Grid item={true} xs={5} >  
          <Box component='img'
           sx={{
            borderRadius:'4%',
            maxWidth:'100%',
            height: 'auto',
          }}
          alt="Ticket pelicula"
          src="{ticket}"/>  
            
          </Grid>
          <Grid item={true} xs={7}>
            
              <Typography variant='h4' component='h1' gutterBottom>
               {data.name}
              </Typography>
              <Typography variant='subtitle1' component='h1' gutterBottom>
               {data.measurement.name}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Description: 
                </Box>{' '}
                {data.description}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Unit cost: 
                </Box>{' '}
                {data.unit_cost} ecocoins
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Color:
                </Box>{' '}
                  {data.color.name} {data.color.value}
              </Typography>
{/*               <Typography component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Generos:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                 {data.genres.map((item)=>(
                  <ListItemButton key={item.id}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                 ))}
                </List>
              </Typography>
              <Typography component='span' variant='subtitle1'>
                <Box fontWeight='bold'>Actores:</Box>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  {data.actors.map((item)=>(
                  <ListItemButton key={item.id}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${item.fname} ${item.lname}`} />
                  </ListItemButton>
                 ))}
                </List>
              </Typography> */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
