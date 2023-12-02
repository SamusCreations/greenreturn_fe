import PropTypes from "prop-types";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

SelectAvailableMaterials.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
  onInputChange: PropTypes.func,
  Index: PropTypes.number,
  control: PropTypes.object,
  SelectedKeys: PropTypes.array,
  onRemove: PropTypes.func,
};

export function SelectAvailableMaterials({
  field,
  data,
  isInvalid,
  errorMessage,
  onInputChange,
  Index,
  control,
  onRemove,
}) {
  return (
    <section key={Index}>
      <>
        <>
          <Select
            {...field}
            items={data}
            field={field}
            value={field.value}
            onChange={(e) =>
              onInputChange(
                Index,
                `details.${Index}.id_material`,
                e.target.value
              )
            }
            name={`details.${Index}.id_material`}
            label="material"
            placeholder="Select an material to assign exchange"
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
            {(material) => (
              <SelectItem key={material.id_material} textValue={material.name}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-medium">{material.name}</span>
                    <span className="text-tiny text-default-400">
                      {material.description}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          {field.value && (
            <Controller
              name={`details.${Index}.quantity`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  Index={Index}
                  label="Select a quantity"
                  className="pt-unit-1"
                  name={`details.${Index}.quantity`}
                  isInvalid={isInvalid}
                  errorMessage={errorMessage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "0") {
                      onRemove(Index)

                    } else {
                      onInputChange(Index, `details.${Index}.quantity`, value);
                    }
                  }}
                />
              )}
            />
          )}
          {/* {field.value && (
            <Controller>

            </Controller>
          )} */}
        </>
      </>
    </section>
  );
}
