"use client";
import { SelectStyles } from "@/constants/selectStyles";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

const Select = ({
  name,
  label,
  defaultValue=null,
  onChange,
  options,
  placeholder,
  isMulti=false,
  value=null
}) => {
  return (
    <div className="w-full flex flex-col jstify-start">
      <label className="text-txt text-sm font-semibold pb-1.5" htmlFor={name}>
        {label}
      </label>
      <ReactSelect
        isMulti={isMulti}
        id={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={SelectStyles}
        menuPlacement="auto"
      />
    </div>
  );
};

export default Select;
