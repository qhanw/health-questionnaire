import { useMemo, useState, useEffect } from "react";
import { Radio, Input, Space } from "antd-mobile";

const RadioItem = Radio;

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
  inline?: boolean;
};

function RadioGroup({
  options,
  value,
  onChange,
  onSelfChange,
  remark,
  disabled,
  inline,
}: RadioGroupType) {
  const [val, setVal] = useState<string>();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const finalVal = useMemo(() => {
    return value || val;
  }, [value, val]);

  const onInputChange = (v: string) => {
    const optVal = finalVal?.split(",$")[0];
    const final = v ? [optVal, `$${v}`].join(",") : optVal;
    setVal(final);
    if (onChange) onChange(final);
    if (onSelfChange) onSelfChange(final);
  };

  return (
    <Space direction={inline ? "horizontal" : "vertical"}>
      {options.map((item: any) => (
        <RadioItem
          disabled={disabled}
          key={item.value}
          checked={item.value === parseInt(finalVal || "")}
          onChange={() => {
            setVal(`${item.value}`);
            if (onChange) onChange(`${item.value}`);
            if (onSelfChange) onSelfChange(`${item.value}`);
          }}
        >
          {item.label}
        </RadioItem>
      ))}

      {remark && parseInt(finalVal || "") === -1 ? (
        <Input
          placeholder="选择其它时填写"
          value={finalVal?.split(",$")[1]}
          onChange={onInputChange}
        />
      ) : null}
    </Space>
  );
}

export default RadioGroup;
