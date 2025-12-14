const Btn = ({
  text,
  type = "button",
  className = "",
  color = "primary",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-${color} hover:bg-${color}/90 text-white cursor-pointer ${className} disabled:cursor-not-allowed disabled:opacity-65`}
    >
      {text}
    </button>
  );
};

export default Btn;
