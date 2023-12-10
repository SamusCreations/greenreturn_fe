import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import UserService from "../../services/UserService";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../assets/Icons";
import { UserContext } from "../../context/UserContext";
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateUserPassword() {
  const routeParams = useParams();
  const navigate = useNavigate();

  const idFromRoute = routeParams.id || null; // ID desde la ruta
  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);

  const loggedInUserId = userData.id_user;

  // Validación para verificar si el usuario tiene permiso para cambiar la contraseña
  useEffect(() => {
    if (idFromRoute && loggedInUserId && idFromRoute !== loggedInUserId) {
      // Redirigir a la página de acceso no autorizado
      navigate("/unauthorized");
    }
  }, [idFromRoute, loggedInUserId, navigate]);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
    currentPassword: yup.string().required("Password is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters long")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultdata: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    values,
    // Asignación de validaciones
    resolver: yupResolver(userShcema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      if (userShcema.isValid()) {
        // Contraseñas coinciden
        UserService.changePassword(DataForm)
          .then((response) => {
            setError(response.error);
            if (response.data.results != null) {
              toast.success("Password changed correctly", {
                duration: 4000,
                position: "top-center",
              });
              return navigate(`/user/profile/${values.id_user}`);
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              setError(error);
              throw new Error("Invalid response from server");
            }
          });
      }
    } catch (e) {
      if (error instanceof SyntaxError) {
        setError(error);
        throw new Error("Invalid response from server");
      }
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="flex flex-col">
          <div className="py-8">
            <h1 className="font-bold text-4xl uppercase">Change password</h1>
            <p className="text-sm">
              The password will change, so be careful and remember what you
              write.
            </p>
          </div>

          <div className="m-2">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  isRequired
                  label="Password"
                  placeholder="Enter the new password"
                  type={isVisible ? "text" : "password"}
                  labelPlacement="outside"
                  className="my-2"
                  isInvalid={Boolean(errors.password)}
                  errorMessage={errors.password ? errors.password.message : " "}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />
          </div>

          <div className="m-2 flex">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  isRequired
                  label="Confirm Password"
                  placeholder="Enter the new password to confirm"
                  type={isVisible ? "text" : "password"}
                  labelPlacement="outside"
                  className="my-2"
                  isInvalid={Boolean(errors.confirmPassword)}
                  errorMessage={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : " "
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
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
