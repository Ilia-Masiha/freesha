import { IoShareSocialOutline } from "react-icons/io5";

const ShareBtn = () => {
  return (
    <button className="z-10 h-12 w-12 flex justify-center items-center text-xl bg-transparent rounded-lg border-2 border-primary-500 text-primary-500 cursor-pointer">
      <IoShareSocialOutline />
    </button>
  );
};

export default ShareBtn;
