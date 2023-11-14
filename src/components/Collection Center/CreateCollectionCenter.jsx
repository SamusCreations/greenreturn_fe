import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import CollectionCenterService from "../../services/CollectionCenterService";
import UserService from "../../services/UserService";
import MaterialService from "../../services/MaterialService";
import { SelectAdministrator } from "./Form/SelectAdministrator";
import { SelectMaterial } from "./Form/SelectMaterial";
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCollectionCenter() {
  const navigate = useNavigate();

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
        CollectionCenterService.createCollectionCenter(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
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
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Lista de Administradores
  const [dataAdmin, setDataAdmin] = useState({});
  const [loadedAdmin, setLoadedAdmin] = useState(false);
  useEffect(() => {
    UserService.getAvailableAdministrators()
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
  }, []);

  //Lista de Materiales
  const [dataMatrerial, setDataMaterial] = useState({});
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

  if (!loadedAdmin && !loadedMaterial)
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
              Create collection center
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
                  disableAutosize
                  disableAnimation
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
                  <SelectMaterial
                    field={field}
                    data={dataMatrerial}
                    isInvalid={Boolean(errors.materials)}
                    errorMessage={
                      errors.materials ? errors.materials.message : " "
                    }
                    onChange={(e) =>
                      setValue("materials", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
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
