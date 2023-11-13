import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectColor.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectColor({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Color"
          placeholder="Select a color"
          value={field.value}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
        >
          {(data) => (
            <SelectItem
              key={data.id_color}
              startContent={
                <div
                  className="w-5 h-5 rounded-full mx-1"
                  style={{ backgroundColor: data.value }}
                />
              }
            >
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
