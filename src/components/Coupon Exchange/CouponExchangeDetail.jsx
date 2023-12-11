import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";
import fallback from "../../assets/fallback.png";
import CouponExchangeService from "../../services/CouponExchangeService";




export function CouponExchangeDetail() {
     //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  const routeParams = useParams();
  const id = routeParams.id || null;
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //Llamar al API y obtener la lista de materiales
    if (id != undefined && !isNaN(Number(id))) {
    CouponExchangeService.getCouponExchangeById(Number(id))
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
    }
  }, [id]);

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
    <h1 className="uppercase">Coupon Exchange detail</h1>
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
          <span className="font-bold">Date Redeemed: </span>
          {data.date_created} 
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