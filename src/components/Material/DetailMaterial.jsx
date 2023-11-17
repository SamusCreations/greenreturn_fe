import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialService";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";

export function DetailMaterial() {
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
        <h1 className="uppercase">Material Detail</h1>
      </div>
      <div>
        {data && (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 w-full">
              <Card shadow="sm" className="w-1/2 mx-auto my-auto">
                <CardBody
                  className="overflow-visible p-0 rounded-xl w-full"
                  style={{ backgroundColor: data.color.value }}
                >
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={data.name}
                    className="w-full object-cover h-[140px]"
                    src={data.image_url}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between"></CardFooter>
              </Card>
            </div>
            <div className="flex-1  w-full p-2">
              <p className="text-4xl font-bold capitalize py-2">
                {data.name}
              </p>
              <p className="text-lg font-medium text-justify py-2">
                {data.description}
              </p>
              <p className="py-2 text-lg font-medium">
                <span className="font-bold">Measurement: </span>
                {data.measurement.name}
              </p>
              <p className="py-2 text-lg font-medium">
                <span className="font-bold">Price: </span>
                {data.unit_cost} ecocoins
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
