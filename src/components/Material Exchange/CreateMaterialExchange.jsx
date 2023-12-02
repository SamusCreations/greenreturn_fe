import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MaterialExchangeService from "../../services/MaterialExchangeService";
import CollectionCenterService from "../../services/CollectionCenterService";
import UserService from "../../services/UserService";
import { Spinner } from "@nextui-org/spinner";
import { SelectUser } from "./form/SelectUser";
import { SelectAvailableMaterials } from "./form/SelectAvailableMaterials";
import { Button, Tooltip } from "@nextui-org/react";
import { DeleteIcon, PlusIcon } from "../../assets/Icons";

export function CreateMaterialExchange() {
  const navigate = useNavigate();

  const materialExchangeSchema = yup.object({
    id_user: yup
      .number()
      .typeError("User is required")
      .required("User is required"),
    id_collection_center: yup
      .number()
      .typeError("Collection Center is required")
      .required("Collection Center is required"),
    details: yup.array().of(
      yup.object().shape({
        id_material: yup
          .number()
          .typeError("Material is required")
          .required("Material is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .typeError("Quantity is required"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_user: "",
      id_collection_center: 2,
      total: "",
      details: [
        {
          id_material: "",
          quantity: "",
          unit_cost: "",
          subtotal: "",
        },
      ],
    },
    // Asignación de validaciones
    resolver: yupResolver(materialExchangeSchema),
  });

  const [error, setError] = useState("");
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (materialExchangeSchema.isValid()) {
        //Crear pelicula
        MaterialExchangeService.createMaterialExchange(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success("Created successfully", {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/table-material-exchange");
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

        throw new Error("Invalid response from server");
      }
    }
  };

  const onError = (errors, e) => console.log(errors, e);
  //Resultado de consumo del API, respuesta
  const [dataCc, setDataCc] = useState(null);

  //Booleano para establecer sí se ha recibido respuesta
  const [loadedCc, setloadedCc] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    CollectionCenterService.getCollectionCenterById(1)
      .then((response) => {
        setDataCc(response.data.results);
        console.log(response.data);
        console.log(response.data.id_color);
        setError(response.error);
        setloadedCc(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataUser, setDataUser] = useState(null);

  //Booleano para establecer sí se ha recibido respuesta
  const [loadedUser, setLoadedUser] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    UserService.getUserByRole(3)
      .then((response) => {
        setDataUser(response.data.results);
        console.log(response.data);
        console.log(response.data.id_color);
        setError(response.error);
        setLoadedUser(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const [dataCm, setDataCm] = useState(null);

  //Booleano para establecer sí se ha recibido respuesta
  const [loadedCm, setloadedCm] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    CollectionCenterService.getCollectionByCcId(1)
      .then((response) => {
        setDataCm(response.data.results);
        console.log(response.data);
        console.log(response.data.id_color);
        setError(response.error);
        setloadedCm(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, []);

  const watchDetail = watch("details");
  const watchTotal = watch("total");

  //On change para realizar los calculos
  const handleInputChange = (index, name, value) => {
    //asignar valor en el formulario al control indicado

    setValue(name, value);
    //Obtienes todos los valores del formulario

    if (watchDetail[index].quantity == 0) {
      removeDetail(index);
    }
    const valores = getValues();
    //console.log(watchDetail[index].id_material)
    const material = dataCm.find(
      (material) => material.id_material === watchDetail[index].id_material
    );
    let total = 0;
    //console.log(dataCm.find(material => material.id_material === watchDetail[index].id_material))
    console.log(material.unit_cost);
    //console.log(valores.details[index]);
    setValue(
      `details.${index}.subtotal`,
      material.unit_cost * watchDetail[index].quantity
    );
    valores.details.map((item, index) => {
      //Acordarse castear o convertir a número
      total += watchDetail[index].subtotal;
    });

    setValue(`details.${index}.unit_cost`, material.unit_cost);
    setValue("total", total);
  };

  const [dataSelectedUser, setDataSelectedUser] = useState({});
  const [loadedSelectedUser, setLoadedSelectedUser] = useState(false);

  const handleSelectionUser = (e) => {
    setValue("id_user", e.target.value, {
      shouldValidate: true,
    });

    UserService.getUserById(e.target.value)
      .then((response) => {
        console.log(response);
        setDataSelectedUser(response.data.results);
        setLoadedSelectedUser(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedSelectedUser(false);
          throw new Error("Invalid response from server");
        }
      });
  };

  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const removeDetail = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };

  const addNewDetail = () => {
    append({
      id_material: "",
      quantity: "",
      unit_cost: "",
      subtotal: "",
    });
  };

  if (!loadedCc || !loadedUser || !loadedCm)
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
          <div>
            <div className="py-8">
              <h1 className="font-bold text-4xl uppercase">
                Create material exchange
              </h1>
            </div>
            <div className="flex">
              <div className="flex-1">
                <p className="py-2">
                  <span className="font-bold uppercase">Bill to</span>
                </p>
                <div className="max-w-[66%] flex justify-center items-center">
                  <p className="pr-1">
                    <span className="font-bold">Customer:</span>
                  </p>
                  <Controller
                    name="id_user"
                    control={control}
                    render={({ field }) => (
                      <SelectUser
                        field={field}
                        data={dataUser}
                        isInvalid={Boolean(errors.id_user)}
                        errorMessage={
                          errors.id_user ? errors.id_user.message : " "
                        }
                        onChange={handleSelectionUser}
                      />
                    )}
                  />
                </div>
                <p className="py-1">
                  <span className="font-bold">Identification:</span>{" "}
                  {loadedSelectedUser && dataSelectedUser
                    ? dataSelectedUser.identification
                    : "No information"}
                </p>
                <p className="py-1">
                  <span className="font-bold">Email Address:</span>{" "}
                  {loadedSelectedUser && dataSelectedUser
                    ? dataSelectedUser.email
                    : "No information"}
                </p>
                <p className="py-1">
                  <span className="font-bold">Telephone Number:</span>{" "}
                  {loadedSelectedUser &&
                  dataSelectedUser &&
                  dataSelectedUser.telephone
                    ? dataSelectedUser.telephone
                    : "No information"}
                </p>
                <p className="py-1">
                  <span className="font-bold">Address:</span>{" "}
                  {loadedSelectedUser &&
                  dataSelectedUser &&
                  dataSelectedUser.district &&
                  dataSelectedUser.canton &&
                  dataSelectedUser.province
                    ? `${dataSelectedUser.district.name}, ${dataSelectedUser.canton.name}, ${dataSelectedUser.province.name}`
                    : "No information"}
                </p>
                <p className="py-1">
                  <span className="font-bold">Street:</span>{" "}
                  {loadedSelectedUser &&
                  dataSelectedUser &&
                  dataSelectedUser.address
                    ? dataSelectedUser.address
                    : "No information"}
                </p>
              </div>
              <div className="flex-1">
                <p className="py-2">
                  <span className="font-bold uppercase">Exchanged at</span>
                </p>
                <p className="py-1">
                  <span className="font-bold">Collection Center:</span>{" "}
                  {dataCc.name}
                </p>
                <p className="py-1">
                  <span className="font-bold">Address:</span> {dataCc.address}
                </p>
                <p className="py-1">
                  <span className="font-bold">Telephone:</span>{" "}
                  {dataCc.telephone}
                </p>
                <p className="py-1">
                  <span className="font-bold">Administrator:</span>{" "}
                  {dataCc.administrator.name} {dataCc.administrator.surname}
                </p>
                <p className="py-1">
                  <span className="font-bold uppercase">Date</span>
                </p>
                <p>{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="py-2">
              <div className="flex items-center justify-between">
                <p className="py-2">
                  <span className="font-bold uppercase">Materials</span>
                </p>
                <Tooltip color="primary" content="Add" closeDelay={0}>
                  <span className="text-primary cursor-pointer">
                    <Button
                      color="primary"
                      size="sm"
                      variant="light"
                      onClick={addNewDetail}
                      isIconOnly
                    >
                      <PlusIcon />
                    </Button>
                  </span>
                </Tooltip>
              </div>
              <div className="border-t borderslate-900/5">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <Controller
                      name={`details.${index}.id_material`}
                      control={control}
                      field={field}
                      render={({ field }) => (
                        <SelectAvailableMaterials
                          field={field}
                          data={dataCm}
                          control={control}
                          key={index}
                          Index={index}
                          isInvalid={
                            errors?.details
                              ? Boolean(errors?.details[index]?.id_material)
                              : false
                          }
                          isInvalidQty={
                            errors?.details
                              ? Boolean(errors?.details[index]?.quantity)
                              : false
                          }
                          onRemove={removeDetail}
                          onInputChange={handleInputChange}
                          errorMessage={
                            errors?.details &&
                            errors?.details[index]?.id_material
                              ? errors?.details[index]?.id_material?.message
                              : " "
                          }
                          errorMessageQty={
                            errors?.details && errors?.details[index]?.quantity
                              ? errors?.details[index]?.quantity?.message
                              : " "
                          }
                          onChange={(e) =>
                            setValue(
                              `details${index}.id_material`,
                              e.target.value,
                              {
                                shouldValidate: true,
                              }
                            )
                          }
                        />
                      )}
                    />
                    <div className="flex flex-row">
                      <h2 className="text-1xl font-extrabold uppercase pr-1">
                        Price:{" "}
                      </h2>
                      <p key={index}>{watchDetail[index].unit_cost}</p>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="text-1xl font-extrabold uppercase pr-1">
                        Amount:
                      </h2>
                      <p key={index}>
                        {isNaN(watchDetail[index]?.subtotal)
                          ? 0
                          : watchDetail[index]?.subtotal}
                      </p>
                    </div>
                    <Tooltip color="danger" content="Delete" closeDelay={0}>
                      <span className="text-danger cursor-pointer">
                        <Button
                          color="danger"
                          size="sm"
                          variant="light"
                          onClick={removeDetail}
                          isIconOnly
                        >
                          <DeleteIcon />
                        </Button>
                      </span>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t borderslate-900/5">
              <h2 className="text-1xl  pr-1 py-2">
                <span className="font-bold uppercase">Total:</span>{" "}
                {watchTotal ? watchTotal : 0} ecocoins
              </h2>
            </div>

            <div className="flex justify-center items-center m-6">
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
        </div>
      </form>
    </>
  );
}
