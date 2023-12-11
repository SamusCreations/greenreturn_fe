import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import CollectionCenterService from "../../services/CollectionCenterService";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import { HomeIcon } from "../../assets/Icons";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MaterialExchangeService from "../../services/MaterialExchangeService";
import CouponService from "../../services/CouponService";

export default function Dashboard() {
  const { user, decodeToken, authorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const id = userData.id_user || null;
  const [error, setError] = useState("");

  //Valores a precargar en el formulario, vienen del API
  const [dataMaterialExchanges, setMaterialExchanges] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (user && authorize({ allowedRoles: ["Admin"] })) {
        MaterialExchangeService.getTotalExchanges()
          .then((response) => {
            console.log(response);
            setMaterialExchanges(response.data.results[0]);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);

              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [id, user, authorize, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataCouponExchanges, setCouponExchanges] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (user && authorize({ allowedRoles: ["Admin"] })) {
        CouponService.getTotalExchanges()
          .then((response) => {
            console.log(response);
            setCouponExchanges(response.data.results[0]);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);

              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [id, user, authorize, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataCouponCoins, setCouponCoins] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (user && authorize({ allowedRoles: ["Admin"] })) {
        CouponService.getTotalCoins()
          .then((response) => {
            console.log(response);
            setCouponCoins(response.data.results[0]);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);

              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [id, user, authorize, error]);

  const COLORS = [
    "#65d3da",
    "#79d69f",
    "#fad144",
    "#d76c6c",
    "#138185",
    "#26a0a7",
    "#ec983d",
    "#cbe989",
    "#f9ec86",
    "#ebf898",
  ];

  //Valores a precargar en el formulario, vienen del API
  const [dataCoinsByCollectionCenter, setCoinsByCollectionCenter] =
    useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (user && authorize({ allowedRoles: ["Admin"] })) {
        CollectionCenterService.getCoinsByCollectionCenter()
          .then((response) => {
            const dataGraph = response.data.results;
            console.log(dataGraph);
            const formatData = dataGraph.map((item) => ({
              Center: item.name,
              Ecocoins: parseInt(item.coins),
            }));
            setCoinsByCollectionCenter(formatData);
          })
          .catch((error) => {
            setCountByMaterial(null);
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [user, authorize, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataCollectionCenter, setCollectionCenter] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (user && authorize({ allowedRoles: ["CC_Admin"] })) {
        if (id != undefined && !isNaN(Number(id))) {
          CollectionCenterService.getCollectionCenterByUser(Number(id))
            .then((response) => {
              console.log(response);
              setCollectionCenter(response.data.results);
              setError(response.error);
            })
            .catch((error) => {
              if (error instanceof SyntaxError) {
                console.log(error);
                setError(error);

                throw new Error("Respuesta no válida del servidor");
              }
            });
        }
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [id, user, authorize, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataMonthExchanges, setMonthExchanges] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (dataCollectionCenter) {
        CollectionCenterService.getMonthExchanges(
          dataCollectionCenter.id_collection_center
        )
          .then((response) => {
            console.log(response);
            setMonthExchanges(response.data.results[0]);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);

              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [dataCollectionCenter, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataTotalCoins, setTotalCoins] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (dataCollectionCenter) {
        CollectionCenterService.getTotalCoins(
          dataCollectionCenter.id_collection_center
        )
          .then((response) => {
            console.log(response);
            setTotalCoins(response.data.results[0]);
            setError(response.error);
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);

              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [dataCollectionCenter, error]);

  //Valores a precargar en el formulario, vienen del API
  const [dataCountByMaterial, setCountByMaterial] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    try {
      if (dataCollectionCenter) {
        CollectionCenterService.getCountByMaterial(
          dataCollectionCenter.id_collection_center
        )
          .then((response) => {
            const dataGraph = response.data.results;
            console.log(dataGraph);
            const formatData = dataGraph.map((item) => ({
              Material: item.material,
              Quantity: parseInt(item.quantity),
            }));
            setCountByMaterial(formatData);
          })
          .catch((error) => {
            setCountByMaterial(null);
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  }, [dataCollectionCenter, error]);

  if (user && authorize({ allowedRoles: ["CC_Admin"] })) {
    if (
      !dataCollectionCenter ||
      !dataMonthExchanges ||
      !dataTotalCoins ||
      !dataCountByMaterial
    )
      return (
        <div className="flex w-full min-h-screen items-center justify-center">
          <Spinner />
        </div>
      );
  } else {
    if (!dataMaterialExchanges && !dataCouponExchanges && !dataCouponCoins)
      return (
        <div className="flex w-full min-h-screen items-center justify-center">
          <Spinner />
        </div>
      );
  }
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div className="py-8">
        <h1 className="font-bold text-4xl uppercase">Dashboard</h1>
      </div>

      {/* Dashboard CC Admin */}
      {user && authorize({ allowedRoles: ["CC_Admin"] }) && (
        <div className="gap-2 grid grid-cols-12 grid-rows-3 px-2 sm:p-0 justify-end items-end">
          <Card className="w-full h-[300px] col-span-12 sm:col-span-4 ">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                {dataCollectionCenter?.name}
              </p>
              <h4 className="text-black font-light text-sm">
                {dataCollectionCenter?.address}
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
                to={`/collection-center/${dataCollectionCenter?.id_collection_center}`}
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

          <Card className="w-full h-[300px] col-span-12 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                Exchanges of this month
              </p>
            </CardHeader>
            <CardBody className="flex overflow-visible p-0 mx-auto items-center">
              <p className="text-center font-bold text-8xl my-auto">
                {dataMonthExchanges?.exchanges}
              </p>
            </CardBody>
            <CardFooter className="absolute bottom-10 z-10 justify-center">
              <h4 className="text-black font-light text-sm text-center">
                Material exchanges made by this month
              </h4>
            </CardFooter>
          </Card>

          <Card className="w-full h-[300px] col-span-12 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                Ecocoins generated
              </p>
            </CardHeader>
            <CardBody className="flex overflow-visible p-0 mx-auto items-center">
              <p className="text-center font-bold text-8xl my-auto">
                {dataTotalCoins?.total_coins}
              </p>
            </CardBody>
            <CardFooter className="absolute bottom-10 z-10 justify-center">
              <h4 className="text-black font-light text-sm text-center">
                Total Ecocoins
              </h4>
            </CardFooter>
          </Card>

          <Card className="col-span-12 row-span-2 h-[600px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-sm text-black uppercase font-bold">
                Material count by Exchange
              </p>
            </CardHeader>
            <div className="flex items-end h-[600px]">
              <ResponsiveContainer width="100%" height={550} key={1}>
                <BarChart
                  width={500}
                  height={300}
                  data={dataCountByMaterial}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Material" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Quantity"
                    fill="rgba(29, 150, 52, 0.5)"
                    activeBar={<Rectangle fill="rgba(29, 150, 52, 1)" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Dashboard Administrator */}
      {user && authorize({ allowedRoles: ["Admin"] }) && (
        <div className="gap-2 grid grid-cols-12 grid-rows-3 px-2 sm:p-0 justify-end items-end">
          <Card className="w-full h-[300px] col-span-12 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                Material Exchanges
              </p>
            </CardHeader>
            <CardBody className="flex overflow-visible p-0 mx-auto items-center">
              <p className="text-center font-bold text-8xl my-auto">
                {dataMaterialExchanges?.total}
              </p>
            </CardBody>
            <CardFooter className="absolute bottom-10 z-10 justify-center">
              <h4 className="text-black font-light text-sm text-center">
                Material exchanges made by this year
              </h4>
            </CardFooter>
          </Card>

          <Card className="w-full h-[300px] col-span-12 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                Coupon Exchanges
              </p>
            </CardHeader>
            <CardBody className="flex overflow-visible p-0 mx-auto items-center">
              <p className="text-center font-bold text-8xl my-auto">
                {dataCouponExchanges?.total}
              </p>
            </CardBody>
            <CardFooter className="absolute bottom-10 z-10 justify-center">
              <h4 className="text-black font-light text-sm text-center">
                Coupon exchanges made by this year
              </h4>
            </CardFooter>
          </Card>

          <Card className="w-full h-[300px] col-span-12 sm:col-span-4">
            <CardHeader className="absolute z-10 top-1 flex-col items-start mb-10">
              <p className="text-sm text-black uppercase font-bold">
                Total Ecocoins{" "}
              </p>
            </CardHeader>
            <CardBody className="flex overflow-visible p-0 mx-auto items-center">
              <p className="text-center font-bold text-8xl my-auto">
                {dataCouponCoins?.total}
              </p>
            </CardBody>
            <CardFooter className="absolute bottom-10 z-10 justify-center">
              <h4 className="text-black font-light text-sm text-center">
                Ecocoins generated by coupon exchanges
              </h4>
            </CardFooter>
          </Card>

          <Card className="col-span-12 row-span-2 h-[600px] sm:col-span-6">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-sm text-black uppercase font-bold">
                Coins count by Collection Center
              </p>
            </CardHeader>
            <div className="flex items-end h-[600px]">
              <ResponsiveContainer width="100%" height={550} key={1}>
                <BarChart
                  width={500}
                  height={300}
                  data={dataCoinsByCollectionCenter}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Center" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Ecocoins"
                    fill="rgba(29, 150, 52, 0.5)"
                    activeBar={<Rectangle fill="rgba(29, 150, 52, 1)" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="col-span-12 row-span-2 h-[600px] sm:col-span-6">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-sm text-black uppercase font-bold">
                Coins count by Collection Center
              </p>
            </CardHeader>
            <div className="flex items-center h-[600px]">
              <ResponsiveContainer width="100%" height={300} key={3}>
                <PieChart>
                  <Pie
                    data={dataCoinsByCollectionCenter}
                    dataKey="Ecocoins"
                    nameKey="Center"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    //Etiqueta nombre: valor
                    label={({ name, value }) => `${name} ${value}`}
                  >
                    {/* Colores del gráfico */}
                    {dataCoinsByCollectionCenter?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
