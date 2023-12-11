import React, { useEffect, useState } from "react";
import MaterialService from "../../services/MaterialService";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
  Input,
} from "@nextui-org/react";
import fallback from "../../assets/fallback.png";
import { EcocoinIcon, SearchIcon } from "../../assets/Icons";

export function ListMaterial() {
  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);

  // Error del API
  const [error, setError] = useState("");

  // Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  // Valor de búsqueda
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Llamar al API y obtener la lista de materiales
    MaterialService.getMaterials()
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    if (!data) return [];

    let filteredMaterials = data;

    if (hasSearchFilter) {
      filteredMaterials = filteredMaterials.filter((material) =>
        material.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredMaterials;
  }, [data, filterValue]);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value);
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
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
      <div className="font-bold text-4xl pt-4 mx-2">
        <h1 className="uppercase">Materials</h1>
      </div>
      {!data && (
        <div className="text-center">
          <p>Not available yet</p>
        </div>
      )}
      <div className="pt-4 pb-6 p-2 sm:pl-0 sm:pr-0">
        <Input
          isClearable
          className="w-full sm:max-w-[25%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {filteredItems.map((item, index) => (
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
              <CardFooter className=" text-small justify-between">
                <b>{item.name}</b>

                <p className="flex flex-row items-center justify-end text-default-500">
                  <EcocoinIcon size={24} />
                  {item.unit_cost}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
