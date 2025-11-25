"use client";
import { profileMenuData } from "@/constants/profileMenuData";
import Link from "next/link";
import { GoPencil } from "react-icons/go";

const SideBar = () => {
  return (
    <aside className="h-full sticky right-0 top-0 bg-primary">
      {/* avatar | name | jobTitle */}
      <div className="relative top-0 w-full flex flex-col justify-center items-center gap-y-1 pt-5">
        <div className="relative w-[70px] h-[70px] rounded-full bg-secondary hover:bg-secondary/80 text-white cursor-pointer text-2xl flex justify-center items-center">
          M
          <span className="absolute right-0 bottom-0 flex justify-center items-center rounded-full bg-bg-primary text-primary text-sm p-1">
            <GoPencil />
          </span>
        </div>
        <h3 className="text-xl font-semibold text-txt-secondary">
          Masih Mohammadpour
        </h3>
        <small className="text-secondary">FrontEnd Delveloper</small>
      </div>
      {/* menu */}
      <div className="w-full mt-10">
        <ul className="flex flex-col gap-y-3 pr-3">
          {profileMenuData.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.link}
                className="w-full h-10 rounded-r-full"
              >
                <li className="w-full h-10 rounded-r-full  flex justify-start items-center gap-x-3 p-2 px-5 cursor-pointer">
                  <span className="text-secondary text-xl">{item.icon}</span>
                  <span className="text-txt-secondary pb-1">{item.title}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
