import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectProvince.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export function SelectProvince({ field, data, isInvalid, errorMessage, onChange }) {
  const handleProvinceChange = (e) => {
    onChange && onChange(e); // Llama a la función de retorno de llamada
  };

  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Province"
          placeholder="Select a province"
          selectedKeys={field.value}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
          onChange={handleProvinceChange}
        >
          {(data) => (
            <SelectItem key={data.id_province}>
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
