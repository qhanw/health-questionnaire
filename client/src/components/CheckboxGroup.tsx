import { useEffect, useMemo, useState } from "react";

import { Checkbox, Input, Space } from "antd-mobile";

const CheckboxItem = Checkbox;

type CheckboxItemType = {
  value: string | number;
  label: string;
  checked?: boolean;
};

type CheckboxGroupType = {
  options: CheckboxItemType[];
  value?: (string | number)[];
  onChange?: (value?: (string | number)[]) => void;
  onSelfChange?: (value?: (string | number)[]) => void;
  remark?: boolean;
  disabled?: boolean;
  max?: number;
};

function CheckboxGroup({
  options,
  value,
  onChange,
  onSelfChange,
  remark,
  disabled,
  max,
}: CheckboxGroupType) {
  const [val, setVal] = useState<(string | number)[]>();

  const finalVal = useMemo(() => {
    return value || val;
  }, [value, val]);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onInnerChange = (checked: boolean, v: string | number) => {
    let next = finalVal;
    if (checked) {
      // -2 为互斥条件
      if (v === -2) {
        next = [v];
      } else {
        const temp = [...(next || []), v].filter((c) => c !== -2);

        next = options.reduce((prev, curr) => {
          if (temp?.includes(curr.value)) prev.push(curr.value);
          return prev;
        }, [] as (string | number)[]);

        next = [...next, ...temp.filter((c) => `${c}`.includes("$"))];
      }
    } else {
      next = next?.filter((c) => c !== v);

      if (v === -1) next = next?.filter((c) => !`${c}`.includes("$"));
    }
    setVal(next);
    if (onChange) onChange(next);
    if (onSelfChange) onSelfChange(next);
  };

  const onInputChange = (v: string) => {
    const next = finalVal?.filter((c) => !`${c}`.includes("$"));
    const final = v ? [...(next || []), `$${v}`] : next;
    setVal(final);
    if (onChange) onChange(final);

    if (onSelfChange) onSelfChange(final);
  };

  const limit = useMemo(() => {
    if (typeof max === "number") {
      return finalVal?.length === max;
    }

    return false;
  }, [max, finalVal]);

  return (
    <Space direction="vertical">
      {options?.map((i) => (
        <CheckboxItem
          disabled={disabled || (finalVal?.includes(i.value) ? false : limit)}
          key={i.value}
          checked={!!finalVal?.includes(i.value)}
          onChange={(bool) => onInnerChange(bool, i.value)}
        >
          {i.label}
        </CheckboxItem>
      ))}
      {remark && finalVal?.includes(-1) ? (
        <Input
          placeholder="选择其它时填写"
          value={`${finalVal?.find((c) => `${c}`.includes("$")) || ""}`.replace(
            "$",
            ""
          )}
          onChange={onInputChange}
        />
      ) : null}
    </Space>
  );
}

export default CheckboxGroup;
