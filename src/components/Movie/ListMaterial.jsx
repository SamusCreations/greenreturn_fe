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
function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}
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
            <Link to={`/material/${item.id_material}`}> 
            <Card shadow="sm" className=" flex flex-col w-full max-h-auto" isPressable onPress={() => console.log("a")}>
          <CardBody id="a" className="overflow-visible p-0 ">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              id="aa"
              alt={item.title}
              className="flex flex-col justify-center "
              src={ getImgUrl(item.image_url) }
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
        </Link>
          </Grid>
        ))}
    </Grid>
  );
  
}

