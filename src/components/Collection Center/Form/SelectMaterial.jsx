import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectMaterial({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Materials"
          placeholder="Select a material"
          value={field.value}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
          selectionMode="multiple"
        >
          {(data) => (
            <SelectItem key={data.id_material}>
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
