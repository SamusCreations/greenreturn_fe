import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CouponService from "../../services/CouponService";
import { Button, Card, CardBody, Image, Spinner } from "@nextui-org/react";
import fallback from "../../assets/fallback.png";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import CouponExchangeService from "../../services/CouponExchangeService";
import UserService from "../../services/UserService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function CouponExchange() {
  const navigate = useNavigate();
  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  const routeParams = useParams();

  const [data1, setData1] = useState(null);
  //Error del API
  const [error1, setError1] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded1, setLoaded1] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    UserService.getUserById(userData.id_user)
      .then((response) => {
        setData1(response.data.results);
        console.log(response.data);
        setError1(response.error);
        setLoaded1(true);
      })
      .catch((error) => {
        console.log(error);
        setError1(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [userData]);

  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    CouponService.getCouponById(routeParams.id)
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

  const CouponSchema = yup.object({
    id_user: yup.string(),
    id_coupon: yup.number(),
    unit_cost: yup.number(),
    qr: yup.string(),
  });

  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_coupon: "",
      id_user: "",
      unit_cost: "",
      qr: "a",
    },
    // Asignación de validaciones
    resolver: yupResolver(CouponSchema),
  });

  const onSubmit = () => {
    try {
      if (data1 && data) {
        const dataToSubmit = {
          id_user: data1.id_user,
          id_coupon: data.id_coupon,
          unit_cost: data.unit_cost,
          qr: "valor_de_qr", // Puedes establecer el valor de qr aquí
        };

        CouponExchangeService.createCouponExchange(dataToSubmit)
          .then((response) => {
            // Manejo de la respuesta del servidor
            console.log(response);
            toast.success("Coupon exchange successful");
            navigate("/coupon-list");
          })
          .catch((error) => {
            // Manejo de errores al enviar la solicitud
            console.error(error);
            toast.error("Failed to exchange coupon");
          });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred");
    }
  };
  //Resultado de consumo del API, respuesta

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
        <h1 className="uppercase">Coupon to exchange</h1>
      </div>
      <div>
        {data && (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 w-full">
              <Card
                shadow="sm"
                className="w-1/2 mx-auto my-auto animate-appearance-in max-w-[300px]"
              >
                <CardBody className="overflow-visible p-0 rounded-xl w-full">
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
                <span className="font-bold">Price: </span>
                {data.unit_cost} ecocoins
              </p>
              <div className="flex flex-col justify-center items-center pt-10">
                {parseInt(data?.unit_cost) > parseInt(data1?.coin) && (
                  <b>Not enough eco-coins to redeem this coupon.</b>
                )}
                <Button
                  isDisabled={parseInt(data?.unit_cost) > parseInt(data1?.coin)}
                  onClick={onSubmit}
                  color="primary"
                >
                  Redeem
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}
