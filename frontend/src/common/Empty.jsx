import Image from "next/image";

const Empty = ({ text, size }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-5">
      <div className={`relative w-${size} h-${size}`}>
        <Image
          src="/images/empty.svg"
          alt="empty"
          fill
          className="object-contain"
          priority={false}
        />
      </div>
      <h3 className="text-primary font-semibold text-xl">{text}</h3>
    </div>
  );
};

export default Empty;
