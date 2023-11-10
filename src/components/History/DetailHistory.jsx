import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialExchangeService from "../../services/MaterialExchangeService";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "name",
    label: "ITEM",
  },
  {
    key: "quantity",
    label: "QTY",
  },
  {
    key: "unit_cost",
    label: "PRICE",
  },
  {
    key: "subtotal",
    label: "AMOUNT",
  },
];

export function DetailHistory() {
  const routeParams = useParams();
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    MaterialExchangeService.getMaterialExchangeById(routeParams.id)
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
    <div className="flex flex-col">
      <div className="font-bold text-4xl py-8">
        <h1>Detail</h1>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="py-2">
            <span className="font-bold uppercase">Bill to</span>
          </p>
          <p className="py-1">
            <span className="font-bold">Identification:</span>{" "}
            {data.user.identification}
          </p>
          <p className="py-1">
            <span className="font-bold">Customer Name:</span> {data.user.name}{" "}
            {data.user.surname}
          </p>
          <p className="py-1">
            <span className="font-bold">Email Address:</span> {data.user.email}
          </p>
          <p className="py-1">
            <span className="font-bold">Telephone Number:</span>{" "}
            {data.user.telephone}
          </p>
          <p className="py-1">
            <span className="font-bold">Address:</span>{" "}
            {data.user.district.name}, {data.user.canton.name},{" "}
            {data.user.province.name}
          </p>
          <p className="py-1">
            <span className="font-bold">Street:</span> {data.user.address}
          </p>
        </div>
        <div className="flex-1">
          <p className="py-2">
            <span className="font-bold uppercase">Exchanged at</span>
          </p>
          <p className="py-1">
            <span className="font-bold">Collection Center:</span>{" "}
            {data.collection_center.name}
          </p>
          <p className="py-1">
            <span className="font-bold">Address:</span>{" "}
            {data.collection_center.address}
          </p>
          <p className="py-1">
            <span className="font-bold">Telephone:</span>{" "}
            {data.collection_center.telephone}
          </p>
          <p className="py-2 pt-8">
            <span className="font-bold uppercase">Date</span>
          </p>
          <p className="py-1 ">
            {data.date_created}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-4">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data.details}>
            {(item) => (
              <TableRow key={item.id_material}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-end py-4">
        <p><span className="font-bold">Total:</span> {data.total} ecocoins</p>
      </div>
    </div>
  );
}
