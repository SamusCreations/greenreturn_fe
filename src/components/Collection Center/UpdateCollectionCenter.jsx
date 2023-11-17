import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import CollectionCenterService from "../../services/CollectionCenterService";
import UserService from "../../services/UserService";
import MaterialService from "../../services/MaterialService";
import { SelectAdministrator } from "./Form/SelectAdministrator";
import ProvinceService from "../../services/ProvinceService";
import { SelectProvince } from "./Form/SelectProvince";
import CantonService from "../../services/CantonService";
import { SelectCanton } from "./Form/SelectCanton";
import DistrictService from "../../services/DistrictService";
import { SelectDistrict } from "./Form/SelectDistrict";
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateCollectionCenter() {
  const navigate = useNavigate();

  const routeParams = useParams();

  const id = routeParams.id || null;
  console.log(id);
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      CollectionCenterService.getCollectionCenterById(Number(id))
        .then((response) => {
          console.log(response);
          setValores(response.data.results);
          setError(response.error);
          const selectedIds = response.data.results.materials.map(
            (item) => item.id_material
          );
          setSelectedValues(selectedIds);
          setValue("materials", selectedIds);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);

            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [id]);

  // Esquema de validación
  const materialSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(5, "Name needs to be at least of 5 characters"),
    id_province: yup
      .number()
      .typeError("Province is required")
      .required("Province is required"),
    id_canton: yup
      .number()
      .typeError("Canton is required")
      .required("Canton is required"),
    id_district: yup
      .number()
      .typeError("District is required")
      .required("District is required"),
    address: yup.string().required("Address is required"),
    telephone: yup
      .number()
      .typeError("Telephone is required")
      .required("Telephone is required")
      .min(8, "Name needs to be at least of 8 numbers"),
    schedule: yup
      .string()
      .required("Schedule is required")
      .min(10, "Schedule needs to be at least of 10 characters"),
    id_user: yup
      .number()
      .typeError("Administrator is required")
      .required("Administrator is required"),
    materials: yup
      .array()
      .required("Material is required")
      .min(1, "Material is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      id_province: "",
      id_canton: "",
      id_district: "",
      address: "",
      telephone: "",
      schedule: "",
      id_user: "",
      active: 1,
      materials: [],
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (materialSchema.isValid()) {
        //Crear pelicula
        CollectionCenterService.updateCollectionCenter(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success("Updated successfully", {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/table-collection-center");
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Invalid response from server");
            }
          });
      }
    } catch (e) {
      //Capturar error
      if (error instanceof SyntaxError) {
        console.log(error);
        setError(error);
        setLoadedAdmin(false);
        throw new Error("Invalid response from server");
      }
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Lista de Administradores
  const [dataAdmin, setDataAdmin] = useState({});
  const [loadedAdmin, setLoadedAdmin] = useState(false);
  useEffect(() => {
    if (values) {
      UserService.getAvailableAdministrators(values.id_collection_center)
        .then((response) => {
          console.log(response);
          setDataAdmin(response.data.results);
          setLoadedAdmin(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedAdmin(false);
            throw new Error("Invalid response from server");
          }
        });
    }
  }, [values]);

  //Lista de Materiales
  const [dataMaterial, setDataMaterial] = useState({});
  const [loadedMaterial, setLoadedMaterial] = useState(false);
  useEffect(() => {
    MaterialService.getMaterials()
      .then((response) => {
        console.log(response);
        setDataMaterial(response.data.results);
        setLoadedMaterial(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMaterial(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  //Lista de Provincias
  const [dataProvince, setDataProvince] = useState({});
  const [loadedProvince, setLoadedProvince] = useState(false);
  useEffect(() => {
    ProvinceService.getProvinces()
      .then((response) => {
        console.log(response);
        setDataProvince(response.data.results);
        setLoadedProvince(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedProvince(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  const [dataCanton, setDataCanton] = useState({});
  const [loadedCanton, setLoadedCanton] = useState(false);
  useEffect(() => {
    if (values) {
      CantonService.getCantonByProvince(values.id_province)
        .then((response) => {
          console.log(response);
          setDataCanton(response.data.results);
          setLoadedCanton(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedCanton(false);
            throw new Error("Invalid response from server");
          }
        });
    }
  }, [values]);

  const handleSelectionProvince = (e) => {
    setValue("id_province", e.target.value, {
      shouldValidate: true,
    });

    setValue("id_canton", "");

    setValue("id_district", "");

    setDataDistrict(undefined);

    CantonService.getCantonByProvince(e.target.value)
      .then((response) => {
        console.log(response);
        setDataCanton(response.data.results);
        setLoadedCanton(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedCanton(false);
          throw new Error("Invalid response from server");
        }
      });
  };

  const [dataDistrict, setDataDistrict] = useState({});
  const [loadedDistrict, setLoadedDistrict] = useState(false);
  useEffect(() => {
    if (values) {
      DistrictService.getDistrictByCanton(values.id_canton)
        .then((response) => {
          console.log(response);
          setDataDistrict(response.data.results);
          setLoadedDistrict(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedDistrict(false);
            throw new Error("Invalid response from server");
          }
        });
    }
  }, [values]);

  const handleSelectionCanton = (e) => {
    setValue("id_canton", e.target.value, {
      shouldValidate: true,
    });

    setValue("id_district", "");

    DistrictService.getDistrictByCanton(e.target.value)
      .then((response) => {
        console.log(response);
        setDataDistrict(response.data.results);
        setLoadedDistrict(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedDistrict(false);
          throw new Error("Invalid response from server");
        }
      });
  };

  const [SelectedValues, setSelectedValues] = useState(new Set([]));

  const handleSelectionMaterials = (e) => {
    const selectedValues = e.target.value
      ? new Set(e.target.value.split(","))
      : new Set();
    const materialsArray = e.target.value ? e.target.value.split(",") : [];

    setSelectedValues(selectedValues);
    setValue("materials", materialsArray);
    console.log(getValues());
  };

  if (!values)
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="flex flex-col">
          <div className="py-8">
            <h1 className="font-bold text-4xl uppercase">
              Update collection center
            </h1>
            <p className="text-sm">
              This information will be displayed publicly so be careful what you
              write.
            </p>
          </div>

          <div className="m-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  label="Name"
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name ? errors.name.message : " "}
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter a name for the collection center"
                />
              )}
            />
          </div>

          <div className="m-2 flex">
            <div className="w-1/3 mr-2">
              {/* Lista de provincias */}
              {loadedProvince && (
                <Controller
                  name="id_province"
                  control={control}
                  render={({ field }) => (
                    <SelectProvince
                      field={field}
                      data={dataProvince}
                      isInvalid={Boolean(errors.id_province)}
                      errorMessage={
                        errors.id_province ? errors.id_province.message : " "
                      }
                      onChange={handleSelectionProvince}
                    />
                  )}
                />
              )}
            </div>

            <div className="w-1/3">
              {/* Lista de cantones */}
              {
                <Controller
                  name="id_canton"
                  control={control}
                  render={({ field }) => (
                    <SelectCanton
                      field={field}
                      data={dataCanton}
                      isInvalid={Boolean(errors.id_canton)}
                      errorMessage={
                        errors.id_canton ? errors.id_canton.message : " "
                      }
                      onChange={handleSelectionCanton}
                      isDisabled={!loadedCanton || dataCanton === undefined}
                    />
                  )}
                />
              }
            </div>

            <div className="w-1/3 ml-2">
              {/* Lista de distritos */}
              {
                <Controller
                  name="id_district"
                  control={control}
                  render={({ field }) => (
                    <SelectDistrict
                      field={field}
                      data={dataDistrict}
                      isInvalid={Boolean(errors.id_district)}
                      errorMessage={
                        errors.id_district ? errors.id_district.message : " "
                      }
                      onChange={(e) =>
                        setValue("id_district", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      isDisabled={!loadedDistrict || dataDistrict === undefined}
                    />
                  )}
                />
              }
            </div>
          </div>

          <div className="m-2">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  label="Address"
                  isInvalid={Boolean(errors.address)}
                  errorMessage={errors.address ? errors.address.message : " "}
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter the address of the collection center"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="telephone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="telephone"
                  label="Telephone"
                  isInvalid={Boolean(errors.telephone)}
                  errorMessage={
                    errors.telephone ? errors.telephone.message : " "
                  }
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter the telephone number of the collection center"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="schedule"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="schedule"
                  label="Schedule"
                  isInvalid={Boolean(errors.schedule)}
                  errorMessage={errors.schedule ? errors.schedule.message : " "}
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter the schedule of the collection center (Min. 10 characters)"
                />
              )}
            />
          </div>

          <div className="m-2">
            {/* Lista de administradores */}
            {loadedAdmin && (
              <Controller
                name="id_user"
                control={control}
                render={({ field }) => (
                  <SelectAdministrator
                    field={field}
                    data={dataAdmin}
                    isInvalid={Boolean(errors.id_user)}
                    errorMessage={errors.id_user ? errors.id_user.message : " "}
                    onChange={(e) =>
                      setValue("id_user", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            )}
          </div>

          <div className="m-2">
            {/* Lista de materiales */}
            {loadedMaterial && (
              <Controller
                name="materials"
                control={control}
                render={({ field }) => (
                  <>
                    <>
                      <Select
                        {...field}
                        items={dataMaterial}
                        label="Materials"
                        placeholder="Select a material"
                        isInvalid={Boolean(errors.materials)}
                        errorMessage={
                          errors.materials ? errors.materials.message : " "
                        }
                        isRequired
                        labelPlacement="outside"
                        selectionMode="multiple"
                        onChange={handleSelectionMaterials}
                        selectedKeys={SelectedValues}
                      >
                        {(data) => (
                          <SelectItem
                            key={data.id_material}
                            value={data.id_material}
                          >
                            {data.name}
                          </SelectItem>
                        )}
                      </Select>
                    </>
                  </>
                )}
              />
            )}
          </div>

          <div className="flex justify-center items-center m-6 border-t">
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              radius="sm"
              className="uppercase font-medium text-2xl m-4"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
