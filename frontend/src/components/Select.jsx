"use client";
import { SelectStyles } from "@/constants/selectStyles";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

const Select = ({
  name,
  label,
  defaultValue,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="flex flex-col jstify-start">
      <label className="text-txt text-sm font-semibold mb-1.5" htmlFor={name}>
        {label}
      </label>
      <ReactSelect
        id={name}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={SelectStyles}
      />
    </div>
  );
};

export default Select;
