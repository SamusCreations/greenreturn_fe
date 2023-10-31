import { useEffect, useState } from "react";
import MaterialService from "../../services/MaterialService";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccessTime from "@mui/icons-material/AccessTime";
import Language from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import * as images from "../../assets/images"
import logo from "../../assets/paper.png";

export function ListMaterial() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
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
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data &&
        data.map((item) => (
          console.log("Ruta de imagen:", item.image_url),
          <Grid item xs={4} key={item.id_material}>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-black/60 uppercase font-bold">{item.name}</p>
        <h4 className="text-green/90 font-medium text-xl">{item.description}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={import(`../../assets/${item.id_material}`).default}
      />
      <CardFooter className="absolute bg-black bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src= {item.image_url}
            
          />
          
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Unit Cost: {item.unit_cost}</p>
            
          </div>
        </div>
        <Button radius="full" size="sm">Detalles</Button>
      </CardFooter>
    </Card>
          </Grid>
        ))}
    </Grid>
  );
  
}

