import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectUser.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export function SelectUser({ field, data, isInvalid, errorMessage, onChange }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          defaultItems={data}
          placeholder="Select a customer"
          selectedKeys={field.value ? [field.value] : []}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
          onChange={onChange}
          aria-label="Select a customer"
          variant="underlined"
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div className="flex flex-col text-base">
                  <span>
                    {item.data.name} {item.data.surname}
                  </span>
                </div>
              </div>
            ));
          }}
        >
          {(user) => (
            <SelectItem key={user.id_user} textValue={user.name}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-medium">
                    {user.name} {user.surname}
                  </span>
                  <span className="text-tiny text-default-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </>
    </>
  );
}
