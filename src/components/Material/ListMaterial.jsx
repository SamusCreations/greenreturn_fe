import { useEffect, useState } from "react";
import MaterialService from "../../services/MaterialService";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import fallback from "../../assets/fallback.png";

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
        <h1 className="uppercase">Materials</h1>
      </div>
      {!data && (
        <div className="text-center ">
          <p>Not available yet</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {data &&
          data.map((item, index) => (
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
                  <p className="text-default-500">{item.unit_cost} Ecocoins</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
