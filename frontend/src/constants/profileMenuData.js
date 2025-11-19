import {
  PiLayoutDuotone,
  PiUserDuotone,
  PiClockUserDuotone,
  PiNotepadDuotone,
  PiCodeDuotone,
  PiPhoneDuotone,
} from "react-icons/pi";

export const profileMenuData = [
  {
    id: 1,
    title: "پنل کاربری",
    link : "/profile",
    icon: <PiLayoutDuotone />,
  },
  {
    id: 2,
    title: "اطلاعات شخصی",
    link : "/profile/personal-information",
    icon: <PiUserDuotone />,
  },
  {
    id: 3,
    title: "سوابق کاری",
    link : "/profile/work-history",
    icon: <PiClockUserDuotone />,
  },
  {
    id: 4,
    title: "تحصیلات",
    link : "/profile/education",
    icon: <PiNotepadDuotone />,
  },
  {
    id: 5,
    title: "نمونه کارها",
    link : "/profile/Portfolio",
    icon: <PiCodeDuotone />,
  },
  {
    id: 6,
    title: "اطلاعات تماس",
    link : "/profile/contact-information",
    icon: <PiPhoneDuotone />,
  },
];