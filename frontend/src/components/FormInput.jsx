const FormInput = ({
  label,
  id,
  type = "text",
  name,
  // value,
  // onChange,
}) => {
  return (
    <div className="flex flex-col justify-start gap-y-1 mb-3">
      <div className="flex justify-between items-center mb-0.5">
        <label htmlFor={id} className="text-txt text-sm font-semibold">
          {label}
        </label>
        <span className="text-xs text-error"></span>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        // onChange={onChange}
        // value={value}
        className="bg-bg outline-none p-2 rounded-lg text-txt border border-secondary-400"
      />
    </div>
  );
};

export default FormInput;
