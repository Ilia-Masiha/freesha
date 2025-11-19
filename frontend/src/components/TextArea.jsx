const TextArea = ({ label, name, className = "" }) => {
  return (
    <div className={`flex flex-col justify-start gap-y-1 mb-3 ${className}`}>
      <label htmlFor={name} className="text-txt text-sm font-semibold mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        autoComplete="off"
        className="bg-bg outline-none p-2 rounded-lg text-txt-primaryprimary border border-tertiary min-h-28"
      ></textarea>
    </div>
  );
};

export default TextArea;
