import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import CCService from "../../services/CollectionCenterService";
import { HomeIcon } from "../../assets/Icons";

export function ListCollectionCenter() {
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
        <h1 className="uppercase">Collection Centers</h1>
      </div>
      <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-3">
        {data &&
          data.map(
            (item) => (
              (
                <div key={item.id_collection_center} className="p-2 sm:p-0">
                  <Card className="w-full h-[300px] col-span-12 sm:col-span-5">
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
                      <Link to={`/collection-center/${item.id_collection_center}`}>
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
              )
            )
          )}
      </div>
    </div>
  );
}
