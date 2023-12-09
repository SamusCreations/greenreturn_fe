import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
  Spinner,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import CCService from "../../services/CollectionCenterService";
import { HomeIcon, SearchIcon } from "../../assets/Icons";
import ProvinceService from "../../services/ProvinceService";
import MaterialService from "../../services/MaterialService";

export function ListCollectionCenter() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedProvince, setSelectedProvince] = React.useState(null);
  const [selectedMaterial, setSelectedMaterial] = React.useState(null);

  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);

  // Error del API
  const [error, setError] = useState("");

  // Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  const [loadedProvince, setLoadedProvince] = useState(false);
  const [loadedMaterial, setLoadedMaterial] = useState(false);

  useEffect(() => {
    // Llamar al API y obtener la lista de centros de colección
    CCService.getCollectionCenter()
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

  // Lista de Provincias
  const [dataProvince, setDataProvince] = useState([]);
  useEffect(() => {
    ProvinceService.getProvinces()
      .then((response) => {
        setDataProvince(response.data.results);
        setLoadedProvince(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          setError(error);
          setLoadedProvince(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  // Lista de materiales
  const [dataMaterial, setDataMaterial] = useState([]);
  useEffect(() => {
    MaterialService.getMaterials()
      .then((response) => {
        setDataMaterial(response.data.results);
        setLoadedMaterial(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          setError(error);
          setLoadedMaterial(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    if (!data) return [];

    let filteredCenters = data;

    if (hasSearchFilter) {
      filteredCenters = filteredCenters.filter((center) =>
        center.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedMaterial && selectedMaterial.target.value) {
      filteredCenters = filteredCenters.filter((center) =>
        center.materials.includes(selectedMaterial.target.value)
      );
    }
    
    /*     if (selectedMaterial && selectedMaterial.target.value) {
      filteredCenters = filteredCenters.filter((center) =>
        center.materials
          .split(",")
          .map(
            (material) => material === selectedMaterial.target.value
          )
      ); 
    }*/

    if (selectedProvince && selectedProvince.target.value) {
      filteredCenters = filteredCenters.filter(
        (center) => center.id_province === selectedProvince.target.value
      );
    }

    return filteredCenters;
  }, [data, filterValue, hasSearchFilter, selectedProvince, selectedMaterial]);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value);
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const onProvinceChange = React.useCallback(
    (value) => {
      setSelectedProvince(value);
    },
    [setSelectedProvince]
  );

  const onMaterialChange = React.useCallback(
    (value) => {
      setSelectedMaterial(value);
    },
    [setSelectedMaterial]
  );

  if (!loaded || !loadedProvince || !loadedMaterial)
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="font-bold text-4xl pt-4 mx-2">
        <h1 className="uppercase">Collection Centers</h1>
      </div>
      {!data && (
        <div className="text-center ">
          <p>Not available yet</p>
        </div>
      )}
      <div className="flex pt-4 pb-6 p-2 sm:pl-0 sm:pr-0">
        <Input
          isClearable
          className="w-full sm:max-w-[25%] mr-2"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Select
          className="w-full sm:max-w-[25%] mr-2"
          items={dataProvince}
          startContent={<SearchIcon />}
          placeholder="Search by province..."
          onChange={onProvinceChange}
        >
          {(data) => (
            <SelectItem key={data.id_province}>{data.name}</SelectItem>
          )}
        </Select>
        <Select
          className="w-full sm:max-w-[25%]"
          items={dataMaterial}
          startContent={<SearchIcon />}
          placeholder="Search by material..."
          onChange={onMaterialChange}
        >
          {(data) => (
            <SelectItem key={data.id_material}>{data.name}</SelectItem>
          )}
        </Select>
      </div>
      <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-3">
        {filteredItems.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
