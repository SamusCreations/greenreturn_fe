import { useEffect, useState } from 'react';
import MaterialService from '../../services/MaterialService';
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href;
}
export function ListMaterial() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);

  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener la lista de materiales
    MaterialService.getMaterials()
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, []);

  if (!loaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="font-bold text-4xl py-8">
        <h1 className="uppercase">Materials</h1>
      </div>
      <Grid container sx={{ p: 2 }} spacing={3}>
        {data &&
          data.map(
            (item) => (
              console.log('Ruta de imagen:', item.image_url),
              (
                <Grid item xs={4} key={item.id_material}>
                  <Link to={`/material/${item.id_material}`}>
                    <Card
                      shadow="sm"
                      className=" flex flex-col w-full max-h-auto"
                      isPressable
                      onPress={() => console.log('a')}
                    >
                      <CardBody
                        id="a"
                        style={{ backgroundColor: item.color_value }}
                        className={`overflow-visible p-0 rounded-lg`}
                      >
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.title}
                          className="flex flex-col justify-center "
                          src={getImgUrl(item.image_url)}
                        />
                      </CardBody>

                      <CardFooter className="text-small justify-between">
                        <b>{item.name}</b>
                        <p className="text-default-500">
                           {item.unit_cost} Ecocoins
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </Grid>
              )
            )
          )}
      </Grid>
    </div>
  );
}
