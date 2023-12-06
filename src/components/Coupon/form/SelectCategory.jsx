import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectCategory.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectCategory({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Categorys"
          placeholder="Select a category"
          selectedKeys={field.value ? [field.value] : []}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
        >
          {(data) => (
            <SelectItem key={data.id_category} startContent={data.value}>
              {data.name}
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
