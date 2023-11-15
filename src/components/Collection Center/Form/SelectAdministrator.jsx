import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectAdministrator.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectAdministrator({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Assigned to"
          placeholder="Select an administrator"
          classNames={{
            listboxWrapper: "max-h-[400px]",
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span>
                    {item.data.name} {item.data.surname}
                  </span>
                  <span className="text-default-500 text-tiny">
                    {item.data.email}
                  </span>
                </div>
              </div>
            ));
          }}
          selectedKeys={field.value}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
        >
          {(user) => (
            <SelectItem key={user.id_user} textValue={user.name}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">
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
