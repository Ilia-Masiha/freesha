import { RiImageAddLine } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
import ShareBtn from "@/components/ShareBtn";
import PersonalInformation from "@/components/Profile/PersonalInformation";

const Profile = () => {
  return (
    <section className="w-[85%] mt-10">
      {/* avatar | name | jobTitle | rating */}
      <article className="flex items-start justify-between">
        <div className="flex items-center justify-start gap-x-2">
          <div className="w-32 h-32 rounded-full flex justify-center items-center text-3xl text-white bg-secondary-500 relative">
            <span>M</span>
            <div className="absolute w-full h-full rounded-full flex justify-center items-center text-white/0 text-3xl cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-white">
              <RiImageAddLine />
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-2xl font-semibold">Masihaaa</h3>
            <p className="text-sm font-semibold text-secondary-600">
              برنامه نویس فرانت اند
            </p>
            <div className="flex items-center gap-x-1">
              <GiRoundStar className="text-warning" />
              <span className="text-sm text-secondary-600">4.5</span>
            </div>
          </div>
        </div>
        {/* share Profile | see Profile */}
        <div className="flex justify-center items-center gap-x-2">
          <ShareBtn />
          <button className="h-12 px-3 rounded-lg border-2 border-primary-500 text-primary-500 cursor-pointer">
            مشاهده عمومی پروفایل
          </button>
        </div>
      </article>
      {/* Personal information */}
      <PersonalInformation />
    </section>
  );
};

export default Profile;
