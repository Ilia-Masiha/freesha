import { IoIosSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className="flex justify-between items-center w-full bg bg-transparent rounded-lg overflow-hidden border border-tertiary">
      <input type="text" className="p-2 outline-none border-none w-[90%]" />
      <button className="w-[9%] flex justify-end text-2xl px-2">
        <IoIosSearch className="text-txt-tertiary" />
      </button>
    </div>
  );
};

export default SearchInput;
