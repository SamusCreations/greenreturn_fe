import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Image } from "@nextui-org/react";
import { PhotoIcon } from "../../../assets/Icons";

export function UploadFile({ field, image_url }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Verifica si field.value es una cadena (datos base64) y establece previewImage en consecuencia
    if (typeof field.value === "string") {
      setPreviewImage(field.value);
    } else {
      // Suponiendo que field.value es un objeto File, actualiza previewImage e imageFile
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(field.value);
      setImageFile(field.value);
    }
  }, [field.value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageFile(file);
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25">
      <div className="text-center">
        <div className="flex text-sm leading-6 text-gray-600 m-2">
          <label
            htmlFor="fileToUpload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            {!previewImage && !image_url && (
              <div className="min-w-full flex flex-col justify-center items-center">
                <div className="mx-auto p-10">
                  <PhotoIcon
                    className="text-default"
                    fill="currentColor"
                    size={48}
                  />
                </div>
                <p className="text-base font-semibold">Select an Image</p>
                <p className="text-xs leading-5 text-gray-600">PNG up to 10MB</p>
              </div>
            )}
            {(previewImage || image_url) && (
              <Image
                src={previewImage || image_url}
                alt="Preview"
                className="max-h-80"
              />
            )}
            <input
              id="fileToUpload"
              name="fileToUpload"
              type="file"
              onChange={handleFileChange}
              accept="image/png"
              className="sr-only"
            />
          </label>
        </div>
        
      </div>
    </div>
  );
}

UploadFile.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  fieldState: PropTypes.shape({
    error: PropTypes.object,
  }),
  image_url: PropTypes.string,
};
