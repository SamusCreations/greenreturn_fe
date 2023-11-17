import PropTypes from 'prop-types';
import { Select, SelectItem } from '@nextui-org/react';

SelectColor.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export function SelectColor({ field, data, isInvalid, errorMessage }) {
  return (
    <>
      <>
        <Select
          {...field}
          items={data}
          label="Color"
          placeholder="Select a color"
          classNames={{
            listboxWrapper: 'max-h-[400px]',
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full mx-1"
                  style={{ backgroundColor: item.data.value }}
                />
                <div className="flex flex-col">
                  <span>{item.data.name}</span>
                  <span className="text-default-500 text-tiny">
                    {item.data.value}
                  </span>
                </div>
              </div>
            ));
          }}
          selectedKeys={field.id}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          isRequired
          labelPlacement="outside"
        >
          {(color) => (
            <SelectItem key={color.id_color} textValue={color.name}>
              <div className="flex gap-2 items-center">
                <div
                  className="w-5 h-5 rounded-full mx-1"
                  style={{ backgroundColor: color.value }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{color.name}</span>
                  <span className="text-tiny text-default-400">
                    {color.value}
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
