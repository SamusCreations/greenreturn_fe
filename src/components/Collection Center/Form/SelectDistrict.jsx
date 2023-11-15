import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectDistrict.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export function SelectDistrict({
  field,
  data,
  isInvalid,
  errorMessage,
  onChange,
  isDisabled,
}) {
  const handleCantonChange = (e) => {
    onChange && onChange(e); // Llama a la función de retorno de llamada
  };

  if (data === undefined) {
    data = {};
  }

  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="District"
          placeholder="Select a district"
          selectedKeys={field.value}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
          isDisabled={isDisabled}
          onChange={handleCantonChange}
        >
          {data.length > 0 &&
            data.map((district) => (
              <SelectItem
                key={district.id_district}
                value={district.id_district}
              >
                {district.name}
              </SelectItem>
            ))}
        </Select>
      </>
    </>
  );
}
