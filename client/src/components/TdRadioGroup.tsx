import { useMemo, useState, useEffect } from "react";

import { Radio } from "antd-mobile";

type RadioItemType = {
  label: string;
  value: string | number;
};

type RadioGroupType = {
  options: RadioItemType[];
  value?: string;
  onChange?: (value?: string | number) => void;
  onSelfChange?: (value?: string | number) => void;
  remark?: boolean;
  disabled?: boolean;
};

function RadioGroup({
  options,
  value,
  onChange,
  onSelfChange,
  disabled,
}: RadioGroupType) {
  const [val, setVal] = useState<string>();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const finalVal = useMemo(() => {
    return value || val;
  }, [value, val]);

  return (
    <>
      {options.map((item: any) => (
        <td>
          <Radio
            disabled={disabled}
            key={item.value}
            checked={item.value === parseInt(finalVal || "")}
            onChange={() => {
              setVal(`${item.value}`);
              if (onChange) onChange(`${item.value}`);
              if (onSelfChange) onSelfChange(`${item.value}`);
            }}
          />
        </td>
      ))}
    </>
  );
}

export default RadioGroup;
