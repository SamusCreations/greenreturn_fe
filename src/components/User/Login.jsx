import {
  Input,
  Button,
  Card,
  CardBody,
  Image,
  Checkbox,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import favicon from "../../assets/greenreturn_favicon.png";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import UserService from "../../services/UserService";
import toast, { Toaster } from "react-hot-toast";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../assets/Icons";

export default function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Esquema de validación
  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      email: "",
      password: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario

  const [error, setError] = useState("");
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      UserService.loginUser(DataForm)
        .then((response) => {
          console.log(response);
          if (
            response.data.results != null &&
            response.data.results != undefined &&
            response.data.results != "Usuario no valido"
          ) {
            //Usuario es correcto
            saveUser(response.data.results);
            toast.success("Welcome", {
              duration: 4000,
              position: "top-center",
            });
            return navigate("/");
          } else {
            //Usuario no es valido
            toast.error("Email or password is invalid", {
              duration: 4000,
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    } catch (e) {
      // handle your error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Toaster />
      <div className="flex flex-col text-center justify-center items-center my-4">
        <Image
          radius="none"
          alt="favicon"
          src={favicon}
          className="mx-auto"
          isBlurred
          width={100}
        />
        <h1 className="text-2xl font-semibold my-2">Login to your account</h1>
      </div>
      <div className="my-6">
        <Card className="max-w-full w-[500px] p-4">
          <CardBody className="overflow-hidden">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit, onError)}
              noValidate
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    labelPlacement="outside"
                    className="my-2"
                    isInvalid={Boolean(errors.email)}
                    errorMessage={errors.email ? errors.email.message : " "}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    labelPlacement="outside"
                    className="my-2"
                    isInvalid={Boolean(errors.password)}
                    errorMessage={
                      errors.password ? errors.password.message : " "
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
              <div className="flex justify-between my-2">
                <Checkbox>
                  <p className="font-normal text-sm">Remember me</p>
                </Checkbox>
                <Link to="#">
                  <p className="font-semibold text-sm text-primary">
                    Forgot password?
                  </p>
                </Link>
              </div>
              <div className="flex gap-2 justify-end ">
                <Button
                  fullWidth
                  color="primary"
                  className="font-semibold"
                  variant="solid"
                  radius="sm"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <div className="text-center flex text-sm my-8 justify-center">
          <p>Don&apos;t have an account yet?</p>
          <Link to={"/signup"}>
            <p className="font-semibold text-primary mx-1">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
