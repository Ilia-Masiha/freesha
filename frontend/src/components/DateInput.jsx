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
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className={`${className} flex flex-col mt-0.5`}>
      <label htmlFor={name} className="text-txt text-sm font-semibold mb-1.5">
        {label}
      </label>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        name={name}
        id={name}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        placeholder={placeholder}
        inputClass="w-full bg-bg outline-none p-2 rounded-lg text-txt border border-secondary-400 m-0"
      />
    </div>
  );
};

export default DateInput;
