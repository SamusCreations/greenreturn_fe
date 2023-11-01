import { useEffect, useState } from "react";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import {Card, CardHeader,Button, CardFooter, Image, CardBody } from "@nextui-org/react";
import CCService from "../../services/CCService";
function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}
export function ListCC() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);

  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener la lista de materiales
    CCService.getCollectionCenter()
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
          <Grid item xs={4} key={item.id_collection_center}>
             
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
        <p className="text-tiny text-black uppercase font-bold">{item.name}</p>
        <h4 className="text-black font-light text-xs">{item.address}</h4>
      </CardHeader>

      <CardBody className="overflow-visible p-0 mx-auto">
      <Image 
        removeWrapper
        
        alt="Card example background"
        className="flex justify-center z-0 mx-auto my-auto max-w-xs max-h-xs  object-cover"
        src={ getImgUrl("../../assets/Store.png") }
      />
          </CardBody>
         
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">see more</p>
          <p className="text-black text-tiny">Info</p>
        </div>
        <Link to={`/CC/${item.id_collection_center}`}>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          More
        </Button>
        </Link>
      </CardFooter>
    </Card>
        
          </Grid>
        ))}
    </Grid>
  );
  
}

