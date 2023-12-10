import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Spinner} from "@nextui-org/react";
import UserService from "../../services/UserService";
import ProvinceService from "../../services/ProvinceService";
import { SelectProvince } from "./Form/SelectProvince";
import CantonService from "../../services/CantonService";
import { SelectCanton } from "./Form/SelectCanton";
import DistrictService from "../../services/DistrictService";
import { SelectDistrict } from "./Form/SelectDistrict";
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateUserProfile() {
  const navigate = useNavigate();

  const routeParams = useParams();

  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setUser] = useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      UserService.getUserById(Number(id))
        .then((response) => {
          console.log(response);
          setUser(response.data.results);
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
  }, [id]);

  // Esquema de validación
  const userShcema = yup.object({
    identification: yup
      .string()
      .required("Identification is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Must be exactly 9 digits")
      .max(9, "Must be exactly 9 digits"),
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
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
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultdata: {
      identification: "",
      name: "",
      surname: "",
      email: "",
      id_role: "",
      id_province: "",
      id_canton: "",
      id_district: "",
      address: "",
      telephone: "",
      coin: "",
      active: 1,
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(userShcema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (userShcema.isValid()) {
        //Crear pelicula
        UserService.updateUser(DataForm)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success("Profile edited correctly", {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate(`/user/profile/${values.id_user}`);
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

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Lista de Provincias
  const [dataProvince, setUserProvince] = useState({});
  const [loadedProvince, setLoadedProvince] = useState(false);
  useEffect(() => {
    ProvinceService.getProvinces()
      .then((response) => {
        console.log(response);
        setUserProvince(response.data.results);
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

  const [dataCanton, setUserCanton] = useState({});
  const [loadedCanton, setLoadedCanton] = useState(false);
  useEffect(() => {
    if (values) {
      CantonService.getCantonByProvince(values.id_province)
        .then((response) => {
          console.log(response);
          setUserCanton(response.data.results);
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

    setUserDistrict(undefined);

    CantonService.getCantonByProvince(e.target.value)
      .then((response) => {
        console.log(response);
        setUserCanton(response.data.results);
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

  const [dataDistrict, setUserDistrict] = useState({});
  const [loadedDistrict, setLoadedDistrict] = useState(false);
  useEffect(() => {
    if (values) {
      DistrictService.getDistrictByCanton(values.id_canton)
        .then((response) => {
          console.log(response);
          setUserDistrict(response.data.results);
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
        setUserDistrict(response.data.results);
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
            <h1 className="font-bold text-4xl uppercase">Edit user profile</h1>
            <p className="text-sm">
              This information will be displayed publicly so be careful what you
              write.
            </p>
          </div>

          <div className="m-2">
            <Controller
              name="identification"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="identification"
                  label="Identification"
                  placeholder="Enter your identification"
                  type="text"
                  labelPlacement="outside"
                  isInvalid={Boolean(errors.identification)}
                  errorMessage={
                    errors.identification ? errors.identification.message : " "
                  }
                  isDisabled
                />
              )}
            />
          </div>

          <div className="m-2 flex">
            <div className="w-1/2 mr-2">
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
                    placeholder="Enter your name"
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <Controller
                name="surname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="surname"
                    isRequired
                    label="Surname"
                    placeholder="Enter your surname"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={Boolean(errors.surname)}
                    errorMessage={errors.surname ? errors.surname.message : " "}
                  />
                )}
              />
            </div>
          </div>

          <div className="m-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  labelPlacement="outside"
                  isInvalid={Boolean(errors.email)}
                  errorMessage={errors.email ? errors.email.message : " "}
                  isDisabled
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
                  label="Street"
                  isInvalid={Boolean(errors.address)}
                  errorMessage={errors.address ? errors.address.message : " "}
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter your street"
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
                  placeholder="Enter your telephone number"
                />
              )}
            />
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
