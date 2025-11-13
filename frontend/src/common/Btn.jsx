const Btn = ({ text, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg bg-primary-500 text-white cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default Btn;
