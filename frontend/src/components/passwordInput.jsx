"use client";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const PasswordInput = ({ register, errors, label, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-start gap-y-1 mb-3">
      <div className="flex justify-between items-center mb-0.5">
        <label htmlFor={name} className="text-txt text-sm font-semibold">
          {label}
        </label>
        <span className="text-xs text-error">
          {errors[name]?.message && errors[name]?.message}
        </span>
      </div>
      <div className="flex items-center w-full bg-bg rounded-lg border border-tertiary overflow-hidden">
        <input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          autoComplete="off"
          className="outline-none p-2 text-txt w-[90%]"
        />
        <button
          type="button"
          className="w-[10%] h-full p-2 text-lg text-primary"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <LuEye /> : <LuEyeClosed />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
