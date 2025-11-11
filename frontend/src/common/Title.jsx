const Title = ({ text, size = "lg", icon }) => {
  return (
    <div>
      <h2 className={`font-semibold text-${size} flex items-center gap-x-2`}>
        {icon}
        {text}
      </h2>
    </div>
  );
};

export default Title;
