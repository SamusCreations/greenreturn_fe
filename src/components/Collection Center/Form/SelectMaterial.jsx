import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export function SelectMaterial({
  field,
  data,
  isInvalid,
  errorMessage,
  onChange,
}) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Materials"
          placeholder="Select a material"
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
          selectionMode="multiple"
          onChange={onChange}
        >
          {(data) => (
            <SelectItem key={data.id_material} value={data.id_material}>
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
