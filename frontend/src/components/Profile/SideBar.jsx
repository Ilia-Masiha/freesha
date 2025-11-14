"use client";
import { GoPencil } from "react-icons/go";
import {
  PiUserDuotone,
  PiClockUserDuotone,
  PiNotepadDuotone,
  PiCodeDuotone,
  PiPhoneDuotone,
} from "react-icons/pi";

const menuData = [
  {
    id: 1,
    title: "اطلاعات شخصی",
    icon: <PiUserDuotone />,
  },
  {
    id: 2,
    title: "سوابق کاری",
    icon: <PiClockUserDuotone />,
  },
  {
    id: 3,
    title: "تحصیلات",
    icon: <PiNotepadDuotone />,
  },
  {
    id: 4,
    title: "نمونه کارها",
    icon: <PiCodeDuotone />,
  },
  {
    id: 5,
    title: "اطلاعات تماس",
    icon: <PiPhoneDuotone />,
  },
];

const SideBar = () => {
  return (
    <aside className="h-full sticky right-0 top-0 bg-primary rounded-l-2xl">
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
        <ul className="flex flex-col gap-y-4 pr-2.5">
          {menuData.map((item) => {
            return (
              <li
                key={item.id}
                className="w-full h-10 rounded-r-full  flex justify-start items-center gap-x-3 p-2 px-5 cursor-pointer"
              >
                <span className="text-secondary text-xl">{item.icon}</span>
                <span className="text-txt-secondary pb-1">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
