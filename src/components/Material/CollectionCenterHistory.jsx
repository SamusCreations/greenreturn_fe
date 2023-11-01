import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Link,
  Tooltip,
} from "@nextui-org/react";
import MaterialExchangeService from "../../services/MaterialExchangeService";
import { EyeIcon } from "../../assets/Icons";

const columns = [
  {
    key: "id_exchange",
    label: "ID EXCHANGE",
  },
  {
    key: "total",
    label: "TOTAL",
  },
  {
    key: "id_collection_center",
    label: "ID COLLECTION CENTER",
  },
  {
    key: "date_created",
    label: "DATE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export default function CollectionCenterHistory() {
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState("");
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    MaterialExchangeService.getCollectionCenterHistory(1)
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

  if (!loaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col gap-3">
      <div className="font-bold text-4xl py-8">
        <h1 className="capitalize">Collection Center History</h1>
      </div>
      <Table aria-label="History dynamic table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-center" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow className="text-center" key={item.id_exchange}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? (
                    <div className="relative flex justify-center items-center">
                      <Button
                        size="sm"
                        variant="light"
                        as={Link}
                        href={`/history-detail/${item.id_exchange}`}
                      >
                        <Tooltip content="Details">
                          <span className="text-lg text-default-400 cursor-pointer">
                            <EyeIcon />
                          </span>
                        </Tooltip>
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
