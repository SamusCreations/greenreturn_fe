import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import favicon from "../../assets/greenreturn_favicon.png";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import UserService from "../../services/UserService";
import toast, { Toaster } from "react-hot-toast";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../assets/Icons";

export default function Signup() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Esquema de validación
  const loginSchema = yup.object({
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
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      identification: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      id_role: 3,
      coin: 0,
      active: 1,
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario

  const [error, setError] = useState("");
  const notify = () =>
    toast.success("User registered succesfully", {
      duration: 4000,
      position: "top-center",
    });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm);
      //Registrar usuario
      UserService.signupUser(DataForm)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            notify();
            return navigate("/login");
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
        <h1 className="text-2xl font-semibold my-2">Register user</h1>
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
                name="identification"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="identification"
                    isRequired
                    label="Identification"
                    placeholder="Enter your identification"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={Boolean(errors.identification)}
                    errorMessage={
                      errors.identification
                        ? errors.identification.message
                        : " "
                    }
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    labelPlacement="outside"
                    isInvalid={Boolean(errors.name)}
                    errorMessage={errors.name ? errors.name.message : " "}
                  />
                )}
              />
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
              <div className="flex gap-2 justify-end ">
                <Button
                  fullWidth
                  color="primary"
                  className="font-semibold"
                  variant="solid"
                  radius="sm"
                  type="submit"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <div className="text-center flex text-sm my-8 justify-center">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className="font-semibold text-primary mx-1">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
