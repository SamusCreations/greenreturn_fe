import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";

SelectUser.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectUser({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="User"          
          placeholder="Select an user to assign exchange"
          classNames={{
            listboxWrapper: "max-h-[400px]",
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span>{item.data.name}</span>
                  <span className="text-default-500 text-tiny">
                    {item.data.value}
                  </span>
                </div>
              </div>
            ));
          }}
          selectedKeys={field.value ? [field.value] : []}
          isInvalid={isInvalid}
          errorMessage={errorMessage}          
          isRequired
          labelPlacement="outside"
        >
          {(user) => (
           
            <SelectItem key={user.id_user} textValue={user.name}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-medium">{user.name}</span>
                  <span className="text-tiny text-default-400">
                    {user.surname}
                  </span>
                </div>
              </div>
            </SelectItem>
          
          )}
        </Select>   
        {field.value && (
          <div className="flex flex-col">
            
            <h2>Selected user: </h2>
            <p className=""><strong className="font-semibold text-gray-900 dark:text-white">Name: </strong> {data.find((user) => user.id_user === field.value)?.name}</p>
            <p><strong className="font-semibold text-gray-900 dark:text-white">Surname: </strong> {data.find((user) => user.id_user === field.value)?.surname}</p>
            <p><strong className="font-semibold text-gray-900 dark:text-white">Email: </strong> {data.find((user) => user.id_user === field.value)?.email}</p>
            <p><strong className="font-semibold text-gray-900 dark:text-white">Identification: </strong> {data.find((user) => user.id_user === field.value)?.identification}</p>
          </div>
         
      )}   
      </>
    </>
  );
}
