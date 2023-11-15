import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MeasurementService from '../../services/MeasurementService';
import ColorService from '../../services/ColorService';
import { SelectMeasurement } from './Form/SelectMeasurement';
import { SelectColor } from './Form/SelectColor';
import MaterialService from '../../services/MaterialService';
import { Button, Input, Spinner, Textarea } from '@nextui-org/react';
import UploadFile from './Form/uploadFile';
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMaterial() {
  const navigate = useNavigate();

  // Esquema de validación
  const materialSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(5, 'Name needs to be at least of 5 characters'),
    description: yup
      .string()
      .required('Description is required')
      .min(15, 'Description needs to be at least of 15 characters'),
    unit_cost: yup
      .number()
      .typeError('Price is required')
      .required('Price is required')
      .positive('Price must be a positive number'),
    id_color: yup
      .number()
      .typeError('Color is required')
      .required('Color is required'),
    id_measurement: yup
      .number()
      .typeError('Measurement unit is required')
      .required('Measurement unit is required'),
    fileToUpload: yup
      .mixed()
      .test('required', 'Image required', function (value) {
        // La siguiente condición verifica si el campo de imagen es un Blob o si es un archivo seleccionado
        return value instanceof File || (value && value[0] instanceof File);
      }),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('fileToUpload', reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      id_color: '',
      id_measurement: '',
      unit_cost: 0,
      fileToUpload: '',
    },
    
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState('');

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:');
    console.log(DataForm);

    try {
      if (materialSchema.isValid()) {
        const dataToSubmit = new FormData();

        Object.entries(DataForm).forEach(([key, value]) => {
          dataToSubmit.append(key, value);
        });


        dataToSubmit.set('fileToUpload', DataForm.fileToUpload);
        console.log(dataToSubmit);
        //Crear pelicula
        MaterialService.createMaterial(dataToSubmit)
          .then((response) => {
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.status == 200) {
              toast.success('Created successfully', {
                duration: 4000,
                position: 'top-center',
              });
              // Redireccion a la tabla
              return navigate('/table-material');
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error('Invalid response from server');
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
    ColorService.getAvailables(-1)
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
          throw new Error('Invalid response from server');
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
          throw new Error('Invalid response from server');
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
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        method="POST"
        encType="multipart/form-data"
      >
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
                  errorMessage={errors.name ? errors.name.message : ' '}
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
                    errors.description ? errors.description.message : ' '
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
                    errors.unit_cost ? errors.unit_cost.message : ' '
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
                      errors.id_color ? errors.id_color.message : ' '
                    }
                    onChange={(e) =>
                      setValue('id_color', e.target.value, {
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
                        : ' '
                    }
                    onChange={(e) =>
                      setValue('id_measurement', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <Controller
                      name="fileToUpload"
                      control={control}
                      render={({ field }) => (
                        <>
                          <UploadFile
                            field={field}
                            onChange={handleFileChange}
                          />
                        </>
                      )}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG 5MB</p>
              </div>
            </div>
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
