import PropTypes from "prop-types";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

SelectAvailableMaterials.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  isInvalidQty: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMessageQty: PropTypes.string,
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
  isInvalidQty,
  errorMessage,
  errorMessageQty,
  onInputChange,
  Index,
  control,
  onRemove,
}) {
  return (
    <section
      key={Index}
      className="flex justify-between items-center w-[40%] py-1"
    >
      <>
        <>
          <Select
            {...field}
            items={data}
            field={field}
            value={field.value}
            label="Item"
            onChange={(e) =>
              onInputChange(
                Index,
                `details.${Index}.id_material`,
                e.target.value
              )
            }
            name={`details.${Index}.id_material`}
            placeholder="Select a material"
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
            aria-label="select a material"
            variant="underlined"
            className="max-w-[50%]"
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
                  label="QTY"
                  placeholder="Enter a quantity"
                  className="max-w-[25%]"
                  variant="underlined"
                  isRequired
                  isInvalid={isInvalidQty}
                  errorMessage={errorMessageQty}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "0") {
                      onRemove(Index);
                    } else {
                      onInputChange(Index, `details.${Index}.quantity`, value);
                    }
                  }}
                />
              )}
            />
          )}
        </>
      </>
    </section>
  );
}
