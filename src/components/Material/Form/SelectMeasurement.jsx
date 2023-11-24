import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectMeasurement.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectMeasurement({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Measurements"
          placeholder="Select a measurement unit"
          selectedKeys={field.value ? [field.value] : []}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
        >
          {(data) => (
            <SelectItem key={data.id_measurement} startContent={data.value}>
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
