const TextArea = ({ register, errors, label, name, className = "" }) => {
  return (
    <div className={`flex flex-col justify-start gap-y-1 mb-3 ${className}`}>
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

      <textarea
        {...(register && register(name))}
        id={name}
        name={name}
        autoComplete="off"
        className="bg-bg outline-none p-2 rounded-lg text-txt-primaryprimary border border-tertiary min-h-28"
      ></textarea>
    </div>
  );
};

export default TextArea;
