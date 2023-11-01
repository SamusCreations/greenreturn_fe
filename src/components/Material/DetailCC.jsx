import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialService from '../../services/MaterialService';
import { Grid } from '@mui/material';
import CCService from '../../services/CCService';

function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}
export function DetailCC() {
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
    CCService.getCCById(routeParams.id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      console.log(response.data.id_color)
      setError(response.error)
      setLoaded(true)
      
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )    
  },
   
  [routeParams.id]);

  

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
          src={getImgUrl("../../assets/Store.png") }/>  
            
          </Grid>
          <Grid item={true} xs={7}>
            
              <Typography variant='h4' component='h1' gutterBottom>
               {data.name}
              </Typography>
              <Typography variant='subtitle1' component='h1' gutterBottom>
              <Box fontWeight='bold' display='inline'>
                  Location: 
                </Box>{' '}
               {data.address}
              </Typography>             
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Telephone: 
                </Box>{' '}
                {data.telephone}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Schedule:
                </Box>{' '}
                 {data.schedule} 
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
