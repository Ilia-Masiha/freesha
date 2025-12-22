"use client";
import DatePicker from "react-multi-date-picker";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateInput = ({
  name,
  label,
  className,
  placeholder = "تاریخ را انتخاب کنید",
  errors,
  value,
  onChange,
}) => {
  const handleDateChange = (dateObject) => {
    if (dateObject) {
      const gregorianDate = dateObject.convert(persian, "gregorian");
      const year = gregorianDate.year;
      const month = String(gregorianDate.month).padStart(2, "0");
      const day = String(gregorianDate.day).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };

  return (
    <div className={`${className} flex flex-col mt-0.5 mb-3`}>
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={name} className="text-txt text-sm font-semibold">
          {label}
        </label>
        {errors && (
          <span className="text-xs text-error">
            {errors[name]?.message && errors[name]?.message}
          </span>
        )}
      </div>

      <DatePicker
        value={value}
        onChange={handleDateChange}
        name={name}
        id={name}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        placeholder={placeholder}
        inputClass="w-full bg-transparent outline-none p-2 rounded-lg text-txt-primary border border-tertiary"
        className="custom-date-picker"
      />
    </div>
  );
};

export default DateInput;