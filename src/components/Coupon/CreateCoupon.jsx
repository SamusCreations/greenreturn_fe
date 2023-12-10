import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { UploadFile } from "./Form/uploadFile";
import CategoryService from "../../services/CategoryService";
import CouponService from "../../services/CouponService";
import { SelectCategory } from "./form/SelectCategory";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCoupon() {
  const navigate = useNavigate();
  const [errorshown, setErrorShown] = useState(false)
  // Esquema de validación
  const couponSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(5, "Name needs to be at least of 5 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(15, "Description needs to be at least of 15 characters"),
    unit_cost: yup
      .number()
      .typeError("Price is required")
      .required("Price is required")
      .positive("Price must be a positive number"),
    id_category: yup
      .number()
      .typeError("Category is required")
      .required("Category is required"),
    start_date: yup
      .date()
      .typeError("please enter a valid date")
      .required(),
    end_date: yup
      .date()
      .typeError("please enter a valid date")
      .required()
      .min(new Date(), "Date must be in the furute"),
    fileToUpload: yup
      .mixed()
      .test("required", "Image required", function (value) {
        if(value === '' && errorshown==false){
          toast.error("Image required", {
            duration: 2000,
            position: "bottom-center",
          });
          setErrorShown(true)
        } else if(errorshown == true){
          console.log("Image required")
        }
        return value instanceof File || (value && value[0] instanceof File);
        
      }),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("fileToUpload", reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      id_category: "",
      unit_cost: 0,
      start_date: "",
      end_date: "",
      fileToUpload: "",
    },

    // Asignación de validaciones
    resolver: yupResolver(couponSchema),
  });

  const [error, setError] = useState("");
  
  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      if (couponSchema.isValid()) {
        const dataToSubmit = new FormData();

        Object.entries(DataForm).forEach(([key, value]) => {
          dataToSubmit.append(key, value);
        });
        dataToSubmit.set("start_date", watchStartDate);
        dataToSubmit.set("end_date", watchEndDate);
        dataToSubmit.set("fileToUpload", DataForm.fileToUpload);
        console.log(dataToSubmit);
        //Crear pelicula
        CouponService.createCoupon(dataToSubmit)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.status == 200) {
              toast.success("Created successfully", {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/table-coupon");
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

  const setErrorFalse =(  ) => {
    setErrorShown(false)
  }


  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Lista de Colores

  const watchStartDate = watch("start_date");
  const watchEndDate = watch("end_date");

  //Lista de Unidades de medida
  const [dataCategory, setdataCategory] = useState({});
  const [loadedCategory, setloadedCategory] = useState(false);
  useEffect(() => {
    CategoryService.getcategorys()
      .then((response) => {
        console.log(response);
        setdataCategory(response.data.results);
        setloadedCategory(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setloadedCategory(false);
          throw new Error("Invalid response from server");
        }
      });
  }, []);

  if (!loadedCategory)
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex flex-col">
          <div className="py-8">
            <h1 className="font-bold text-4xl uppercase">Create coupon</h1>
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
                  placeholder="Enter a name for the coupon"
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
                  placeholder="Enter a description for the coupon (Min. 15 characters)"
                  disableAutosize
                  disableAnimation
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
                  name="unit_cost"
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
            {/* Lista de unidades de medida */}
            {loadedCategory && (
              <Controller
                name="id_category"
                control={control}
                render={({ field }) => (
                  <SelectCategory
                    field={field}
                    data={dataCategory}
                    isInvalid={Boolean(errors.id_category)}
                    errorMessage={
                      errors.id_category ? errors.id_category.message : " "
                    }
                    onChange={(e) =>
                      setValue("id_category", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            )}
          </div>

          <div className="m-2">
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="start_date"
                  label="Start Date"
                  type="date"
                  isInvalid={Boolean(errors.start_date)}
                  errorMessage={
                    errors.start_date ? errors.start_date.message : " "
                  }
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter a a start date for the coupon"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="end_date"
                  label="End date"
                  type="date"
                  isInvalid={Boolean(errors.end_date)}
                  errorMessage={errors.end_date ? errors.end_date.message : " "}
                  isRequired
                  labelPlacement="outside"
                  placeholder="Enter an end date for the coupon"
                />
              )}
            />
          </div>

          <div className="m-2">
            <Controller
              name="fileToUpload"
              control={control}
              render={({ field }) => (
                <>
                  <UploadFile field={field} onSubmit={handleFileChange} />
                </>
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
              onClick={setErrorFalse}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
