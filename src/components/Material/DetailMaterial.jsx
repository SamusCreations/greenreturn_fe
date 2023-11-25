import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialService";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spinner,
} from "@nextui-org/react";
import { HomeIcon } from "../../assets/Icons";
import fallback from "../../assets/fallback.png";

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
      <div className="font-bold text-4xl py-8 mx-2">
        <h1 className="uppercase">Material Detail</h1>
      </div>
      <div>
        {data && (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 w-full">
              <Card
                shadow="sm"
                className="w-1/2 mx-auto my-auto animate-appearance-in max-w-[300px]"
              >
                <CardBody
                  className="overflow-visible p-0 rounded-xl w-full"
                  style={{ backgroundColor: data.color.value }}
                >
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={data.name}
                    className="w-full object-cover "
                    src={data.image_url}
                    fallbackSrc={fallback}
                    isBlurred
                    isZoomed
                  />
                </CardBody>
              </Card>
            </div>
            <div className="flex-1  w-full p-2">
              <p className="text-4xl font-bold capitalize py-2">{data.name}</p>
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
      <div>
        <div className="font-bold text-4xl py-6 mx-2">
          <h1 className="uppercase">Available at</h1>
        </div>
        {!data.collection_centers && (
          <div className="text-center ">
            <p>Not available yet</p>
          </div>
        )}
        <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-3">
          {data.collection_centers &&
            data.collection_centers.map((item) => (
              <div key={item.id_collection_center} className="p-2 sm:p-0">
                <Card className="w-full h-[300px] col-span-12 sm:col-span-5 animate-appearance-in">
                  <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
                    <p className="text-sm text-black uppercase font-bold">
                      {item.name}
                    </p>
                    <h4 className="text-black font-light text-sm">
                      {item.address}
                    </h4>
                  </CardHeader>

                  <CardBody className="overflow-visible p-0 mx-auto">
                    <HomeIcon
                      className="flex justify-center z-0 mx-auto my-auto max-w-xs max-h-xs  object-cover text-primary"
                      fill="currentColor"
                      size={225}
                    />
                  </CardBody>
                  <CardFooter className="absolute bottom-0 z-10 justify-between">
                    <Link
                      to={`/collection-center/${item.id_collection_center}`}
                    >
                      <Button
                        className="text-tiny"
                        color="primary"
                        radius="sm"
                        size="sm"
                      >
                        View More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
