import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Spinner } from "@nextui-org/react";

export default function UserWallet() {
  const routeParams = useParams();
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    UserService.getUserWallet(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Invalid Response");
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
      <div className="px-4 sm:px-0 pt-8">
        <h3 className="text-4xl font-bold leading-7 text-gray-900 uppercase">
          User Wallet
        </h3>
        <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">
          Ecocoins details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-bold leading-6 text-gray-900">Available</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.available}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-bold leading-6 text-gray-900">Exchanged</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.exchanged.exchanged}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-bold leading-6 text-gray-900">Total earned</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {Number(data.available) + Number(data.exchanged.exchanged)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
