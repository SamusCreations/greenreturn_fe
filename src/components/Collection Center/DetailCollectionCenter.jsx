import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Link } from "@mui/material";
import CCService from "../../services/CollectionCenterService";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import { Store } from "../../assets/Icons";

function getImgUrl(name) {
  return new URL(`${name}`, import.meta.url).href;
}

export function DetailCollectionCenter() {
  const routeParams = useParams();
  console.log(routeParams);

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);

  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    CCService.getCollectionCenterById(routeParams.id)
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
        throw new Error("Respuesta no válida del servidor");
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
        <h1 className="uppercase">Collection Center Detail</h1>
      </div>
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        {data && (
          <Grid container spacing={2}>
            <Grid
              item={true}
              xs={5}
              className="flex items-center justify-center"
            >
              <Store className="text-primary" fill="currentColor" size={300} />
            </Grid>
            <Grid
              item={true}
              xs={7}
              className="flex flex-col items-center justify-center"
            >
              <div>
                <Typography variant="h4" component="h1" gutterBottom>
                  {data.name}
                </Typography>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Location:
                  </Box>{" "}
                  {`${data.address}, ${data.district.name}, ${data.canton.name}, ${data.province.name}`}
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box fontWeight="bold" display="inline">
                    Telephone:
                  </Box>{" "}
                  {data.telephone}
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box fontWeight="bold" display="inline">
                    Schedule:
                  </Box>{" "}
                  {data.schedule}
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  display="block"
                >
                  <Box fontWeight="bold" display="inline">
                    Admin:
                  </Box>{" "}
                  {data.administrator.name} {data.administrator.surname}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
        <Grid container sx={{ p: 2 }} spacing={3}>
          {data &&
            data.materials.map(
              (item) => (
                console.log("Ruta de imagen:", item.image_url),
                (
                  <Grid item xs={4} key={item.id_material}>
                    <Link to={`/material/${item.id_material}`}>
                      <Card
                        shadow="sm"
                        className=" flex flex-col w-full max-h-auto"
                        isPressable
                        onPress={() => console.log("a")}
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
      </Container>
    </div>
  );
}
