import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MeasurementService from "../../services/MeasurementService";
import ColorService from "../../services/ColorService";
import { SelectMeasurement } from "./Form/SelectMeasurement";
import { SelectColor } from "./Form/SelectColor";
import MaterialService from "../../services/MaterialService";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMaterial() {
  const navigate = useNavigate();

  // Esquema de validación
  const materialSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(5, "Name needs to be at least of 5 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(15, "Description needs to be at least of 15 characters"),
    image_url: yup.string().required("Image is required"),
    unit_cost: yup
      .number()
      .typeError("Price is required")
      .required("Price is required")
      .positive("Price must be a positive number"),
    id_color: yup
      .number()
      .typeError("Color is required")
      .required("Color is required"),
    id_measurement: yup
      .number()
      .typeError("Measurement unit is required")
      .required("Measurement unit is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
      id_color: "",
      id_measurement: "",
      unit_cost: 0,
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
        MaterialService.createMaterial(DataForm)
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
              return navigate("/table-material");
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

  //Lista de Colores
  const [dataColor, setDataColor] = useState({});
  const [loadedColor, setLoadedColor] = useState(false);
  useEffect(() => {
    ColorService.getAvailables()
      .then((response) => {
        console.log(response);
        setDataColor(response.data.results);
        setLoadedColor(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedColor(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  //Lista de Unidades de medida
  const [dataMeasurement, setDataMeasurement] = useState({});
  const [loadedMeasurement, setLoadedMeasurement] = useState(false);
  useEffect(() => {
    MeasurementService.getMeasurements()
      .then((response) => {
        console.log(response);
        setDataMeasurement(response.data.results);
        setLoadedMeasurement(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMeasurement(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  if (!loadedColor && !loadedMeasurement)
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
            <h1 className="font-bold text-4xl uppercase">Create material</h1>
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
                  placeholder="Enter a name for the material"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  label="Description"
                  isInvalid={Boolean(errors.description)}
                  errorMessage={
                    errors.description ? errors.description.message : " "
                  }
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter a description for the material (Min. 15 characters)"
                  disableAutosize
                  disableAnimation
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="image_url"
                  label="Image"
                  isInvalid={Boolean(errors.image_url)}
                  errorMessage={
                    errors.image_url ? errors.image_url.message : " "
                  }
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter image URL"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="unit_cost"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="unit_cost"
                  type="number"
                  label="Price"
                  placeholder="0"
                  isInvalid={Boolean(errors.unit_cost)}
                  errorMessage={
                    errors.unit_cost ? errors.unit_cost.message : " "
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  isRequired
                  labelPlacement="outside"
                />
              )}
            />
          </div>

          <div className="m-2">
            {/* Lista de colores */}
            {loadedColor && (
              <Controller
                name="id_color"
                control={control}
                render={({ field }) => (
                  <SelectColor
                    field={field}
                    data={dataColor}
                    isInvalid={Boolean(errors.id_color)}
                    errorMessage={
                      errors.id_color ? errors.id_color.message : " "
                    }
                    onChange={(e) =>
                      setValue("id_color", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            )}
          </div>

          <div className="m-2">
            {/* Lista de unidades de medida */}
            {loadedMeasurement && (
              <Controller
                name="id_measurement"
                control={control}
                render={({ field }) => (
                  <SelectMeasurement
                    field={field}
                    data={dataMeasurement}
                    isInvalid={Boolean(errors.id_measurement)}
                    errorMessage={
                      errors.id_measurement
                        ? errors.id_measurement.message
                        : " "
                    }
                    onChange={(e) =>
                      setValue("id_measurement", e.target.value, {
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
