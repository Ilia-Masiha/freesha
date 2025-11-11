import { RiImageAddLine } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";

const Profile = () => {
  return (
    <section className="w-[85%] mt-10">
      {/* avatar | name | jobTitle | rating */}
      <article className="flex items-center justify-start gap-x-2">
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
      </article>
    </section>
  );
};

export default Profile;
