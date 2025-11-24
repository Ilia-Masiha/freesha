const Btn = ({ text, type = "button", className = "", color = "primary" }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg bg-${color} hover:bg-${color}/90 text-white cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default Btn;
