const Title = ({ text, size = "lg", icon, color = "black" }) => {
  return (
    <div>
      <h2
        className={`font-semibold text-${size} flex items-center gap-x-2`}
      >
        {icon}
        <span className={`text-${color}`}>{text}</span>
      </h2>
    </div>
  );
};

export default Title;
