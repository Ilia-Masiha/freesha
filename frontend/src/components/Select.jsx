"use client";
import { SelectStyles } from "@/constants/selectStyles";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

const Select = ({
  name,
  label,
  defaultValue = null,
  onChange,
  options,
  placeholder,
  isMulti = false,
  value = null,
  errors,
  onBlur = null,
  ref = null,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col jstify-start mb-3">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="text-txt text-sm font-semibold">
          {label}
        </label>
        {errors && (
          <span className="text-xs text-error">
            {errors[name]?.message && errors[name]?.message}
          </span>
        )}
      </div>

      <ReactSelect
        isMulti={isMulti}
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        options={options}
        placeholder={placeholder}
        styles={SelectStyles}
        menuPlacement="auto"
        {...rest}
      />
    </div>
  );
};

export default Select;
