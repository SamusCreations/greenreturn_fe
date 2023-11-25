import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CCService from "../../services/CollectionCenterService";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import { HomeIcon } from "../../assets/Icons";
import fallback from "../../assets/fallback.png";

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
      <div className="font-bold text-4xl py-8 mx-2">
        <h1 className="uppercase">Collection Center Detail</h1>
      </div>
      <div>
        {data && (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <HomeIcon
                className="text-primary mx-auto animate-appearance-in"
                fill="currentColor"
                size={250}
              />
            </div>
            <div className="flex-1 items-center justify-center px-4">
              <div>
                <p className="text-4xl font-bold capitalize py-2">
                  {data.name}
                </p>
                <p className="py-2 text-lg font-medium">
                  <span className="font-bold"> Location: </span>
                  {`${data.address}, ${data.district.name}, ${data.canton.name}, ${data.province.name}`}
                </p>
                <p className="py-2 text-lg font-medium">
                  <span className="font-bold"> Telephone: </span>
                  {data.telephone}
                </p>
                <p className="py-2 text-lg font-medium">
                  <span className="font-bold"> Schedule: </span>
                  {data.schedule}
                </p>
                <p className="py-2 text-lg font-medium">
                  <span className="font-bold"> Administrator: </span>
                  {data.administrator.name} {data.administrator.surname}
                </p>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="font-bold text-4xl py-6 mx-2">
            <h1 className="uppercase">Available Materials</h1>
          </div>
          {!data.materials && (
            <div className="text-center ">
              <p>Not available yet</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {data.materials &&
              data.materials.map((item, index) => (
                <Link
                  to={`/material/${item.id_material}`}
                  key={index}
                  className="p-2 sm:p-0 max-w-[300px] mx-auto"
                >
                  <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    className="w-full animate-appearance-in"
                  >
                    <CardBody
                      className="overflow-visible p-0 rounded-xl"
                      style={{ backgroundColor: item.color_value }}
                    >
                      <Image
                        shadow="sm"
                        radius="lg"
                        alt={item.name}
                        src={item.image_url}
                        className="mx-auto w-full object-cover"
                        fallbackSrc={fallback}
                        isBlurred
                        isZoomed
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
