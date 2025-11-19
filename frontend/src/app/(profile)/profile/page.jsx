"use client";
import {
  PiCodeDuotone,
  PiWalletDuotone,
  PiFlagCheckeredDuotone,
} from "react-icons/pi";

const Profile = () => {
  return (
    <section>
      {/* cards */}
      <article className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-4 bg-primary rounded-xl h-28 flex justify-start items-center gap-x-4 p-4 cursor-pointer">
          <div className="w-14 h-14 rounded-lg flex justify-center items-center bg-secondary shadow-custom text-3xl text-white">
            <PiFlagCheckeredDuotone />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg text-white">پروژه های انجام شده</h3>
            <p className="text-secondary">9</p>
          </div>
        </div>
        <div className="col-span-4 bg-primary rounded-xl h-28 flex justify-start items-center gap-x-4 p-4 cursor-pointer">
          <div className="w-14 h-14 rounded-lg flex justify-center items-center bg-secondary shadow-custom text-3xl text-white">
            <PiCodeDuotone />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg text-white">پروژه های فعال</h3>
            <p className="text-secondary">9</p>
          </div>
        </div>
        <div className="col-span-4 bg-primary rounded-xl h-28 flex justify-start items-center gap-x-4 p-4 cursor-pointer">
          <div className="w-14 h-14 rounded-lg flex justify-center items-center bg-secondary shadow-custom text-3xl text-white">
            <PiWalletDuotone />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg text-white">درآمد کل</h3>
            <p className="text-secondary">9</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Profile;
