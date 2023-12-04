import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectCanton.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export function SelectCanton({
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
    <Select
      {...field}
      items={data}
      label="Canton"
      placeholder="Select a canton"
      selectedKeys={field.value ? [field.value] : []}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      isRequired
      labelPlacement="outside"
      onChange={handleCantonChange}
      isDisabled={isDisabled}
    >
      {data.length > 0 &&
        data.map((canton) => (
          <SelectItem key={canton.id_canton} value={canton.id_canton}>
            {canton.name}
          </SelectItem>
        ))}
    </Select>
  );
}
